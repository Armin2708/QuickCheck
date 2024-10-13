package com.quickcheck.classroom;

import java.util.List;

public record ClassroomRegistrationRequest(
        String className,
        String professorName,
        List<Integer> adminsId,
        List<Integer> studentsId,
        List<String> attendanceOfStudents,
        List<List<String>> attendanceRecord,
        String classLocation
) {
}