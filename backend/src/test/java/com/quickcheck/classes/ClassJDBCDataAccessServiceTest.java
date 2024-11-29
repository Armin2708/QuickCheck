/*package com.quickcheck.classes;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import com.quickcheck.user.roles.Roles;
import com.quickcheck.classroom.ClassroomJDBCDataAccessService;
import com.quickcheck.user.User;
import com.quickcheck.user.UserJDBCDataAccessService;
import com.quickcheck.user.UserRowMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class ClassJDBCDataAccessServiceTest extends AbstractTestContainer {

    private ClassJDBCDataAccessService underTest;
    private final ClassRowMapper classRowMapper = new ClassRowMapper();

    private UserJDBCDataAccessService userUnderTest;
    private final UserRowMapper userRowMapper = new UserRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new ClassJDBCDataAccessService(
                getJdbcTemplate(),
                classRowMapper
        );
        userUnderTest = new UserJDBCDataAccessService(
                getJdbcTemplate(),
                userRowMapper
        );
    }
    @AfterEach
    void tearDown() throws SQLException {
        // Clean up inserted Users and Classrooms after each test
        List<Class> aClasses = underTest.selectAllClasses();
        aClasses.forEach(classroom -> underTest.deleteClassById(class.getId()));
        List<User> users = userUnderTest.selectAllUsers();
        users.forEach(user -> userUnderTest.deleteUserById(user.getId()));

    }

    @Test
    void selectAllClassrooms() throws SQLException {
        // Given

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
        userUnderTest.insertUser(user);

        Integer profId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                profId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                10000,
                20000
        );

        underTest.insertClassroom(aClass);

        // When
        List<Class> actual = underTest.selectAllClassrooms();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectClassroomById() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);

        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );
        underTest.insertClassroom(aClass);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<Class> actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(aClass.getName());
            assertThat(c.getProfessorId()).isEqualTo(aClass.getProfessorId());
            assertThat(c.getLocation()).isEqualTo(aClass.getLocation());
            assertThat(c.getStartDate()).isEqualTo(aClass.getStartDate());
            assertThat(c.getEndDate()).isEqualTo(aClass.getEndDate());
            assertThat(c.getClassDays()).containsExactlyElementsOf(aClass.getClassDays());
            assertThat(c.getStudentsId()).containsExactlyElementsOf(aClass.getStudentsId());
            assertThat(c.getStudentsId()).containsExactlyElementsOf(aClass.getStudentsId());
        });
    }

    @Test
    void willReturnEmptyWhenSelectClassroomById() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        int id = 0;

        // When
        var actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertClassroom() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );

        // When
        underTest.insertClassroom(aClass);

        // Then
        List<Class> aClasses = underTest.selectAllClassrooms();
        assertThat(aClasses).extracting(Class::getName).contains(aClass.getName());
    }

    @Test
    void existClassroomByName() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );
        underTest.insertClassroom(aClass);

        // When
        boolean actual = underTest.existClassroomByName("Math 101");

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existClassroomByNameReturnsFalseWhenDoesNotExist() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        String name = "Non-existent Classroom";

        // When
        boolean actual = underTest.existClassroomByName(name);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteClassroomById() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );
        underTest.insertClassroom(aClass);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        // When
        underTest.deleteClassroomById(id);

        // Then
        Optional<Class> actual = underTest.selectClassroomById(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void updateClassroom() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );
        underTest.insertClassroom(aClass);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        var newName = "Advanced Math 101";

        // When
        Class update = new Class();
        update.setId(id);
        update.setName(newName);
        underTest.updateClassroom(update);

        // Then
        Optional<Class> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(newName);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() throws SQLException {
        // Given

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

        userUnderTest.insertUser(user);
        Integer userId = userUnderTest.selectAllUsers().get(0).getId();

        Class aClass = new Class(
                "Math 101",
                userId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // usersId
        );
        underTest.insertClassroom(aClass);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        // When
        Class update = new Class();
        update.setId(id);
        underTest.updateClassroom(update);

        // Then
        Optional<Class> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(aClass.getName());
        });
    }
}

*/
