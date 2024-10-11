package com.quickcheck.user;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class UserService{

    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> getAllUsers(){
        return userDao.selectAllUsers();
    }

    public User getUser(Integer userId){
        return userDao.selectUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "user with id [%s] not found".formatted(userId)
                ));
    }

    public void addUser(UserRegistrationRequest request) throws SQLException {
        String email = request.email();
        if (userDao.existUserWithEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }
            User user = new User(
                    request.schoolName(),
                    request.name(),
                    request.address(),
                    request.email(),
                    request.password(),
                    request.dateOfBirth(),
                    request.gender(),
                    request.classesId()
            );
            userDao.insertUser(user);
    }

    public void updateUser(Integer userId, UserUpdateRequest userUpdateRequest) {
        User user = userDao.selectUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User with id [%s] not found".formatted(userId)
                ));
        boolean changes = false;

        if (userUpdateRequest.schoolName() != null && !userUpdateRequest.schoolName().equals(user.getSchoolName())) {
            user.setSchoolName(userUpdateRequest.schoolName());
            changes = true;
        }

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
            user.setPassword(userUpdateRequest.password());
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

        if (userUpdateRequest.classesId() != null && !userUpdateRequest.classesId().equals(user.getClassesId())) {
            user.setClassesId(userUpdateRequest.classesId());
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
