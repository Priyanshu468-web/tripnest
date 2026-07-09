package com.tripnest.util;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class DateUtils {
    private DateUtils() {
        // Utility class
    }

    public static long calculateDurationDays(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(startDate, endDate) + 1;
    }

    public static boolean isOverlap(LocalDate startA, LocalDate endA, LocalDate startB, LocalDate endB) {
        if (startA == null || endA == null || startB == null || endB == null) {
            return false;
        }
        return !startA.isAfter(endB) && !startB.isAfter(endA);
    }
}
