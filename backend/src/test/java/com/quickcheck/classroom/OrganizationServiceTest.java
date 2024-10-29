/*
package com.quickcheck.classes;

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
class OrganizationServiceTest {

    @Mock
    private ClassDao classDao;

    private ClassService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ClassService(classDao);
    }

    @Test
    void getAllClassrooms() {
        // When
        underTest.getAllClassrooms();

        // Then
        verify(classDao).selectAllClassrooms();
    }

    @Test
    void canGetClassroom() {
        // Given
        int classroomId = 1;
        Class aClass = new Class(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        when(classDao.selectClassroomById(classroomId)).thenReturn(Optional.of(aClass));

        // When
        Class actual = underTest.getClassroom(classroomId);

        // Then
        assertThat(actual).isEqualTo(aClass);
    }

    @Test
    void willThrowWhenClassroomNotFound() {
        // Given
        int classroomId = 1;
        when(classDao.selectClassroomById(classroomId)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getClassroom(classroomId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(classroomId));
    }

    @Test
    void addClassroom() {
        // Given
        ClassRegistrationRequest request = new ClassRegistrationRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classDao.existClassroomByName(request.name())).thenReturn(false);

        // When
        underTest.addClassroom(request);

        // Then
        ArgumentCaptor<Class> classroomArgumentCaptor = ArgumentCaptor.forClass(Class.class);
        verify(classDao).insertClassroom(classroomArgumentCaptor.capture());

        Class capturedClass = classroomArgumentCaptor.getValue();
        assertThat(capturedClass.getName()).isEqualTo(request.name());
        assertThat(capturedClass.getLocation()).isEqualTo(request.location());
        assertThat(capturedClass.getProfessorId()).isEqualTo(request.professorId());
    }

    @Test
    void willThrowWhenClassroomNameExists() {
        // Given
        ClassRegistrationRequest request = new ClassRegistrationRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classDao.existClassroomByName(request.name())).thenReturn(true);

        // When / Then
        assertThatThrownBy(() -> underTest.addClassroom(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Class name already exists");

        verify(classDao, never()).insertClassroom(any());
    }

    @Test
    void deleteClassroom() {
        // Given
        int classroomId = 1;
        when(classDao.existClassroomById(classroomId)).thenReturn(true);

        // When
        underTest.deleteClassroom(classroomId);

        // Then
        verify(classDao).deleteClassroomById(classroomId);
    }

    @Test
    void willThrowWhenClassroomDoesNotExistOnDelete() {
        // Given
        int classroomId = 1;
        when(classDao.existClassroomById(classroomId)).thenReturn(false);

        // When / Then
        assertThatThrownBy(() -> underTest.deleteClassroom(classroomId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Classroom with id [%s] not found".formatted(classroomId));

        verify(classDao, never()).deleteClassroomById(anyInt());
    }

    @Test
    void updateClassroom() {
        // Given
        int classroomId = 1;
        Class existingClass = new Class(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        ClassUpdateRequest updateRequest = new ClassUpdateRequest(
                "Advanced Math", 2, "Room 405", "2023-10-01", "2023-12-20",
                Arrays.asList("Tuesday", "Thursday"), Arrays.asList(104, 105), Arrays.asList(204, 205)
        );

        when(classDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClass));
        when(classDao.existClassroomByName(updateRequest.name())).thenReturn(false);

        // When
        underTest.updateClassroom(classroomId, updateRequest);

        // Then
        ArgumentCaptor<Class> classroomArgumentCaptor = ArgumentCaptor.forClass(Class.class);
        verify(classDao).updateClassroom(classroomArgumentCaptor.capture());

        Class updatedClass = classroomArgumentCaptor.getValue();
        assertThat(updatedClass.getName()).isEqualTo(updateRequest.name());
        assertThat(updatedClass.getLocation()).isEqualTo(updateRequest.location());
        assertThat(updatedClass.getProfessorId()).isEqualTo(updateRequest.professorId());
    }

    @Test
    void willThrowWhenNoChangesOnUpdate() {
        // Given
        int classroomId = 1;
        Class existingClass = new Class(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );
        ClassUpdateRequest updateRequest = new ClassUpdateRequest(
                "Math 101", 1, "Room 305", "2023-09-01", "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(101, 102, 103), Arrays.asList(201, 202, 203)
        );

        when(classDao.selectClassroomById(classroomId)).thenReturn(Optional.of(existingClass));

        // When / Then
        assertThatThrownBy(() -> underTest.updateClassroom(classroomId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        verify(classDao, never()).updateClassroom(any());
    }
}
*/
