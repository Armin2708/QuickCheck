package com.quickcheck.attendance.statistic;

import com.quickcheck.user.UserDTO;

import java.util.List;

public record AttendanceParticipationResponse(
        Integer attendedUsersCount,
        Integer missingUsersCount,
        List<UserDTO> attendedUsers,
        List<UserDTO> missingUsers
) {
}
