package com.quickcheck.user;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.organization.Organization;
import com.quickcheck.organization.OrganizationJDBCDataAccessService;
import com.quickcheck.organization.OrganizationRowMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class UserJDBCDataAccessServiceTest extends AbstractTestContainer {

    private UserJDBCDataAccessService underTest;
    private final UserRowMapper userRowMapper = new UserRowMapper();
    private final UserRolesRowMapper userRolesRowMapper = new UserRolesRowMapper();

    private OrganizationJDBCDataAccessService orgUnderTest;
    private final OrganizationRowMapper organizationRowMapper = new OrganizationRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new UserJDBCDataAccessService(
                getJdbcTemplate(),
                userRowMapper,
                userRolesRowMapper
        );
        orgUnderTest = new OrganizationJDBCDataAccessService(
                getJdbcTemplate(),
                organizationRowMapper
        );
    }

    //TODO: WRITE THE TEST FOR ALL THESE JDBC FUNCTIONS,
    // AND WRITE THE TEST VARIANTS SUCH AS IF ONE IS EMPTY DOES IT PASS ?


    @Test
    void selectAllUserInOrganizationById(){
        // Given
        Organization organization = new Organization(
                "hello"
        );
        orgUnderTest.insertOrganization(organization);
        Integer organizationId = orgUnderTest.selectOrganizationByName("hello").get().getId();

        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                FAKER.date().birthday(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);
        Integer userId = underTest.selectUserByEmail(email).get().getId();

        orgUnderTest.joinOrganization(organizationId,userId);

        // When
        List<User> actual = underTest.selectAllUserInOrganizationById(organizationId);

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectAllUserInClassById() throws SQLException {
        // Given
        int classId = 1; // Example class ID
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                FAKER.date().birthday(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);
        // Simulate adding user to class...

        // When
        List<User> actual = underTest.selectAllUserInClassById(classId);

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void existUserByEmail() {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                FAKER.date().birthday(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // When
        boolean exists = underTest.existUserById(id);

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void updateUserAndVerify() throws SQLException {
        // Given
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                FAKER.date().birthday(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        int id = underTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        User updateUser = new User();
        updateUser.setId(id);
        updateUser.setEmail("updated.email@example.com");

        // When
        underTest.updateUser(updateUser);

        // Then
        Optional<User> actual = underTest.selectUserById(id);
        assertThat(actual).isPresent().hasValueSatisfying(u -> {
            assertThat(u.getEmail()).isEqualTo("updated.email@example.com");
        });
    }

    @Test
    void selectAllUsers() {
        // Given
        User user = new User(
                "Test User",
                "123 Main St",
                "testuser@example.com",
                "password",
                Date.valueOf("1985-06-05"),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        // When
        List<User> actual = underTest.selectAllUsers();

        // Then
        assertThat(actual).isNotEmpty();
        assertThat(actual.get(0).getName()).isEqualTo("Test User");
        assertThat(actual.get(0).getRoles()).contains(Roles.ADMIN);
    }

    @Test
    void selectUserById() {
        // Given
        User user = new User(
                "Test User By ID",
                "456 Another St",
                "testbyid@example.com",
                "password",
                Date.valueOf("1985-05-15"),
                Gender.FEMALE,
                List.of(Roles.USER)
        );
        underTest.insertUser(user);
        Integer id = underTest.selectUserByEmail(user.getEmail()).get().getId();

        // When
        Optional<User> actual = underTest.selectUserById(id);

        // Then
        assertThat(actual).isPresent();
        assertThat(actual.get().getName()).isEqualTo("Test User By ID");
        assertThat(actual.get().getRoles()).contains(Roles.USER);
    }

    @Test
    void selectUserByEmail() {
        // Given
        String email = "testemail@example.com";
        User user = new User(
                "Test User By Email",
                "789 Email St",
                email,
                "password",
                Date.valueOf("1990-02-02"),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        // When
        Optional<User> actual = underTest.selectUserByEmail(email);

        // Then
        assertThat(actual).isPresent();
        assertThat(actual.get().getName()).isEqualTo("Test User By Email");
        assertThat(actual.get().getRoles()).contains(Roles.ADMIN);
    }

    @Test
    void insertUserRoles() {
        // Given
        String email = "roles_test@example.com";
        User user = new User(
                "Roles Test User",
                "789 Roles St",
                email,
                "password",
                Date.valueOf("1995-03-03"),
                Gender.FEMALE,
                List.of()
        );
        underTest.insertUser(user);

        // When
        underTest.insertUserRoles(email, List.of(Roles.USER, Roles.ADMIN));

        // Then
        List<Roles> roles = underTest.selectUserRoles(email);
        assertThat(roles).containsExactlyInAnyOrder(Roles.USER, Roles.ADMIN);
    }

    @Test
    void deleteUserRoles() {
        // Given
        String email = "delete_roles@example.com";
        User user = new User(
                "Delete Roles User",
                "789 Delete St",
                email,
                "password",
                Date.valueOf("1992-12-12"),
                Gender.MALE,
                List.of(Roles.USER)
        );
        underTest.insertUser(user);

        // When
        underTest.deleteUserRoles(email);

        // Then
        List<Roles> roles = underTest.selectUserRoles(email);
        assertThat(roles).isEmpty();
    }

    @Test
    void existUserById() {
        // Given
        User user = new User(
                "Existence Test User",
                "Existence St",
                "existtest@example.com",
                "password",
                Date.valueOf("1998-08-08"),
                Gender.MALE,
                List.of(Roles.USER)
        );
        underTest.insertUser(user);
        int id = underTest.selectUserByEmail(user.getEmail()).get().getId();

        // When
        boolean exists = underTest.existUserById(id);

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void existUserWithEmail() {
        // Given
        String email = "existemail@example.com";
        User user = new User(
                "Exist Email User",
                "Exist Email St",
                email,
                "password",
                Date.valueOf("1988-05-05"),
                Gender.FEMALE,
                List.of(Roles.USER)
        );
        underTest.insertUser(user);

        // When
        boolean exists = underTest.existUserWithEmail(email);

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void insertUser() {
        // Given
        User user = new User(
                "Insert Test User",
                "Insert St",
                "insertuser@example.com",
                "password",
                Date.valueOf("1995-09-09"),
                Gender.FEMALE,
                List.of(Roles.ADMIN)
        );

        // When
        underTest.insertUser(user);

        // Then
        Optional<User> retrievedUser = underTest.selectUserByEmail(user.getEmail());
        assertThat(retrievedUser).isPresent();
        assertThat(retrievedUser.get().getName()).isEqualTo("Insert Test User");
        assertThat(retrievedUser.get().getRoles()).contains(Roles.ADMIN);
    }

    @Test
    void deleteUserById() {
        // Given
        User user = new User(
                "Delete Test User",
                "Delete St",
                "deletetest@example.com",
                "password",
                Date.valueOf("2000-01-01"),
                Gender.FEMALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        int id = underTest.selectUserByEmail(user.getEmail()).get().getId();

        // When
        underTest.deleteUserById(id);

        // Then
        Optional<User> actual = underTest.selectUserById(id);
        assertThat(actual).isEmpty();
    }

}
