package com.quickcheck.attendance;

import com.quickcheck.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/attendances")
public class AttendanceController {
    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public List<Attendance> getAttendances(){
        return attendanceService.getAllAttendances();
    }

    @GetMapping("/id/{attendanceTag}")
    public Attendance getAttendance(@PathVariable("attendanceTag") String attendanceTag){
        return attendanceService.getAttendance(attendanceTag);
    }

    @GetMapping("/radius/{attendanceTag}")
    public Integer getAttendanceRadius(@PathVariable("attendanceTag") String attendanceTag){
        return attendanceService.getAttendanceRadius(attendanceTag);
    }

    @GetMapping("/status/{attendanceTag}")
    public Boolean getAttendanceStatus(
            @PathVariable("attendanceTag") String attendanceTag) {
        return attendanceService.getAttendanceStatus(attendanceTag);
    }

    @PostMapping
    public ResponseEntity<?> registerAttendance(
            @RequestBody AttendanceRegistrationRequest registrationRequest
    ) {
        attendanceService.addAttendance(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify/{userId}")
    public ResponseEntity<?> verifyAttendance(
            @PathVariable("userId") Integer userId,
            @RequestBody AttendanceUserRequest userRequest
    ) {
        attendanceService.verifyAttendance(userId,userRequest);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/open/{attendanceTag}")
    public ResponseEntity<?> openAttendance(
            @PathVariable("attendanceTag") String attendanceTag
    ) {
        attendanceService.openAttendance(attendanceTag);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/close/{attendanceTag}")
    public ResponseEntity<?> closeAttendance(
            @PathVariable("attendanceTag") String attendanceTag
    ) {
        attendanceService.closeAttendance(attendanceTag);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{attendanceTag}")
    public void updateAttendance(
            @PathVariable("attendanceTag") String attendanceTag,
            @RequestBody AttendanceUpdateRequest updateRequest){
        attendanceService.updateAttendance(attendanceTag,updateRequest);
    }

    @DeleteMapping("{attendanceTag}")
    public void deleteAttendance(
            @PathVariable("attendanceTag") String attendanceTag
    ){
        attendanceService.deleteAttendance(attendanceTag);
    }
}
