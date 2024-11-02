package com.quickcheck.organization;

import com.quickcheck.AbstractTestContainer;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.user.User;
import com.quickcheck.user.UserJDBCDataAccessService;
import com.quickcheck.user.UserRolesRowMapper;
import com.quickcheck.user.UserRowMapper;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class OrganizationJDBCDataAccessServiceTest extends AbstractTestContainer {

    private final OrganizationRowMapper organizationRowMapper = new OrganizationRowMapper();

    private final UserRowMapper userRowMapper = new UserRowMapper();
    private final UserRolesRowMapper userRolesRowMapper = new UserRolesRowMapper();
    private UserJDBCDataAccessService userUnderTest = new UserJDBCDataAccessService(
            getJdbcTemplate(),
            userRowMapper,
            userRolesRowMapper
    );
    private OrganizationJDBCDataAccessService underTest = new OrganizationJDBCDataAccessService(
            getJdbcTemplate(),
            organizationRowMapper
    );


    /*@BeforeEach
    void setUp() {
        underTest = new OrganizationJDBCDataAccessService(
                getJdbcTemplate(),
                organizationRowMapper
        );
        userUnderTest = new UserJDBCDataAccessService(
                getJdbcTemplate(),
                userRowMapper,
                userRolesRowMapper
        );
    }
    *//*@AfterEach
    void tearDown() {
        DataSource dataSource = getDataSource();
        dataSource.();
        }
    }*/

    @Test
    void selectAllOrganizations() {
        // Given
        String organizationName = FAKER.name().fullName();
        Organization organization = new Organization(
                organizationName
        );

        underTest.insertOrganization(organization);

        // When
        List<Organization> actual = underTest.selectAllOrganizations();

        // Then
        assertThat(actual).isNotEmpty();
    }


    @Test
    void selectOrganizationById() {
        // Given
        String organizationName = FAKER.name().name();
        Organization organization = new Organization(
                organizationName
        );

        underTest.insertOrganization(organization);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(o -> o.getName().equals(organizationName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<Organization> actual = underTest.selectOrganizationById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(o -> {
            assertThat(o.getId()).isEqualTo(id);
            assertThat(o.getName()).isEqualTo(organizationName);
        });
    }

    @Test
    void willReturnEmptyWhenSelectOrganizationById(){
        // Given
        Integer id = 1000;

        // When
        var actual = underTest.selectOrganizationById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void selectOrganizationByName() {
        // Given
        String organizationName = FAKER.name().name();
        Organization organization = new Organization(
                organizationName
        );
        underTest.insertOrganization(organization);

        Optional<Organization> actual = underTest.selectOrganizationByName(organizationName);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(o -> {
            assertThat(o.getName()).isEqualTo(organization.getName());
        });
    }

    @Test
    void willReturnEmptyWhenSelectOrganizationByName() {
        // Given
        String organizationName = FAKER.name().name();

        // When
        var actual = underTest.selectOrganizationByName(organizationName);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertOrganization() throws SQLException {
        // Given
        String organizationName = FAKER.name().name();
        Organization organization = new Organization(
                organizationName
        );

        // When
        underTest.insertOrganization(organization);

        // Then
        List<Organization> organizations = underTest.selectAllOrganizations();
        assertThat(organizations).extracting(Organization::getName).contains(organization.getName());
    }

    @Test
    void existOrganizationByName() {
        // Given
        String organizationName = FAKER.name().fullName();
        Organization organization = new Organization(
                organizationName
        );
        underTest.insertOrganization(organization);

        // When
        boolean actual = underTest.existOrganizationByName(organizationName);

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existOrganizationByNameReturnsFalseWhenDoesNotExist()  {
        // Given

        String orgName = FAKER.name().name();

        // When
        boolean actual = underTest.existOrganizationByName(orgName);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteOrganizationById() {

        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();
        // When
        underTest.deleteOrganizationById(id);

        // Then
        Optional<Organization> actual = underTest.selectOrganizationById(id);
        assertThat(actual).isNotPresent();
    }

     @Test
    void updateOrganization() {
        // Given

         String orgName = FAKER.name().name();
         Organization org = new Organization(
                 orgName
         );
         underTest.insertOrganization(org);

         int id = underTest.selectAllOrganizations()
                 .stream()
                 .filter(c -> c.getName().equals(orgName))
                 .map(Organization::getId)
                 .findFirst()
                 .orElseThrow();

        String newName = "Advanced Math 101";

        // When
        Organization update = new Organization();
        update.setId(id);
        update.setName(newName);
        underTest.updateOrganization(update);

        // Then
        Optional<Organization> actual = underTest.selectOrganizationById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(newName);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() {
        // Given

        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        // When
        Organization update = new Organization();
        update.setId(id);
        underTest.updateOrganization(update);

        // Then
        Optional<Organization> actual = underTest.selectOrganizationById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(org.getName());
        });
    }

    @Test
    void joinOrganization() {
        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        String email = FAKER.name().name()+"@email.com";
        User user = new User(
                "Name",
                "address",
                email,
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        userUnderTest.insertUser(user);

        int userId = userUnderTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        underTest.joinOrganization(id,userId);
        assertThat(underTest.existUserInOrganization(id, userId)).isTrue();
    }

    /*@Test
    void joinOrganizationWillThrowWhenAlreadyJoined() {
        Organization org = new Organization(
                "ORG1234"
        );
        underTest.insertOrganization(org);

        int orgId = underTest.selectAllOrganizations()
                .stream()
                .filter(o -> o.getName().equals("ORG1234"))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        String email = "email@email.com";
        User user = new User(
                "Name",
                email,
                "address",
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        int userId = userUnderTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        underTest.joinOrganization(orgId,userId);

        assertThat(underTest.joinOrganization(orgId, userId));
    }*/

    @Test
    void leaveOrganization() {
        Organization org = new Organization(
                "ORG1234"
        );
        underTest.insertOrganization(org);

        int orgId = underTest.selectAllOrganizations()
                .stream()
                .filter(o -> o.getName().equals("ORG1234"))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        String email = FAKER.name().name()+"@email.com";
        User user = new User(
                "Name",
                "address",
                email,
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        userUnderTest.insertUser(user);

        int userId = userUnderTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        underTest.leaveOrganization(orgId,userId);
        assertThat(underTest.existUserInOrganization(orgId, userId)).isFalse();
    }

    /*@Test
    void leaveOrganizationWillThrowWhenNotJoined() {
    }*/

    @Test
    void existUserInOrganization() {
        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        String email = FAKER.name().name()+"@email.com";
        User user = new User(
                "Name",
                "address",
                email,
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        userUnderTest.insertUser(user);

        int userId = userUnderTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        underTest.joinOrganization(id,userId);
        assertThat(underTest.existUserInOrganization(id, userId)).isTrue();

    }

    @Test
    void existUserInOrganizationWillThrowWhenNotInOrganization() {
        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();

        assertThat(underTest.existUserInOrganization(id, 123)).isFalse();
    }

    @Test
    void selectAllOrganizationsOfUser() {
        String orgName = FAKER.name().name();
        Organization org = new Organization(
                orgName
        );
        underTest.insertOrganization(org);

        int id = underTest.selectAllOrganizations()
                .stream()
                .filter(c -> c.getName().equals(orgName))
                .map(Organization::getId)
                .findFirst()
                .orElseThrow();


        String email = FAKER.name().name()+"@email.com";
        User user = new User(
                "Name",
                "address",
                email,
                "password",
                Date.valueOf("2000-01-01").toLocalDate(),
                Gender.MALE,
                List.of(Roles.USER)
        );

        userUnderTest.insertUser(user);
        int userId = userUnderTest.selectAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        underTest.joinOrganization(id,userId);
        assertThat(underTest.selectAllOrganizationsOfUser(userId)).isNotEmpty();
    }
}

