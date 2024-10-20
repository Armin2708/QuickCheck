package com.quickcheck.classroom;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClassroomServiceTest {

    @Mock
    private ClassroomDao classroomDao;

    private ClassroomService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ClassroomService(classroomDao);
    }

    @Test
    void getAllClassrooms() {
        // When
        underTest.getAllClassrooms();

        // Then
        verify(classroomDao).selectAllClassrooms();
    }

    @Test
    void canGetClassroom() {
        // Given
        int classroomId = 1;
        Classroom classroom = new Classroom(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.of(classroom));

        // When
        Classroom actual = underTest.getClassroom(classroomId);

        // Then
        assertThat(actual).isEqualTo(classroom);
    }

    @Test
    void willThrowWhenClassroomNotFound() {
        // Given
        int classroomId = 1;
        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getClassroom(classroomId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(classroomId));
    }

    @Test
    void addClassroom() {
        // Given
        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classroomDao.existClassroomByName(request.name())).thenReturn(false);

        // When
        underTest.addClassroom(request);

        // Then
        ArgumentCaptor<Classroom> classroomArgumentCaptor = ArgumentCaptor.forClass(Classroom.class);
        verify(classroomDao).insertClassroom(classroomArgumentCaptor.capture());

        Classroom capturedClassroom = classroomArgumentCaptor.getValue();
        assertThat(capturedClassroom.getName()).isEqualTo(request.name());
        assertThat(capturedClassroom.getLocation()).isEqualTo(request.location());
        assertThat(capturedClassroom.getProfessorId()).isEqualTo(request.professorId());
    }

    @Test
    void willThrowWhenClassroomNameExists() {
        // Given
        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classroomDao.existClassroomByName(request.name())).thenReturn(true);

        // When / Then
        assertThatThrownBy(() -> underTest.addClassroom(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Class name already exists");

        verify(classroomDao, never()).insertClassroom(any());
    }

    @Test
    void deleteClassroom() {
        // Given
        int classroomId = 1;
        when(classroomDao.existClassroomById(classroomId)).thenReturn(true);

        // When
        underTest.deleteClassroom(classroomId);

        // Then
        verify(classroomDao).deleteClassroomById(classroomId);
    }

    @Test
    void willThrowWhenClassroomDoesNotExistOnDelete() {
        // Given
        int classroomId = 1;
        when(classroomDao.existClassroomById(classroomId)).thenReturn(false);

        // When / Then
        assertThatThrownBy(() -> underTest.deleteClassroom(classroomId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(classroomId));

        verify(classroomDao, never()).deleteClassroomById(anyInt());
    }

    @Test
    void updateClassroom() {
        // Given
        int classroomId = 1;
        Classroom existingClassroom = new Classroom(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        ClassroomUpdateRequest updateRequest = new ClassroomUpdateRequest(
                "Advanced Math", 2, "Room 405", "2023-10-01", "2023-12-20",
                Arrays.asList("Tuesday", "Thursday"), Arrays.asList(104, 105), Arrays.asList(204, 205)
        );

        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClassroom));
        when(classroomDao.existClassroomByName(updateRequest.name())).thenReturn(false);

        // When
        underTest.updateClassroom(classroomId, updateRequest);

        // Then
        ArgumentCaptor<Classroom> classroomArgumentCaptor = ArgumentCaptor.forClass(Classroom.class);
        verify(classroomDao).updateClassroom(classroomArgumentCaptor.capture());

        Classroom updatedClassroom = classroomArgumentCaptor.getValue();
        assertThat(updatedClassroom.getName()).isEqualTo(updateRequest.name());
        assertThat(updatedClassroom.getLocation()).isEqualTo(updateRequest.location());
        assertThat(updatedClassroom.getProfessorId()).isEqualTo(updateRequest.professorId());
    }

    @Test
    void willThrowWhenNoChangesOnUpdate() {
        // Given
        int classroomId = 1;
        Classroom existingClassroom = new Classroom(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        ClassroomUpdateRequest updateRequest = new ClassroomUpdateRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClassroom));

        // When / Then
        assertThatThrownBy(() -> underTest.updateClassroom(classroomId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        verify(classroomDao, never()).updateClassroom(any());
    }
}
