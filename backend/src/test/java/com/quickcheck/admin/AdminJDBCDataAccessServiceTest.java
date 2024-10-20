package com.quickcheck.admin;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class AdminJDBCDataAccessServiceTest extends AbstractTestContainer {

    private AdminJDBCDataAccessService underTest;
    private final AdminRowMapper adminRowMapper = new AdminRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new AdminJDBCDataAccessService(
                getJdbcTemplate(),
                adminRowMapper
        );
    }

    @Test
    void selectAllAdmins() throws SQLException {
        // Given
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID(),
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3) // example classesId
        );
        underTest.insertAdmin(admin);

        // When
        List<Admin> actual = underTest.selectAllAdmins();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectAdminById() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );
        underTest.insertAdmin(admin);

        int id = underTest.selectAllAdmins()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<Admin> actual = underTest.selectAdminById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getName()).isEqualTo(admin.getName());
            assertThat(u.getEmail()).isEqualTo(admin.getEmail());
            assertThat(u.getGender()).isEqualTo(admin.getGender());
            assertThat(u.getClassesId()).containsExactlyElementsOf(admin.getClassesId());
        });
    }

    @Test
    void willReturnEmptyWhenSelectAdminById() {
        // Given
        int id = 0;

        // When
        var actual = underTest.selectAdminById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertAdmin() throws SQLException {
        // Given
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID(),
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );

        // When
        underTest.insertAdmin(admin);

        // Then
        List<Admin> admins = underTest.selectAllAdmins();
        assertThat(admins).extracting(Admin::getEmail).contains(admin.getEmail());
    }

    @Test
    void existAdminWithEmail() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );
        underTest.insertAdmin(admin);

        // When
        boolean actual = underTest.existAdminWithEmail(email);

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existAdminWithEmailReturnsFalseWhenDoesNotExist() {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();

        // When
        boolean actual = underTest.existAdminWithEmail(email);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteAdminById() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );
        underTest.insertAdmin(admin);

        int id = underTest.selectAllAdmins()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // When
        underTest.deleteAdminById(id);

        // Then
        Optional<Admin> actual = underTest.selectAdminById(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void updateAdminEmail() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );
        underTest.insertAdmin(admin);

        int id = underTest.selectAllAdmins()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        var newEmail = "newemail@example.com";

        // When
        Admin update = new Admin();
        update.setId(id);
        update.setEmail(newEmail);
        underTest.updateAdmin(update);

        // Then
        Optional<Admin> actual = underTest.selectAdminById(id);
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getEmail()).isEqualTo(newEmail);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        Admin admin = new Admin(
                "Test School",
                "Test Name",
                "Test Address",
                email,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );
        underTest.insertAdmin(admin);

        int id = underTest.selectAllAdmins()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // When
        Admin update = new Admin();
        update.setId(id);
        underTest.updateAdmin(update);

        // Then
        Optional<Admin> actual = underTest.selectAdminById(id);
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getId()).isEqualTo(id);
            assertThat(u.getEmail()).isEqualTo(admin.getEmail());
            assertThat(u.getName()).isEqualTo(admin.getName());
        });
    }
}
