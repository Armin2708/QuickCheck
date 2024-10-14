package com.quickcheck.classroom;

import java.util.List;

public record ClassroomRegistrationRequest(
        String className,
        Integer professorId,
        String classLocation,
        String startDate,
        String endDate,
        List<String> classDays,
        List<Integer> studentsId,
        List<Integer> adminsId
) {
}