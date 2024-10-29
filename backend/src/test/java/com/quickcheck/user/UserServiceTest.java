/*
package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.SQLException;
import java.util.Arrays;
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
    private UserService underTest;
    private final UserDTOMapper userDTOMapper = new UserDTOMapper();

    @BeforeEach
    void setUp() {
        underTest = new UserService(userDao,passwordEncoder,userDTOMapper);
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
                "Test School",
                "John Doe",
                "123 Main St",
                "john@example.com",
                "password",
                "2000-01-01",
                Gender.MALE,
                Arrays.asList(1, 2, 3),
                List.of("ADMIN")
        );
        when(userDao.selectUserById(userId)).thenReturn(Optional.of(user));

        UserDTO expected = userDTOMapper.apply(user);

        // When
        UserDTO actual = underTest.getUser(userId);

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
        assertThatThrownBy(() -> underTest.getUser(userId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("user with id [%s] not found".formatted(userId));
    }

    @Test
    void addUser() throws SQLException {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest(
                "Test School", "John Doe", "123 Main St",
                "john@example.com", "password", "2000-01-01",
                Gender.MALE, List.of("ADMIN")
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
                "Test School", "John Doe", "123 Main St",
                "john@example.com", "password", "2000-01-01",
                Gender.MALE,
                List.of("ADMIN")
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
                10, "Test School", "John Doe",
                "123 Main St", "john@example.com", "password",
                "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3),
                List.of("ADMIN")
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                "New School", "Johnny", "New Address",
                "johnny@example.com", "newpassword", "2000-05-05",
                Gender.MALE, Arrays.asList(4, 5)
        );

        when(userDao.selectUserById(userId)).thenReturn(Optional.of(existingUser));
        when(userDao.existUserWithEmail(updateRequest.email())).thenReturn(false);

        // When
        underTest.updateUser(userId, updateRequest);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDao).updateUser(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getEmail()).isEqualTo(updateRequest.email());
        assertThat(capturedUser.getName()).isEqualTo(updateRequest.name());
        assertThat(capturedUser.getSchoolName()).isEqualTo(updateRequest.schoolName());
    }

    @Test
    void willThrowWhenNoChangesFoundOnUpdate() {
        // Given
        int userId = 10;
        User existingUser = new User(
                10, "Test School", "John Doe", "123 Main St",
                "john@example.com", "password", "2000-01-01",
                Gender.MALE, Arrays.asList(1, 2, 3),
                List.of("ADMIN")
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                existingUser.getSchoolName(), existingUser.getName(), existingUser.getAddress(), existingUser.getEmail(),
                existingUser.getPassword(), existingUser.getDateOfBirth(), existingUser.getGender(), existingUser.getClassesId()
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
                10, "Test School", "John Doe", "123 Main St",
                "john@example.com", "password", "2000-01-01",
                Gender.MALE, Arrays.asList(1, 2, 3),
                List.of("ADMIN")
        );

        UserUpdateRequest updateRequest = new UserUpdateRequest(
                "Test School", "Johnny", "New Address",
                "existingemail@example.com", "newpassword",
                "2000-05-05", Gender.MALE, Arrays.asList(4, 5)
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
}
*/
