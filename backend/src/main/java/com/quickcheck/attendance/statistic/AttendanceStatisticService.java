package com.quickcheck.attendance.statistic;

import com.quickcheck.attendance.Attendance;
import com.quickcheck.attendance.AttendanceDao;
import com.quickcheck.classes.ClassDao;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.User;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserDTOMapper;
import com.quickcheck.user.UserDao;
import com.quickcheck.user.roles.RoleDTO;
import com.quickcheck.user.roles.RoleDTOMapper;
import com.quickcheck.user.roles.RoleDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceStatisticService {

    private final AttendanceDao attendanceDao;
    private final UserDao userDao;
    private final ClassDao classDao;
    private final UserDTOMapper userDTOMapper;
    private final RoleDao roleDao;
    private final RoleDTOMapper roleDTOMapper;

    public AttendanceStatisticService(AttendanceDao attendanceDao, UserDao userDao, ClassDao classDao, UserDTOMapper userDTOMapper, RoleDao roleDao, RoleDTOMapper roleDTOMapper) {
        this.attendanceDao = attendanceDao;
        this.userDao = userDao;
        this.classDao = classDao;
        this.userDTOMapper = userDTOMapper;
        this.roleDao = roleDao;
        this.roleDTOMapper = roleDTOMapper;
    }

    private void checkIfAttendanceExists(String tag){
        if (!attendanceDao.existAttendanceWithTag(tag)){
            throw new ResourceNotFoundException("No attendance found with tag [%s]".formatted(tag));
        }
    }
    private void checkIfClassExists(Integer classId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No attendance found with tag [%s]".formatted(classId));
        }
    }

    public AttendanceParticipationResponse getAttendanceParticipation(String tag){
        checkIfAttendanceExists(tag);

        Attendance attendance = attendanceDao.selectAttendance(tag).get();

        List<UserDTO> classUsers = userDao.selectAllUserInClassById(attendance.getClassId())
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserOrganizationRolesInClass(user.getId(), attendance.getClassId())
                            .stream()
                            .map(roleDTOMapper)
                            .toList();

                    // Return a new UserDTO with roles
                    return new UserDTO(
                            userDTO.id(),
                            userDTO.name(),
                            userDTO.address(),
                            userDTO.email(),
                            userDTO.dateOfBirth(),
                            userDTO.gender(),
                            userDTO.accountType(),
                            roles, // Add roles here
                            userDTO.username(),
                            userDTO.profileImageId()
                    );
                })
                .collect(Collectors.toList());

        List<UserDTO> attendedUsers = userDao.selectAllUsersOfAttendance(tag)
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserOrganizationRolesInClass(user.getId(), attendance.getClassId())
                            .stream()
                            .map(roleDTOMapper)
                            .toList();

                    // Return a new UserDTO with roles
                    return new UserDTO(
                            userDTO.id(),
                            userDTO.name(),
                            userDTO.address(),
                            userDTO.email(),
                            userDTO.dateOfBirth(),
                            userDTO.gender(),
                            userDTO.accountType(),
                            roles, // Add roles here
                            userDTO.username(),
                            userDTO.profileImageId()
                    );
                })
                .collect(Collectors.toList());

        List<UserDTO> missingUsers = new ArrayList<>(classUsers);

// Remove all users who attended from the new list
        missingUsers.removeAll(attendedUsers);

        Integer attendedUsersCount = attendedUsers.size() ;
        Integer missingUsersCount = missingUsers.size();

        return new AttendanceParticipationResponse(
                attendedUsersCount,
                missingUsersCount,
                attendedUsers,
                missingUsers
        );
    }

    public AttendanceUserTotalParticipationResponse getAllUserClassParticipation(Integer classId, Integer userId){
        checkIfClassExists(classId);

        List<Attendance> classAttendances = attendanceDao.selectAllClassAttendances(classId);

        List<Attendance> classUserAttendance = attendanceDao.selectAllUserAttendancesInClass(classId, userId);

        List<Attendance> missedClassAttendances = new ArrayList<>(classAttendances);

        missedClassAttendances.removeAll(classUserAttendance);

        Integer classUserAttendanceCount = classUserAttendance.size();
        Integer missedClassAttendanceCount = missedClassAttendances.size();

// Limit to 2 decimal places

        return new AttendanceUserTotalParticipationResponse(
                classUserAttendanceCount,
                missedClassAttendanceCount
        );
    }
}
