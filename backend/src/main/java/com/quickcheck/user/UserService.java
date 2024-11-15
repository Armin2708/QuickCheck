package com.quickcheck.user;

import com.quickcheck.Roles;
import com.quickcheck.attendance.AttendanceDao;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.s3.S3Buckets;
import com.quickcheck.s3.S3Service;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService{

    private final UserDao userDao;
    private final AttendanceDao attendanceDao;
    private final PasswordEncoder passwordEncoder;
    private final UserDTOMapper userDTOMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException(
                    "User with id [%s] does not exist".formatted(userId)
            );
        }
    }

    public UserService(UserDao userDao, AttendanceDao attendanceDao, PasswordEncoder passwordEncoder, UserDTOMapper userDTOMapper, S3Service s3Service, S3Buckets s3Buckets) {
        this.userDao = userDao;
        this.attendanceDao = attendanceDao;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }

    public List<UserDTO> getAllUsers(){
        return userDao.selectAllUsers()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersOfAttendance(String attendanceTag){
        if (attendanceTag.isEmpty() || !attendanceDao.existAttendanceWithTag(attendanceTag)){
            throw new ResourceNotFoundException("Attendance with tag [%s] not found".formatted(attendanceTag));
        }
        return userDao.selectAllUsersOfAttendance(attendanceTag)
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersInClass(Integer classId){
        return userDao.selectAllUserInClassById(classId)
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer userId){
        return userDao.selectUserById(userId)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
    }

    public UserDTO getUserByEmail(String email){
        return userDao.selectUserByEmail(email)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(email)
                ));
    }

    public Boolean isUserInAttendance(Integer userId, String tag){
        return userDao.existUserInAttendance(userId,tag);
    }
    public Boolean isUserInOrganization(Integer userId, String orgName){
        return userDao.existUserInOrganization(userId,orgName);
    }
    public Boolean isUserInClass(Integer userId, Integer classId){
        return userDao.existUserInClass(userId,classId);
    }

    public void addUser(UserRegistrationRequest request) throws SQLException {
        String email = request.email().toLowerCase();
        if (userDao.existUserWithEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }
        Roles role = Roles.USER;
        if (email.equals("quickcheckteam@gmail.com")){
            role = Roles.ADMIN;
        }

            User user = new User(
                    request.name(),
                    request.address(),
                    email,
                    passwordEncoder.encode(request.password()),
                    request.dateOfBirth(),
                    request.gender(),
                    List.of(role)
            );
            userDao.insertUser(user);
    }

    public void updateUser(Integer userId, UserUpdateRequest userUpdateRequest) {
        User user = userDao.selectUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
        boolean changes = false;

        if (userUpdateRequest.name() != null && !userUpdateRequest.name().equals(user.getName())) {
            user.setName(userUpdateRequest.name());
            changes = true;
        }

        if (userUpdateRequest.address() != null && !userUpdateRequest.address().equals(user.getAddress())) {
            user.setAddress(userUpdateRequest.address());
            changes = true;
        }

        if (userUpdateRequest.email() != null && !userUpdateRequest.email().equalsIgnoreCase(user.getEmail())) {
            String newEmail = userUpdateRequest.email().toLowerCase();  // Convert new email to lowercase
            if (userDao.existUserWithEmail(newEmail)) {
                throw new DuplicateResourceException("Email already taken");
            }
            user.setEmail(newEmail);
            changes = true;
        }

        if (userUpdateRequest.password() != null && !userUpdateRequest.password().equals(user.getPassword())) {
            String newPassword = passwordEncoder.encode(userUpdateRequest.password());
            user.setPassword(newPassword);
            changes = true;
        }

        if (userUpdateRequest.dateOfBirth() != null && !userUpdateRequest.dateOfBirth().equals(user.getDateOfBirth())) {
            user.setDateOfBirth(userUpdateRequest.dateOfBirth());
            changes = true;
        }

        if (userUpdateRequest.gender() != null && !userUpdateRequest.gender().equals(user.getGender())) {
            user.setGender(userUpdateRequest.gender());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        userDao.updateUser(user);
    }

    public void updateUserRoles(Integer userId, UserRolesUpdateRequest updateRequest){
        User user = userDao.selectUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
        boolean changes = false;
        if (updateRequest.roles() != null && !updateRequest.roles().equals(user.getRoles())) {
            userDao.deleteUserRoles(userId); // Delete existing roles

            // Insert updated roles
            userDao.insertUserRoles(userId, updateRequest.roles());

            user.setRoles(updateRequest.roles()); // Update user object roles
            changes = true;
        }
        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }
    }

    public void deleteUser(Integer userId){
        checkIfUserExists(userId);
        userDao.deleteUserById(userId);
    }

    public void uploadUserImage(Integer userId, MultipartFile file) {
        checkIfUserExists(userId);
        String profileImageId = UUID.randomUUID().toString();

        try {
            s3Service.putObject(
                    s3Buckets.getUser(),
                    "profile-images/%s/%s".formatted(userId, profileImageId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        userDao.updateUserProfileImageId(profileImageId,userId);
    }

    public byte[] getUserImage(Integer userId) {
        UserDTO user = userDao.selectUserById(userId)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));

        if (StringUtils.isBlank(user.profileImageId())){
            throw new ResourceNotFoundException("User with id [%s] profile image not found".formatted(userId));
        }

        byte[] profileImage = s3Service.getObject(
                s3Buckets.getUser(),
                "profile-images/%s/%s".formatted(userId, user.profileImageId())
        );

        return profileImage;
    }
}
