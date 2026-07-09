package com.tripnest.service;

import com.tripnest.dto.request.CreateExpenseRequest;
import com.tripnest.dto.response.ExpenseDto;
import com.tripnest.dto.response.ExpenseSplitDto;
import com.tripnest.dto.response.UserDto;
import com.tripnest.entity.Expense;
import com.tripnest.entity.ExpenseSplit;
import com.tripnest.entity.Trip;
import com.tripnest.entity.User;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.exception.UnauthorizedException;
import com.tripnest.repository.ExpenseRepository;
import com.tripnest.repository.ExpenseSplitRepository;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;
import com.tripnest.util.CurrencyUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseSplitRepository expenseSplitRepository;
    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, ExpenseSplitRepository expenseSplitRepository,
                          TripRepository tripRepository, TripMemberRepository tripMemberRepository,
                          UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.expenseSplitRepository = expenseSplitRepository;
        this.tripRepository = tripRepository;
        this.tripMemberRepository = tripMemberRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ExpenseDto createExpense(Long tripId, CreateExpenseRequest request, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        // Validate invoker is a member
        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to post expense on this trip");
        }

        User paidBy = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Expense expense = Expense.builder()
                .trip(trip)
                .paidBy(paidBy)
                .amount(request.getAmount())
                .category(request.getCategory())
                .description(request.getDescription())
                .date(request.getDate())
                .receiptUrl(request.getReceiptUrl())
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        // Calculate splits
        List<Long> splitUserIds = request.getSplitUserIds();
        int totalUsers = splitUserIds.size();
        BigDecimal baseShare = CurrencyUtils.divideEqually(request.getAmount(), totalUsers);

        // Adjust for floating-point rounding division remainder
        BigDecimal remainder = request.getAmount().subtract(baseShare.multiply(BigDecimal.valueOf(totalUsers)));

        List<ExpenseSplit> splits = new ArrayList<>();
        for (int i = 0; i < totalUsers; i++) {
            Long userId = splitUserIds.get(i);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Split user not found: " + userId));

            BigDecimal share = baseShare;
            if (i == 0) {
                // Give remainder to the first user
                share = share.add(remainder);
            }

            ExpenseSplit split = ExpenseSplit.builder()
                    .expense(savedExpense)
                    .user(user)
                    .shareAmount(share)
                    .build();

            splits.add(expenseSplitRepository.save(split));
        }

        savedExpense.setSplits(splits);
        return mapToExpenseDto(savedExpense);
    }

    public List<ExpenseDto> getExpenses(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to view expenses");
        }

        return expenseRepository.findByTripIdOrderByDateDesc(tripId).stream()
                .map(this::mapToExpenseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteExpense(Long expenseId, String email) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        Trip trip = expense.getTrip();
        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(trip.getId(), email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to delete expense");
        }

        expenseRepository.delete(expense);
    }

    public List<Map<String, Object>> calculateSettlement(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserEmail(tripId, email);
        if (!isMember) {
            throw new UnauthorizedException("Not authorized to view settlements");
        }

        // Get all members of the trip
        List<User> members = trip.getMembers().stream()
                .map(m -> m.getUser())
                .collect(Collectors.toList());

        // Get all expenses of the trip
        List<Expense> expenses = expenseRepository.findByTripIdOrderByDateDesc(tripId);

        // Map of userId -> balance (paid amount - split share amount)
        Map<Long, BigDecimal> balances = new HashMap<>();
        for (User u : members) {
            balances.put(u.getId(), BigDecimal.ZERO);
        }

        for (Expense exp : expenses) {
            Long paidById = exp.getPaidBy().getId();
            balances.put(paidById, balances.getOrDefault(paidById, BigDecimal.ZERO).add(exp.getAmount()));

            for (ExpenseSplit split : exp.getSplits()) {
                Long splitUserId = split.getUser().getId();
                balances.put(splitUserId, balances.getOrDefault(splitUserId, BigDecimal.ZERO).subtract(split.getShareAmount()));
            }
        }

        // Separate creditors and debtors
        // We will store as class representations or simple items for parsing
        class MemberBalance {
            final User user;
            BigDecimal balance;

            MemberBalance(User user, BigDecimal balance) {
                this.user = user;
                this.balance = balance;
            }
        }

        List<MemberBalance> debtors = new ArrayList<>();
        List<MemberBalance> creditors = new ArrayList<>();

        for (User u : members) {
            BigDecimal bal = balances.get(u.getId());
            // Round to 2 decimals
            bal = bal.setScale(2, RoundingMode.HALF_UP);
            if (bal.compareTo(BigDecimal.ZERO) < 0) {
                debtors.add(new MemberBalance(u, bal));
            } else if (bal.compareTo(BigDecimal.ZERO) > 0) {
                creditors.add(new MemberBalance(u, bal));
            }
        }

        // Greedy matching of debtors and creditors
        List<Map<String, Object>> settlements = new ArrayList<>();

        int debtIndex = 0;
        int credIndex = 0;

        while (debtIndex < debtors.size() && credIndex < creditors.size()) {
            MemberBalance debtor = debtors.get(debtIndex);
            MemberBalance creditor = creditors.get(credIndex);

            BigDecimal debtVal = debtor.balance.abs();
            BigDecimal credVal = creditor.balance;

            BigDecimal settleAmount = debtVal.min(credVal);

            if (settleAmount.compareTo(BigDecimal.valueOf(0.01)) >= 0) {
                Map<String, Object> settlement = new HashMap<>();
                settlement.put("from", mapToUserDto(debtor.user));
                settlement.put("to", mapToUserDto(creditor.user));
                settlement.put("amount", settleAmount);
                settlements.add(settlement);
            }

            debtor.balance = debtor.balance.add(settleAmount);
            creditor.balance = creditor.balance.subtract(settleAmount);

            if (debtor.balance.setScale(2, RoundingMode.HALF_UP).compareTo(BigDecimal.ZERO) == 0) {
                debtIndex++;
            }
            if (creditor.balance.setScale(2, RoundingMode.HALF_UP).compareTo(BigDecimal.ZERO) == 0) {
                credIndex++;
            }
        }

        return settlements;
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .build();
    }

    public ExpenseDto mapToExpenseDto(Expense expense) {
        UserDto paidByDto = mapToUserDto(expense.getPaidBy());

        List<ExpenseSplitDto> splitDtos = new ArrayList<>();
        if (expense.getSplits() != null) {
            splitDtos = expense.getSplits().stream()
                    .map(split -> ExpenseSplitDto.builder()
                            .id(split.getId())
                            .userId(split.getUser().getId())
                            .userName(split.getUser().getName())
                            .userEmail(split.getUser().getEmail())
                            .shareAmount(split.getShareAmount())
                            .build())
                    .collect(Collectors.toList());
        }

        return ExpenseDto.builder()
                .id(expense.getId())
                .tripId(expense.getTrip().getId())
                .paidBy(paidByDto)
                .amount(expense.getAmount())
                .category(expense.getCategory())
                .description(expense.getDescription())
                .date(expense.getDate())
                .receiptUrl(expense.getReceiptUrl())
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .splits(splitDtos)
                .build();
    }
}
