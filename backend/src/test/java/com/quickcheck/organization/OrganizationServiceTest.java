package com.quickcheck.organization;

import com.github.javafaker.Faker;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.SQLException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrganizationServiceTest {

    @Mock
    private OrganizationDao organizationDao;

    @Mock
    private UserDao userDao;

    private OrganizationService underTest;

    @BeforeEach
    void setUp() {
        underTest = new OrganizationService(
                organizationDao,
                userDao
        );
    }


    @Test
    void getAllOrganizations() {
        // When
        underTest.getAllOrganizations();

        // Then
        verify(organizationDao).selectAllOrganizations();
    }

    @Test
    void canGetOrganizationById() {
        // Given
        int orgId = 1;
        Organization aOrganization = new Organization(
                "ORG1233"
        );
        when(organizationDao.selectOrganizationById(orgId)).thenReturn(Optional.of(aOrganization));

        // When
        Organization actual = underTest.getOrganizationById(orgId);

        // Then
        assertThat(actual).isEqualTo(aOrganization);
    }

    @Test
    void willThrowWhenOrganizationNotFoundById() {
        // Given
        int orgId = 1;
        when(organizationDao.selectOrganizationById(orgId)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getOrganizationById(orgId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Organization with id [%s] not found".formatted(orgId));
    }

    @Test
    void canGetOrganizationByName() {
        // Given
        Faker FAKER = new Faker();
        String orgName = FAKER.name().name();
        Organization aOrganization = new Organization(
                orgName
        );
        when(organizationDao.selectOrganizationByName(orgName)).thenReturn(Optional.of(aOrganization));

        // When
        Organization actual = underTest.getOrganizationByName(orgName);

        // Then
        assertThat(actual).isEqualTo(aOrganization);
    }

    @Test
    void willThrowWhenOrganizationNotFoundByName() {
        // Given
        Faker FAKER = new Faker();
        String orgName = FAKER.name().name();

        when(organizationDao.selectOrganizationByName(orgName)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> underTest.getOrganizationByName(orgName))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Organization with id [%s] not found".formatted(orgName));
    }

    @Test
    void addOrganization() {
        // Given
        Faker FAKER = new Faker();
        String orgName = FAKER.name().name();
        OrganizationRegistrationRequest request = new OrganizationRegistrationRequest(
                orgName
        );

        when(organizationDao.existOrganizationByName(request.name())).thenReturn(false);

        // When
        underTest.addOrganization(request);

        // Then
        ArgumentCaptor<Organization> organizationArgumentCaptor = ArgumentCaptor.forClass(Organization.class);
        verify(organizationDao).insertOrganization(organizationArgumentCaptor.capture());

        Organization capturedClass = organizationArgumentCaptor.getValue();
        assertThat(capturedClass.getName()).isEqualTo(request.name());
    }

    @Test
    void willThrowWhenOrganizationNameExists() {
        // Given
        Faker FAKER = new Faker();
        String orgName = FAKER.name().name();

        OrganizationRegistrationRequest request = new OrganizationRegistrationRequest(
                orgName
        );

        when(organizationDao.existOrganizationByName(orgName)).thenReturn(true);
        // When / Then
        assertThatThrownBy(() -> underTest.addOrganization(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessage("Organization name already exists");

        verify(organizationDao, never()).insertOrganization(any());
    }

    @Test
    void deleteOrganization() {
        // Given
        int orgId = 1000;
        when(organizationDao.existOrganizationById(orgId)).thenReturn(true);

        // When
        underTest.deleteOrganization(orgId);

        // Then
        verify(organizationDao).deleteOrganizationById(orgId);
    }

    @Test
    void willThrowWhenOrganizationDoesNotExistOnDelete() {
        // Given
        int orgId = 1000;
        when(organizationDao.existOrganizationById(orgId)).thenReturn(false);

        // When / Then
        assertThatThrownBy(() -> underTest.deleteOrganization(orgId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Organization with id [%s] not found".formatted(orgId));

        verify(organizationDao, never()).deleteOrganizationById(anyInt());
    }

    @Test
    void updateOrganization() {
        // Given
        Faker FAKER = new Faker();
        int orgId = 1000;
        String orgName = FAKER.name().name();
        Organization existingOrganization = new Organization(
                orgId, orgName
        );

        OrganizationUpdateRequest updateRequest = new OrganizationUpdateRequest(
                "newName"
        );

        when(organizationDao.selectOrganizationById(orgId)).thenReturn(Optional.of(existingOrganization));
        when(organizationDao.existOrganizationByName(updateRequest.name())).thenReturn(false);

        // When
        underTest.updateOrganization(orgId, updateRequest);

        // Then
        ArgumentCaptor<Organization> organizationArgumentCaptor = ArgumentCaptor.forClass(Organization.class);
        verify(organizationDao).updateOrganization(organizationArgumentCaptor.capture());

        Organization updatedOrganization = organizationArgumentCaptor.getValue();
        assertThat(updatedOrganization.getName()).isEqualTo(updateRequest.name());
    }

    @Test
    void willThrowWhenNoChangesOnUpdate() {
        // Given
        Faker FAKER = new Faker();
        int orgId = 1000;
        String orgName = FAKER.name().name();
        Organization existingOrganization = new Organization(
                orgId, orgName
        );

        OrganizationUpdateRequest updateRequest = new OrganizationUpdateRequest(
                orgName
        );

        when(organizationDao.selectOrganizationById(orgId)).thenReturn(Optional.of(existingOrganization));

        // When / Then
        assertThatThrownBy(() -> underTest.updateOrganization(orgId, updateRequest))
                .isInstanceOf(RequestValidationException.class)
                .hasMessage("No data changes found");

        verify(organizationDao, never()).updateOrganization(any());
    }

    @Test
    void getOrganizationsOfUser()  {
    }

    @Test
    void joinOrganization() {
    }

    @Test
    void leaveOrganization() {
    }
}
