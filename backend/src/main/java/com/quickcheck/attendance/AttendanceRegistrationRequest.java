package com.quickcheck.attendance;

import java.time.LocalDate;

public record AttendanceRegistrationRequest(
        LocalDate date,
        Integer professorId,
        Integer classId,
        Integer radius
) {
}
