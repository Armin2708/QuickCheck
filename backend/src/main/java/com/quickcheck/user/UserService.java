package com.quickcheck.user;

import com.quickcheck.attendance.AttendanceDao;
import com.quickcheck.chat.ChatDao;
import com.quickcheck.classes.ClassDao;
import com.quickcheck.email.EmailDao;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.Organization;
import com.quickcheck.organization.OrganizationDao;
import com.quickcheck.s3.S3Buckets;
import com.quickcheck.s3.S3Service;
import com.quickcheck.user.roles.RoleDTO;
import com.quickcheck.user.roles.RoleDTOMapper;
import com.quickcheck.user.roles.RoleDao;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService{

    private final UserDao userDao;
    private final AttendanceDao attendanceDao;
    private final OrganizationDao organizationDao;
    private final PasswordEncoder passwordEncoder;
    private final UserDTOMapper userDTOMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final ChatDao chatDao;
    private final RoleDao roleDao;
    private final RoleDTOMapper roleDTOMapper;
    private final ClassDao classDao;
    private final EmailDao emailDao;

    public UserService(UserDao userDao, AttendanceDao attendanceDao, OrganizationDao organizationDao, PasswordEncoder passwordEncoder, UserDTOMapper userDTOMapper, S3Service s3Service, S3Buckets s3Buckets, ChatDao chatDao, RoleDao roleDao, RoleDTOMapper roleDTOMapper, ClassDao classDao, EmailDao emailDao) {
        this.userDao = userDao;
        this.attendanceDao = attendanceDao;
        this.organizationDao = organizationDao;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.chatDao = chatDao;
        this.roleDao = roleDao;
        this.roleDTOMapper = roleDTOMapper;
        this.classDao = classDao;
        this.emailDao = emailDao;
    }

    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException(
                    "User with id [%s] does not exist".formatted(userId)
            );
        }
    }

    private void checkIfOrganizationExists(Integer orgId){
        if (!organizationDao.existOrganizationById(orgId)){
            throw new ResourceNotFoundException(
                    "Organization with id [%s] does not exist".formatted(orgId)
            );
        }
    }

    private void checkIfChatExists(Integer chatId){
        if (!chatDao.existChatById(chatId)){
            throw new ResourceNotFoundException("No Chat found with id %s".formatted(chatId));
        }
    }

    private void checkIfClassExists(Integer classId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No Class found with id %s".formatted(classId));
        }
    }



    public List<UserDTO> getAllUsers() {
        return userDao.selectAllUsers()
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserRoles(user.getId())
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
    }

    public List<UserDTO> getAllUsersFromOrganization(Integer organizationId){
        checkIfOrganizationExists(organizationId);
        Organization organization = organizationDao.selectOrganizationById(organizationId).get();
        return userDao.selectAllUserInOrganizationById(organizationId)
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserOrganizationRoles(user.getId(), organization.getName())
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
    }

    public List<UserDTO> getUsersFromOrganizationBySearch(Integer organizationId, String userName){
        checkIfOrganizationExists(organizationId);
        Organization organization = organizationDao.selectOrganizationById(organizationId).get();
        return userDao.selectUsersFromOrganizationBySearch(organizationId,userName+"%")
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserOrganizationRoles(user.getId(), organization.getName())
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
        checkIfClassExists(classId);
        return userDao.selectAllUserInClassById(classId)
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserOrganizationRolesInClass(user.getId(), classId)
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
    }

    public List<UserDTO> getChatMembers(Integer chatId){
        checkIfChatExists(chatId);
        return userDao.selectChatMembers(chatId)
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer userId){
        UserDTO userDTO = userDao.selectUserById(userId)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
        List<RoleDTO> roleDTO = roleDao.selectUserRoles(userId)
                .stream()
                .map(roleDTOMapper)
                .toList();

        return new UserDTO(
                userDTO.id(),
                userDTO.name(),
                userDTO.address(),
                userDTO.email(),
                userDTO.dateOfBirth(),
                userDTO.gender(),
                userDTO.accountType(),
                roleDTO, // Updated roles
                userDTO.username(),
                userDTO.profileImageId()
        );
    }

    public List<UserDTO> getUsersBySearch(String userName){
        return userDao.selectUsersBySearch(userName+"%")
                .stream()
                .map(user -> {
                    // Map user to UserDTO
                    UserDTO userDTO = userDTOMapper.apply(user);

                    // Fetch roles for the user
                    List<RoleDTO> roles = roleDao.selectUserRoles(user.getId())
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

    }

    public UserDTO getUserByEmail(String email){
        UserDTO userDTO = userDao.selectUserByEmail(email)
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(email)
                ));
        List<RoleDTO> roles = roleDao.selectUserRoles(userDTO.id())
                .stream()
                .map(roleDTOMapper)
                .toList();

        return new UserDTO(
                userDTO.id(),
                userDTO.name(),
                userDTO.address(),
                userDTO.email(),
                userDTO.dateOfBirth(),
                userDTO.gender(),
                userDTO.accountType(),
                roles, // Updated roles
                userDTO.username(),
                userDTO.profileImageId()
        );
    }

    public Boolean isUserInAttendance(Integer userId, String tag){
        return userDao.existUserInAttendance(userId,tag);
    }

    public Boolean isUserInChat(Integer userId, Integer chatId){
        return userDao.existUserInChat(userId,chatId);
    }

    public Boolean isUserInOrganization(Integer userId, String orgName){
        return userDao.existUserInOrganization(userId,orgName);
    }
    public Boolean isUserInClass(Integer userId, Integer classId){
        return userDao.existUserInClass(userId,classId);
    }

    public String addUser(UserRegistrationRequest request) throws SQLException {
        if (userDao.existUserWithEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists");
        }

        AccountType accountType = AccountType.USER;
        if (request.email().equals("quickcheckteam@gmail.com")){
            accountType = AccountType.ADMIN;
        }

            User user = new User(
                    request.name(),
                    request.address(),
                    request.email(),
                    passwordEncoder.encode(request.password()),
                    request.dateOfBirth(),
                    request.gender(),
                    null,
                    accountType
            );
            userDao.insertUser(user);
            return accountType.name();
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

    public void updateUserAccountType(Integer userId, UpdateAccountTypeRequest updateRequest){
        User user = userDao.selectUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
        boolean changes = false;
        if (updateRequest.accountType() != null && !updateRequest.accountType().equals(user.getAccountType())) {
            user.setAccountType(updateRequest.accountType());
            userDao.updateUser(user); // Delete existing roles

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

    public void resetPassword(UserPasswordResetRequest request){
        if (!emailDao.getPasswordResetEmailByEmail(request.email()).get().getCode().equals(request.code())){
            throw new ResourceNotFoundException("Wrong verification Code".formatted(request.code()));
        }

        User user = userDao.selectUserByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "user with email [%s] not found".formatted(request.email())
        ));

        String newPassword = passwordEncoder.encode(request.password());
        user.setPassword(newPassword);

        userDao.updateUser(user);

    }
}
