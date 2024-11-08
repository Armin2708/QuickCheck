/*
package com.quickcheck.classroom;

import com.quickcheck.AbstractTestContainer;
import com.quickcheck.organization.OrganizationJDBCDataAccessService;
import com.quickcheck.organization.OrganizationRowMapper;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class ClassroomJDBCDataAccessServiceTest extends AbstractTestContainer {

    private ClassroomJDBCDataAccessService underTest;
    private final ClassroomRowMapper classroomRowMapper = new ClassroomRowMapper();

    private OrganizationJDBCDataAccessService organizationUnderTest;
    private final OrganizationRowMapper organizationRowMapper = new OrganizationRowMapper();

    @BeforeEach
    void setUp() {
        underTest = new ClassroomJDBCDataAccessService(
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

    @Test
    void selectAllClassrooms() {
        // Given
        Classroom classroom = new Classroom(
                FAKER.name().name(),
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );

        underTest.insertClassroom(classroom);

        // When
        List<Classroom> actual = underTest.selectAllClassrooms();

        // Then
        assertThat(actual).isNotEmpty();
    }

    @Test
    void selectClassroomById() {
        // Given

        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getRoomName().equals(roomName))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // When
        Optional<Classroom> actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getRoomName()).isEqualTo(classroom.getRoomName());
            assertThat(c.getLocation()).isEqualTo(classroom.getLocation());
            assertThat(c.getCapacity()).isEqualTo(classroom.getCapacity());
        });
    }

    @Test
    void willReturnEmptyWhenSelectClassroomById() {
        // Given

        Integer id = 1000;
        // When
        var actual = underTest.selectClassroomById(id);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void selectClassroomByName() {
        // Given

        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        Optional<Classroom> actual = underTest.selectClassroomByName(roomName);

        // Then
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getRoomName()).isEqualTo(classroom.getRoomName());
            assertThat(c.getLocation()).isEqualTo(classroom.getLocation());
            assertThat(c.getCapacity()).isEqualTo(classroom.getCapacity());
        });
    }

    @Test
    void willReturnEmptyWhenSelectClassroomByName() {
        // Given

        String roomName = FAKER.name().name();
        // When
        var actual = underTest.selectClassroomByName(roomName);

        // Then
        assertThat(actual).isEmpty();
    }

    @Test
    void insertClassroom() {
        // Given
        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );

        // When
        underTest.insertClassroom(classroom);

        // Then
        List<Classroom> classrooms = underTest.selectAllClassrooms();
        assertThat(classrooms).extracting(Classroom::getRoomName).contains(classroom.getRoomName());
    }

    @Test
    void existClassroomByName() {
        // Given
        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        // When
        boolean actual = underTest.existClassroomByName(roomName);

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existClassroomByNameReturnsFalseWhenDoesNotExist() {
        // Given

        String name = "Non-existent Classroom";

        // When
        boolean actual = underTest.existClassroomByName(name);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void existClassroomById() {
        // Given

        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        Integer id = underTest.selectClassroomByName(roomName).get().getId();

        // When
        boolean actual = underTest.existClassroomById(id);

        // Then
        assertThat(actual).isTrue();
    }

    @Test
    void existClassroomByIdReturnsFalseWhenDoesNotExist() {
        // Given

        Integer id = 200000;

        // When
        boolean actual = underTest.existClassroomById(id);

        // Then
        assertThat(actual).isFalse();
    }

    @Test
    void deleteClassroomById(){
        // Given
        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectClassroomByName(roomName).get().getId();

        // When
        underTest.deleteClassroomById(id);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isNotPresent();
    }

    @Test
    void updateClassroom() {
        // Given

        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectAllClassrooms()
                .stream()
                .filter(c -> c.getRoomName().equals(roomName))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        String newRoomName = "Advanced Math 101";

        // When
        Classroom update = new Classroom();
        update.setId(id);
        update.setRoomName(newRoomName);
        underTest.updateClassroom(update);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getRoomName()).isEqualTo(newRoomName);
        });
    }

    @Test
    void willNotUpdateWhenNothingToUpdate() {
        // Given
        String roomName = FAKER.name().name();
        Classroom classroom = new Classroom(
                roomName,
                FAKER.address().longitude(),
                FAKER.number().randomDigit()
        );
        underTest.insertClassroom(classroom);

        int id = underTest.selectClassroomByName(roomName).get().getId();

        // When
        Classroom update = new Classroom();
        update.setId(id);
        underTest.updateClassroom(update);

        // Then
        Optional<Classroom> actual = underTest.selectClassroomById(id);
        assertThat(actual).isPresent().hasValueSatisfying(c -> {
            assertThat(c.getId()).isEqualTo(id);
            assertThat(c.getRoomName()).isEqualTo(classroom.getRoomName());
        });
    }
}*/
