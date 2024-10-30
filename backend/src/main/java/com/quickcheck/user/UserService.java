package com.quickcheck.user;

import com.quickcheck.Roles;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService{

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final UserDTOMapper userDTOMapper;

    public UserService(UserDao userDao, PasswordEncoder passwordEncoder, UserDTOMapper userDTOMapper) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
    }

    public List<UserDTO> getAllUsers(){
        return userDao.selectAllUsers()
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

    public void addUser(UserRegistrationRequest request) throws SQLException {
        String email = request.email();
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
                    request.email(),
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

        if (userUpdateRequest.email() != null && !userUpdateRequest.email().equals(user.getEmail())) {
            if (userDao.existUserWithEmail(userUpdateRequest.email())) {
                throw new DuplicateResourceException("Email already taken");
            }
            user.setEmail(userUpdateRequest.email());
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

        if (userUpdateRequest.roles() != null && !userUpdateRequest.roles().equals(user.getRoles())) {
            userDao.deleteUserRoles(userId); // Delete existing roles

            // Insert updated roles
            userDao.insertUserRoles(userId, userUpdateRequest.roles());

            user.setRoles(userUpdateRequest.roles()); // Update user object roles
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        userDao.updateUser(user);
    }
    public void deleteUser(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("User with id [%s] not found".formatted(userId));
        }
        userDao.deleteUserById(userId);
    }
}
