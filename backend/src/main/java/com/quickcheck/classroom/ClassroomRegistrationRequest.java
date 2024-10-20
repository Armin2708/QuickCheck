package com.quickcheck.classroom;

import java.util.List;

public record ClassroomRegistrationRequest(
        String name,
        Integer professorId,
        String location,
        String startDate,
        String endDate,
        List<String> classDays,
        List<Integer> studentsId,
        List<Integer> adminsId
) {
}