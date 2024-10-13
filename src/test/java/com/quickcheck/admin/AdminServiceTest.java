package com.quickcheck.admin;

import com.quickcheck.Gender;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private AdminDao adminDao;

    private AdminService underTest;

    @BeforeEach
    void setUp() {
        underTest = new AdminService(adminDao);
    }

    @Test
    void getAllAdmins() {
        // When
        underTest.getAllAdmins();

        // Then
        verify(adminDao).selectAllAdmins();
    }

    @Test
    void canGetAdmin() {
        // Given
        int adminId = 10;
        Admin admin = new Admin(
                10, "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );
        when(adminDao.selectAdminById(adminId)).thenReturn(Optional.of(admin));

        // When
        Admin actual = underTest.getAdmin(adminId);

        // Then
        assertThat(actual).isEqualTo(admin);
    }

    @Test
    void willThrowWhenGetAdminReturnEmptyOptional() {
        // Given
        int adminId = 10;

        when(adminDao.selectAdminById(adminId)).thenReturn(Optional.empty());

        // When
        // Then
        assertThatThrownBy(() -> underTest.getAdmin(adminId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Admin with id [%s] not found".formatted(adminId));
    }

    @Test
    void addAdmin() throws SQLException {
        // Given
        AdminRegistrationRequest request = new AdminRegistrationRequest(
                "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );

        when(adminDao.existAdminWithEmail(request.email())).thenReturn(false);

        // When
        underTest.addAdmin(request);

        // Then
        ArgumentCaptor<Admin> adminArgumentCaptor = ArgumentCaptor.forClass(Admin.class);
        verify(adminDao).insertAdmin(adminArgumentCaptor.capture());

        Admin capturedAdmin = adminArgumentCaptor.getValue();

        assertThat(capturedAdmin.getEmail()).isEqualTo(request.email());
        assertThat(capturedAdmin.getName()).isEqualTo(request.name());
        assertThat(capturedAdmin.getPassword()).isEqualTo(request.password());
    }

    @Test
    void willThrowWhenEmailExistsWhileAddingAdmin() throws SQLException {
        // Given
        AdminRegistrationRequest request = new AdminRegistrationRequest(
                "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );

        when(adminDao.existAdminWithEmail(request.email())).thenReturn(true);

        // When
        assertThatThrownBy(() -> underTest.addAdmin(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Email already exists");

        // Then
        verify(adminDao, never()).insertAdmin(any());
    }

    @Test
    void deleteAdminById() {
        // Given
        int adminId = 10;

        when(adminDao.existAdminById(adminId)).thenReturn(true);

        // When
        underTest.deleteAdmin(adminId);

        // Then
        verify(adminDao).deleteAdminById(adminId);
    }

    @Test
    void willThrowWhenAdminDoesNotExistOnDelete() {
        // Given
        int adminId = 10;

        when(adminDao.existAdminById(adminId)).thenReturn(false);

        // When
        assertThatThrownBy(() -> underTest.deleteAdmin(adminId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Admin with id [%s] not found".formatted(adminId));

        // Then
        verify(adminDao, never()).deleteAdminById(anyInt());
    }

    @Test
    void updateAdmin() {
        // Given
        int adminId = 10;
        Admin existingAdmin = new Admin(
                10, "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );

        AdminUpdateRequest updateRequest = new AdminUpdateRequest(
                "New School", "Johnny", "New Address", "johnny@example.com", "newpassword", "2000-05-05", Gender.MALE, Arrays.asList(4, 5)
        );

        when(adminDao.selectAdminById(adminId)).thenReturn(Optional.of(existingAdmin));
        when(adminDao.existAdminWithEmail(updateRequest.email())).thenReturn(false);

        // When
        underTest.updateAdmin(adminId, updateRequest);

        // Then
        ArgumentCaptor<Admin> adminArgumentCaptor = ArgumentCaptor.forClass(Admin.class);
        verify(adminDao).updateAdmin(adminArgumentCaptor.capture());

        Admin capturedAdmin = adminArgumentCaptor.getValue();
        assertThat(capturedAdmin.getEmail()).isEqualTo(updateRequest.email());
        assertThat(capturedAdmin.getName()).isEqualTo(updateRequest.name());
        assertThat(capturedAdmin.getSchoolName()).isEqualTo(updateRequest.schoolName());
    }

    @Test
    void willThrowWhenNoChangesFoundOnUpdate() {
        // Given
        int adminId = 10;
        Admin existingAdmin = new Admin(
                10, "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );

        AdminUpdateRequest updateRequest = new AdminUpdateRequest(
                existingAdmin.getSchoolName(), existingAdmin.getName(), existingAdmin.getAddress(), existingAdmin.getEmail(),
                existingAdmin.getPassword(), existingAdmin.getDateOfBirth(), existingAdmin.getGender(), existingAdmin.getClassesId()
        );

        when(adminDao.selectAdminById(adminId)).thenReturn(Optional.of(existingAdmin));

        // When
        assertThatThrownBy(() -> underTest.updateAdmin(adminId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        // Then
        verify(adminDao, never()).updateAdmin(any());
    }

    @Test
    void willThrowWhenEmailAlreadyExistsOnUpdate() {
        // Given
        int adminId = 10;
        Admin existingAdmin = new Admin(
                10, "Test School", "John Doe", "123 Main St", "john@example.com", "password", "2000-01-01", Gender.MALE, Arrays.asList(1, 2, 3)
        );

        AdminUpdateRequest updateRequest = new AdminUpdateRequest(
                "Test School", "Johnny", "New Address", "existingemail@example.com", "newpassword", "2000-05-05", Gender.MALE, Arrays.asList(4, 5)
        );

        when(adminDao.selectAdminById(adminId)).thenReturn(Optional.of(existingAdmin));
        when(adminDao.existAdminWithEmail(updateRequest.email())).thenReturn(true);

        // When
        assertThatThrownBy(() -> underTest.updateAdmin(adminId, updateRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Email already taken");

        // Then
        verify(adminDao, never()).updateAdmin(any());
    }
}
