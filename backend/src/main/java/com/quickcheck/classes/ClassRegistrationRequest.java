package com.quickcheck.classes;

import java.util.Date;

public record ClassRegistrationRequest(
        String name,
        Integer professorId,
        Date startDate,
        Date endDate,
        Integer classroomId,
        String organizationName
) {
}