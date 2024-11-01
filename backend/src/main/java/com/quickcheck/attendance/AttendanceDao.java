package com.quickcheck.attendance;

import com.quickcheck.user.User;

import java.util.List;
import java.util.Optional;

public interface AttendanceDao {

    List<Attendance> selectAllAttendances();

    Optional<Attendance> selectAttendance(String attendanceTag);

    boolean existAttendanceWithTag(String tag);

    void createAttendance(Attendance attendance);

    void updateAttendance(Attendance update);

    void deleteAttendance(String attendanceTag);

    void joinAttendance(Integer attendanceId, Integer userId);
}
