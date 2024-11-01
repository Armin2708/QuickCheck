package com.quickcheck.attendance;

public record AttendanceUserRequest(
    String attendanceTag,
    Integer code
) {
}
