package com.quickcheck.user;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class UserJDBCDataAccessServiceTest extends AbstractTestContainer {

    private UserJDBCDataAccessService underTest;
    private final UserRowMapper userRowMapper = new UserRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new UserJDBCDataAccessService(
                getJdbcTemplate(),
                userRowMapper
        );
    }

    @Test
    void selectAllUsers() throws SQLException {
        // Given
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID(),
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")// example classesId
        );
        underTest.insertUser(user);

        // When
        List<User> actual = underTest.selectAllUsers();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectUserById() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<User> actual = underTest.selectUserById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getName()).isEqualTo(user.getName());
            assertThat(u.getEmail()).isEqualTo(user.getEmail());
            assertThat(u.getGender()).isEqualTo(user.getGender());
            assertThat(u.getClassesId()).containsExactlyElementsOf(user.getClassesId());
        });
    }

    @Test
    void willReturnEmptyWhenSelectUserById() {
        // Given
        int id = 0;

        // When
        var actual = underTest.selectUserById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertUser() throws SQLException {
        // Given
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID(),
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );

        // When
        underTest.insertUser(user);

        // Then
        List<User> users = underTest.selectAllUsers();
        assertThat(users).extracting(User::getEmail).contains(user.getEmail());
    }

    @Test
    void existUserWithEmail() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );
        underTest.insertUser(user);

        // When
        boolean actual = underTest.existUserWithEmail(email);

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existUserWithEmailReturnsFalseWhenDoesNotExist() {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();

        // When
        boolean actual = underTest.existUserWithEmail(email);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteUserById() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // When
        underTest.deleteUserById(id);

        // Then
        Optional<User> actual = underTest.selectUserById(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void updateUserEmail() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        var newEmail = "newemail@example.com";

        // When
        User update = new User();
        update.setId(id);
        update.setEmail(newEmail);
        underTest.updateUser(update);

        // Then
        Optional<User> actual = underTest.selectUserById(id);
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getEmail()).isEqualTo(newEmail);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3),
                List.of("ADMIN")
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // When
        User update = new User();
        update.setId(id);
        underTest.updateUser(update);

        // Then
        Optional<User> actual = underTest.selectUserById(id);
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getEmail()).isEqualTo(user.getEmail());
            assertThat(u.getName()).isEqualTo(user.getName());
        });
    }
}
