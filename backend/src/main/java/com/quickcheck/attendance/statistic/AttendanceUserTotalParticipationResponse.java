package com.quickcheck.attendance.statistic;

public record AttendanceUserTotalParticipationResponse(
        Integer presence,
        Integer absence
) {
}
