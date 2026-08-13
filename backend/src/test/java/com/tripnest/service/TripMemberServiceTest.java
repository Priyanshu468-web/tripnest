package com.tripnest.service;

import com.tripnest.dto.TripMemberDto;
import com.tripnest.entity.Trip;
import com.tripnest.entity.TripMember;
import com.tripnest.entity.User;
import com.tripnest.entity.enums.MemberRole;
import com.tripnest.entity.enums.MemberStatus;
import com.tripnest.entity.enums.RoleName;
import com.tripnest.repository.TripMemberRepository;
import com.tripnest.repository.TripRepository;
import com.tripnest.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripMemberServiceTest {

    @Mock
    private TripMemberRepository tripMemberRepository;

    @Mock
    private TripRepository tripRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthService authService;

    @Mock
    private TripService tripService;

    @InjectMocks
    private TripMemberService tripMemberService;

    private User testUser;
    private Trip testTrip;
    private TripMember testMember;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("user@tripnest.com")
                .name("Alex")
                .role(RoleName.TRAVELER)
                .build();

        testTrip = Trip.builder()
                .id(10L)
                .owner(testUser)
                .build();

        testMember = TripMember.builder()
                .id(1L)
                .tripId(10L)
                .userId(2L)
                .userEmail("friend@tripnest.com")
                .userName("Friend")
                .role(MemberRole.MEMBER)
                .status(MemberStatus.ACCEPTED)
                .build();
    }

    @Test
    void testGetMembersByTrip_Success() {
        when(authService.getCurrentUser()).thenReturn(testUser);
        when(tripRepository.findById(10L)).thenReturn(Optional.of(testTrip));
        when(tripMemberRepository.findByTripId(10L)).thenReturn(List.of(testMember));

        List<TripMemberDto> list = tripMemberService.getMembersByTrip(10L);

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("friend@tripnest.com", list.get(0).getUserEmail());
    }
}
