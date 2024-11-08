package com.quickcheck.attendance;

import com.quickcheck.exception.*;
import com.quickcheck.user.User;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AttendanceService {

    private final AttendanceDao attendanceDao;
    private final UserDao userDao;

    public AttendanceService(AttendanceDao attendanceDao, UserDao userDao) {
        this.attendanceDao = attendanceDao;
        this.userDao = userDao;
    }

    public List<Attendance> getAllAttendances(){
        return attendanceDao.selectAllAttendances();
    }

    public Attendance getAttendance(String tag){
        return attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
    }

    public Integer getAttendanceRadius(String tag){
        Attendance attendance = attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
        return attendance.getRadius();
    }

    public Boolean getAttendanceStatus(String tag){
        Attendance attendance = attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
        return attendance.isOpenStatus();
    }

    public void addAttendance(AttendanceRegistrationRequest registrationRequest){

        String tag = registrationRequest.classId()+"_"+registrationRequest.date();
        if (attendanceDao.existAttendanceWithTag(tag)){
            throw new DuplicateResourceException("Attendance already exists for this class");
        }

        Random random = new Random();
        Integer code = 100000 + random.nextInt(900000);
        Boolean openStatus = true;

        Attendance newAttendance = new Attendance(
                tag,
                registrationRequest.date(),
                registrationRequest.professorId(),
                registrationRequest.classId(),
                code,
                openStatus,
                registrationRequest.radius());

        attendanceDao.createAttendance(newAttendance);
    }
    public void verifyAttendance(Integer userId,AttendanceUserRequest userRequest){

        if (userDao.existUserInAttendance(userId,userRequest.attendanceTag())){
            throw new DuplicateResourceException("User already took attendance");
        }

        Attendance attendance = attendanceDao.selectAttendance(userRequest.attendanceTag())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(userRequest.attendanceTag())
                ));
        if (!attendance.isOpenStatus()){
            throw new ClosedAccessException("Attendance with tag [%s] is closed".formatted(userRequest.attendanceTag()));
        }

        System.out.println(attendance.getCode());
        if (attendance.getCode() == null || userRequest.code() == null || !attendance.getCode().equals(userRequest.code())) {
            throw new InvalidAccessCodeException("Invalid Code, please try again");
        }

        attendanceDao.joinAttendance(attendance.getId(),userId);

    }
    public void openAttendance(String tag){

        Attendance attendance = attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
        if (attendance.isOpenStatus()){
            throw new DuplicateResourceException("Attendance already Open");
        }
        attendance.setOpenStatus(true);
        attendanceDao.updateAttendance(attendance);
    }


    public void closeAttendance(String tag){
        Attendance attendance = attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
        if (!attendance.isOpenStatus()){
            throw new DuplicateResourceException("Attendance already Closed");
        }
        attendance.setOpenStatus(false);
        attendanceDao.updateAttendance(attendance);
    }
    public void updateAttendance(String tag,AttendanceUpdateRequest attendanceUpdateRequest){

        Attendance attendance = attendanceDao.selectAttendance(tag)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Attendance with tag [%s] not found".formatted(tag)
                ));
        boolean changes = false;

        if (attendanceUpdateRequest.radius() != null && !attendanceUpdateRequest.radius().equals(attendance.getRadius())) {
            attendance.setRadius(attendanceUpdateRequest.radius());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        attendanceDao.updateAttendance(attendance);

    }
    public void deleteAttendance(String tag){
        if (!attendanceDao.existAttendanceWithTag(tag)){
            throw new ResourceNotFoundException("Attendance with tag [%s] not found".formatted(tag));
        }
        attendanceDao.deleteAttendance(tag);

    }

}
