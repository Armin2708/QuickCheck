package com.quickcheck.classes;

import java.util.Date;

public record ClassUpdateRequest(
        String name,
        Integer professorId,
        Date startDate,
        Date endDate,
        Integer classroomId,
        Integer OrganizationId
) {
}