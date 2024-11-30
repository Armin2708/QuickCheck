package com.quickcheck.attendance.statistic;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistic")
public class AttendanceStatisticController {

    private final AttendanceStatisticService attendanceStatisticService;

    public AttendanceStatisticController(AttendanceStatisticService attendanceStatisticService) {
        this.attendanceStatisticService = attendanceStatisticService;
    }

    @GetMapping("/attendance/{tag}")
    public AttendanceParticipationResponse getAttendanceParticipation(
            @PathVariable("tag") String tag
    ) {
        return attendanceStatisticService.getAttendanceParticipation(tag);
    }

    @GetMapping("/class/{classId}/user/{userId}")
    public AttendanceUserTotalParticipationResponse getUserClassParticipation(
            @PathVariable("classId") Integer classId,
            @PathVariable("userId") Integer userId
    ) {
        return attendanceStatisticService.getAllUserClassParticipation(classId, userId);
    }
}
