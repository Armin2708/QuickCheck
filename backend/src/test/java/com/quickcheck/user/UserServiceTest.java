/*
package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.attendance.AttendanceDao;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.s3.S3Buckets;
import com.quickcheck.s3.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserDao userDao;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AttendanceDao attendanceDao;
    @Mock
    private S3Service s3Service;
    @Mock
    private S3Buckets s3Buckets;
    private UserService underTest;
    private final UserDTOMapper userDTOMapper = new UserDTOMapper();

    @BeforeEach
    void setUp() {
        underTest = new UserService(userDao,attendanceDao,passwordEncoder,userDTOMapper, s3Service, s3Buckets);
    }

    @Test
    void getAllUsers() {
        // When
        underTest.getAllUsers();

        // Then
        verify(userDao).selectAllUsers();
    }

    @Test
    void canGetUser() {
        // Given
        int userId = 10;
        User user = new User(
                10,
                "John Doe",
                "123 Main St",
                "john@example.com",
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        when(userDao.selectUserById(userId)).thenReturn(Optional.of(user));

        UserDTO expected = userDTOMapper.apply(user);

        // When
        UserDTO actual = underTest.getUserById(userId);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void willThrowWhenGetUserReturnEmptyOptional() {
        // Given
        int userId = 10;

        when(userDao.selectUserById(userId)).thenReturn(Optional.empty());

        // When
        // Then
        assertThatThrownBy(() -> underTest.getUserById(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("user with id [%s] not found".formatted(userId));
    }

    @Test
    void addUser() throws SQLException {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest(
                "John Doe", "123 Main St",
                "john@example.com", "password", Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE
        );

        String passwordHash="!@#&*jbsfhhsd";

        when(passwordEncoder.encode(request.password())).thenReturn(passwordHash);

        when(userDao.existUserWithEmail(request.email())).thenReturn(false);

        // When
        underTest.addUser(request);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDao).insertUser(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser.getEmail()).isEqualTo(request.email());
        assertThat(capturedUser.getName()).isEqualTo(request.name());
        assertThat(capturedUser.getPassword()).isEqualTo(passwordHash);
    }

    @Test
    void willThrowWhenEmailExistsWhileAddingUser() throws SQLException {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest(
                 "John Doe", "123 Main St",
                "john@example.com", "password", Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE
        );

        when(userDao.existUserWithEmail(request.email())).thenReturn(true);

        // When
        assertThatThrownBy(() -> underTest.addUser(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Email already exists");

        // Then
        verify(userDao, never()).insertUser(any());
    }

    @Test
    void deleteUserById() {
        // Given
        int userId = 10;

        when(userDao.existUserById(userId)).thenReturn(true);

        // When
        underTest.deleteUser(userId);

        // Then
        verify(userDao).deleteUserById(userId);
    }

    @Test
    void willThrowWhenUserDoesNotExistOnDelete() {
        // Given
        int userId = 10;

        when(userDao.existUserById(userId)).thenReturn(false);

        // When
        assertThatThrownBy(() -> underTest.deleteUser(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("User with id [%s] not found".formatted(userId));

        // Then
        verify(userDao, never()).deleteUserById(anyInt());
    }

    @Test
    void updateUser() {
        // Given
        int userId = 10;
        User existingUser = new User(
                10, "John Doe",
                "123 Main St", "john@example.com", "password",
                Date.valueOf("2000-01-01").toLocalDate(), Gender.MALE,
                List.of(Roles.USER)
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                "Johnny", "New Address",
                "johnny@example.com", "newpassword", Date.valueOf("2000-01-05").toLocalDate(),
                Gender.MALE
        );

        when(userDao.selectUserById(userId)).thenReturn(Optional.of(existingUser));
        when(userDao.existUserWithEmail(updateRequest.email())).thenReturn(false);

        // When
        underTest.updateUser(userId, updateRequest);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDao).updateUser(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getName()).isEqualTo(updateRequest.name());
        assertThat(capturedUser.getAddress()).isEqualTo(updateRequest.address());
        assertThat(capturedUser.getEmail()).isEqualTo(updateRequest.email());
        assertThat(capturedUser.getDateOfBirth()).isEqualTo(updateRequest.dateOfBirth());
        assertThat(capturedUser.getGender()).isEqualTo(updateRequest.gender());

    }

    @Test
    void willThrowWhenNoChangesFoundOnUpdate() {
        // Given
        int userId = 10;
        User existingUser = new User(
                10,  "John Doe", "123 Main St",
                "john@example.com", "password", Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                existingUser.getName(), existingUser.getAddress(), existingUser.getEmail(),
                existingUser.getPassword(), existingUser.getDateOfBirth(), existingUser.getGender()
        );

        when(userDao.selectUserById(userId)).thenReturn(Optional.of(existingUser));

        // When
        assertThatThrownBy(() -> underTest.updateUser(userId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        // Then
        verify(userDao, never()).updateUser(any());
    }

    @Test
    void willThrowWhenEmailAlreadyExistsOnUpdate() {
        // Given
        int userId = 10;
        User existingUser = new User(
                10, "John Doe", "123 Main St",
                "john@example.com", "password", Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                "Johnny", "New Address",
                "existingemail@example.com", "newpassword",
                Date.valueOf("2000-01-05").toLocalDate(), Gender.MALE
        );

        when(userDao.selectUserById(userId)).thenReturn(Optional.of(existingUser));
        when(userDao.existUserWithEmail(updateRequest.email())).thenReturn(true);

        // When
        assertThatThrownBy(() -> underTest.updateUser(userId, updateRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Email already taken");

        // Then
        verify(userDao, never()).updateUser(any());
    }

    @Test
    void getUsersInClass() {
        // Given
        int classId = 1;
        User user = new User(
                1, "John Doe", "123 Main St",
                "john@example.com", "password",
                Date.valueOf("2000-01-01").toLocalDate(), Gender.MALE,
                List.of(Roles.ADMIN)
        );

        when(userDao.selectAllUserInClassById(classId)).thenReturn(List.of(user));

        UserDTO expectedUserDTO = userDTOMapper.apply(user);

        // When
        List<UserDTO> actual = underTest.getUsersInClass(classId);

        // Then
        assertThat(actual).containsExactly(expectedUserDTO);
    }

    @Test
    void getUsersInClassEmpty() {
        // Given
        int classId = 1;
        when(userDao.selectAllUserInClassById(classId)).thenReturn(List.of());

        // When
        List<UserDTO> actual = underTest.getUsersInClass(classId);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void getUserByEmail() {
        // Given
        String email = "john@example.com";
        User user = new User(
                1, "John Doe", "123 Main St",
                email, "password",
                Date.valueOf("2000-01-01").toLocalDate(), Gender.MALE,
                List.of(Roles.USER)
        );

        when(userDao.selectUserByEmail(email)).thenReturn(Optional.of(user));
        UserDTO expected = userDTOMapper.apply(user);

        // When
        UserDTO actual = underTest.getUserByEmail(email);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void willThrowWhenUserByEmailNotFound() {
        // Given
        String email = "nonexistent@example.com";
        when(userDao.selectUserByEmail(email)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getUserByEmail(email))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("user with id [%s] not found".formatted(email));
    }

    @Test
    void addUserAssignsAdminRoleForAdminEmail() throws SQLException {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest(
                "Admin User", "Admin St",
                "quickcheckteam@gmail.com", "adminPassword",
                Date.valueOf("2000-01-01").toLocalDate(), Gender.MALE
        );

        String encodedPassword = "!@#&*jbsfhhsd";
        when(passwordEncoder.encode(request.password())).thenReturn(encodedPassword);
        when(userDao.existUserWithEmail(request.email())).thenReturn(false);

        // When
        underTest.addUser(request);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDao).insertUser(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getRoles()).containsExactly(Roles.ADMIN);
    }

    @Test
    void addUserAssignsUserRoleByDefault() throws SQLException {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest(
                "John Doe", "123 Main St",
                "john@example.com", "password", Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE
        );

        String encodedPassword = "!@#&*encodedpassword";
        when(passwordEncoder.encode(request.password())).thenReturn(encodedPassword);
        when(userDao.existUserWithEmail(request.email())).thenReturn(false);

        // When
        underTest.addUser(request);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDao).insertUser(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getRoles()).containsExactly(Roles.USER);
    }
}
*/
