package com.quickcheck.user;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.classes.Class;
import com.quickcheck.classes.ClassJDBCDataAccessService;
import com.quickcheck.classes.ClassRowMapper;
import com.quickcheck.classroom.Classroom;
import com.quickcheck.classroom.ClassroomJDBCDataAccessService;
import com.quickcheck.classroom.ClassroomRowMapper;
import com.quickcheck.organization.Organization;
import com.quickcheck.organization.OrganizationJDBCDataAccessService;
import com.quickcheck.organization.OrganizationRowMapper;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;


import javax.sql.DataSource;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@Transactional
@Rollback
public class UserJDBCDataAccessServiceTest extends AbstractTestContainer {

    private UserJDBCDataAccessService underTest;
    private ClassroomJDBCDataAccessService classroomUnderTest;
    private ClassJDBCDataAccessService classUnderTest;

    private final UserRowMapper userRowMapper = new UserRowMapper();
    private final UserRolesRowMapper userRolesRowMapper = new UserRolesRowMapper();

    private final ClassroomRowMapper classroomRowMapper = new ClassroomRowMapper();
    private final ClassRowMapper classRowMapper = new ClassRowMapper();

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
        classUnderTest = new ClassJDBCDataAccessService(
                getJdbcTemplate(),
                classRowMapper
        );
        classroomUnderTest = new ClassroomJDBCDataAccessService(
                getJdbcTemplate(),
                classroomRowMapper
        );
    }

    @AfterEach
    void tearDown() {
        DataSource dataSource = getDataSource();
        if (dataSource instanceof HikariDataSource) {
            ((HikariDataSource) dataSource).close();
        }
    }

    //TODO: WRITE THE TEST FOR ALL THESE JDBC FUNCTIONS,
    // AND WRITE THE TEST VARIANTS SUCH AS IF ONE IS EMPTY DOES IT PASS ?

    @Test
    void selectAllUserInOrganizationById() {
        // Given: clean and isolated database state
        String orgName = "Name";
        Organization organization = new Organization(orgName);
        orgUnderTest.insertOrganization(organization);
        Integer organizationId = orgUnderTest.selectOrganizationByName(orgName).get().getId();

        // Insert user
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);
        Integer userId = underTest.selectUserByEmail(email).get().getId();
        assertThat(userId).isNotNull();

        // Link user with organization using actual userId
        orgUnderTest.joinOrganization(organizationId, userId);

        // Retrieve users in the organization
        List<User> actual = underTest.selectAllUserInOrganizationById(organizationId);

        System.out.println(underTest.selectAllUsers());
        System.out.println(orgUnderTest.selectAllOrganizations());
        System.out.println(underTest.selectAllUserInOrganizationById(organizationId));


        // Verify user is found in the organization
        assertThat(actual).isNotEmpty();
        assertThat(actual.get(0).getEmail()).isEqualTo(email);
    }



    @Test
    void selectAllUserInClassById() {
        // Given: clean and isolated database state
        String email = FAKER.internet().safeEmailAddress() + "_" + UUID.randomUUID();
        String orgName = FAKER.name().name();
        Organization organization = new Organization(orgName);
        orgUnderTest.insertOrganization(organization);
        int orgId = orgUnderTest.selectOrganizationByName(orgName).get().getId();

        // Insert user
        User user = new User(
                FAKER.name().name(),
                FAKER.address().fullAddress(),
                email,
                FAKER.phoneNumber().cellPhone(),
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);
        int userId = underTest.selectUserByEmail(email).get().getId();

        // Insert classroom and class
        String classroomName = FAKER.name().name();
        Classroom classroom = new Classroom(classroomName, "location", 10);
        classroomUnderTest.insertClassroom(classroom);
        int classroomId = classroomUnderTest.selectClassroomByName(classroomName).get().getId();

        Class classObject = new Class(
                1,
                "Class Name",
                userId,
                FAKER.date().birthday(),
                FAKER.date().birthday(),
                classroomId,
                orgId
        );
        classUnderTest.insertClass(classObject);

        // Link user to class using actual userId
        classUnderTest.joinClass(classObject.getId(), userId);

        // Retrieve users in the class
        List<User> actual = underTest.selectAllUserInClassById(classObject.getId());

        // Verify user is found in the class
        assertThat(actual).isNotEmpty();
        assertThat(actual.get(0).getEmail()).isEqualTo(email);
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.ADMIN)
        );
        underTest.insertUser(user);

        // When
        List<User> actual = underTest.selectAllUsers();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectUserById() {
        // Given
        User user = new User(
                "Test User By ID",
                "456 Another St",
                "testbyid@example.com",
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.FEMALE,
                List.of()
        );
        underTest.insertUser(user);

        int userId = underTest.selectUserByEmail(email).get().getId();

        // When: Insert roles for the user
        underTest.insertUserRoles(userId, List.of(Roles.USER, Roles.ADMIN));

        // Then: Confirm roles are set correctly
        List<Roles> roles = underTest.selectUserRoles(userId);
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
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );
        underTest.insertUser(user);

        int userId = underTest.selectUserByEmail(email).get().getId();

        // When: Delete roles
        underTest.deleteUserRoles(userId);

        // Then: Confirm roles are empty
        List<Roles> roles = underTest.selectUserRoles(userId);
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
                Date.valueOf("2000-01-01").toLocalDate(),
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
