package com.quickcheck.classroom;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.Gender;
import com.quickcheck.admin.Admin;
import com.quickcheck.admin.AdminJDBCDataAccessService;
import com.quickcheck.admin.AdminRowMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

public class ClassroomJDBCDataAccessServiceTest extends AbstractTestContainer {

    private ClassroomJDBCDataAccessService underTest;
    private final ClassroomRowMapper classroomRowMapper = new ClassroomRowMapper();

    private AdminJDBCDataAccessService adminUnderTest;
    private final AdminRowMapper adminRowMapper = new AdminRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new ClassroomJDBCDataAccessService(
                getJdbcTemplate(),
                classroomRowMapper
        );
        adminUnderTest = new AdminJDBCDataAccessService(
                getJdbcTemplate(),
                adminRowMapper
        );
    }
    @AfterEach
    void tearDown() throws SQLException {
        // Clean up inserted Admins and Classrooms after each test
        List<Classroom> classrooms = underTest.selectAllClassrooms();
        classrooms.forEach(classroom -> underTest.deleteClassroomById(classroom.getId()));
        List<Admin> admins = adminUnderTest.selectAllAdmins();
        admins.forEach(admin -> adminUnderTest.deleteAdminById(admin.getId()));

    }

    @Test
    void selectAllClassrooms() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );
        adminUnderTest.insertAdmin(admin);

        Integer id = adminUnderTest.selectAllAdmins().get(0).getId();


        Classroom classroom = new Classroom(
                "Math 101",
                id,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);



        // When
        List<Classroom> actual = underTest.selectAllClassrooms();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectClassroomById() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);

        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<Classroom> actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(classroom.getName());
            assertThat(c.getProfessorId()).isEqualTo(classroom.getProfessorId());
            assertThat(c.getLocation()).isEqualTo(classroom.getLocation());
            assertThat(c.getStartDate()).isEqualTo(classroom.getStartDate());
            assertThat(c.getEndDate()).isEqualTo(classroom.getEndDate());
            assertThat(c.getClassDays()).containsExactlyElementsOf(classroom.getClassDays());
            assertThat(c.getAdminsId()).containsExactlyElementsOf(classroom.getAdminsId());
            assertThat(c.getStudentsId()).containsExactlyElementsOf(classroom.getStudentsId());
        });
    }

    @Test
    void willReturnEmptyWhenSelectClassroomById() {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        int id = 0;

        // When
        var actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertClassroom() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );

        // When
        underTest.insertClassroom(classroom);

        // Then
        List<Classroom> classrooms = underTest.selectAllClassrooms();
        assertThat(classrooms).extracting(Classroom::getName).contains(classroom.getName());
    }

    @Test
    void existClassroomByName() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);

        // When
        boolean actual = underTest.existClassroomByName("Math 101");

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existClassroomByNameReturnsFalseWhenDoesNotExist() {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        String name = "Non-existent Classroom";

        // When
        boolean actual = underTest.existClassroomByName(name);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteClassroomById() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // When
        underTest.deleteClassroomById(id);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void updateClassroom() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        var newName = "Advanced Math 101";

        // When
        Classroom update = new Classroom();
        update.setId(id);
        update.setName(newName);
        underTest.updateClassroom(update);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(newName);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() throws SQLException {
        // Given

        Admin admin = new Admin(
                "CSULA",
                "Admin admin",
                "address",
                "email@email.com",
                "password",
                "2000-10-10",
                Gender.MALE,
                List.of(1,2,3)
        );

        adminUnderTest.insertAdmin(admin);
        Integer adminId = adminUnderTest.selectAllAdmins().get(0).getId();

        Classroom classroom = new Classroom(
                "Math 101",
                adminId,  // professorId
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                List.of("Monday", "Wednesday", "Friday"), // classDays
                List.of(101, 102, 103), // studentsId
                List.of(201, 202, 203) // adminsId
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getName().equals("Math 101"))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // When
        Classroom update = new Classroom();
        update.setId(id);
        underTest.updateClassroom(update);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getName()).isEqualTo(classroom.getName());
        });
    }
}
