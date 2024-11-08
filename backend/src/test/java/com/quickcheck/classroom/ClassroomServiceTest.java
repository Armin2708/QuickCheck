/*
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
    void canGetClassroomById() {
        // Given
        int id = 1;
        Classroom classroom = new Classroom(
                id, "Classroom 233", "CSULA", 999
        );
        when(classroomDao.selectClassroomById(id)).thenReturn(Optional.of(classroom));

        // When
        Classroom actual = underTest.getClassroomById(id);

        // Then
        assertThat(actual).isEqualTo(classroom);
    }

    @Test
    void willThrowWhenClassroomNotFoundById() {
        // Given
        int classroomId = 1;
        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getClassroomById(classroomId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(classroomId));
    }

    @Test
    void canGetClassroomByName() {
        // Given
        String name = "Classroom 1";
        Classroom classroom = new Classroom(
                name, "CSULA", 999
        );
        when(classroomDao.selectClassroomByName(name)).thenReturn(Optional.of(classroom));

        // When
        Classroom actual = underTest.getClassroomByName(name);

        // Then
        assertThat(actual).isEqualTo(classroom);
    }

    @Test
    void willThrowWhenClassroomNotFoundByName() {
        // Given
        String name = "Classroom 1";
        when(classroomDao.selectClassroomByName(name)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getClassroomByName(name))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(name));
    }

    @Test
    void addClassroom() {
        // Given
        String name = "Classroom123";
        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                name, "CSULA", 999
        );

        when(classroomDao.existClassroomByName(request.roomName())).thenReturn(false);

        // When
        underTest.addClassroom(request);

        // Then
        ArgumentCaptor<Classroom> classroomArgumentCaptor = ArgumentCaptor.forClass(Classroom.class);
        verify(classroomDao).insertClassroom(classroomArgumentCaptor.capture());

        Classroom capturedClass = classroomArgumentCaptor.getValue();
        assertThat(capturedClass.getRoomName()).isEqualTo(request.roomName());
        assertThat(capturedClass.getLocation()).isEqualTo(request.location());
        assertThat(capturedClass.getCapacity()).isEqualTo(request.capacity());
    }

    @Test
    void willThrowWhenClassroomNameExists() {
        // Given
        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                 "Classroom 233", "CSULA", 999
        );

        when(classroomDao.existClassroomByName(request.roomName())).thenReturn(true);

        // When / Then
        assertThatThrownBy(() -> underTest.addClassroom(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Classroom with name [%s] already exists".formatted(request.roomName()));

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
        Classroom existingClass = new Classroom(
                classroomId, "Classroom 233", "CSULA", 999
        );

        ClassroomUpdateRequest updateRequest = new ClassroomUpdateRequest(
                "Room 45","Room 405",10
        );

        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClass));
        when(classroomDao.existClassroomByName(updateRequest.roomName())).thenReturn(false);

        // When
        underTest.updateClassroom(classroomId, updateRequest);

        // Then
        ArgumentCaptor<Classroom> classroomArgumentCaptor = ArgumentCaptor.forClass(Classroom.class);
        verify(classroomDao).updateClassroom(classroomArgumentCaptor.capture());

        Classroom updatedClassroom = classroomArgumentCaptor.getValue();
        assertThat(updatedClassroom.getRoomName()).isEqualTo(updateRequest.roomName());
        assertThat(updatedClassroom.getLocation()).isEqualTo(updateRequest.location());
        assertThat(updatedClassroom.getCapacity()).isEqualTo(updateRequest.capacity());
    }

    @Test
    void willThrowWhenNoChangesOnUpdate() {
        // Given
        int classroomId = 1;
        Classroom existingClassroom = new Classroom(
                "Classroom 0987", "CSULA", 999
        );
        ClassroomUpdateRequest updateRequest = new ClassroomUpdateRequest(
                "Classroom 0987", "CSULA", 999
        );

        when(classroomDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClassroom));

        // When / Then
        assertThatThrownBy(() -> underTest.updateClassroom(classroomId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        verify(classroomDao, never()).updateClassroom(any());
    }
}

*/
