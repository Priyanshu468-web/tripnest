package com.tripnest.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class CurrencyUtils {
    private CurrencyUtils() {
        // Utility class
    }

    public static BigDecimal divideEqually(BigDecimal amount, int totalUsers) {
        if (amount == null || totalUsers <= 0) {
            return BigDecimal.ZERO;
        }
        return amount.divide(BigDecimal.valueOf(totalUsers), 2, RoundingMode.HALF_UP);
    }
}
