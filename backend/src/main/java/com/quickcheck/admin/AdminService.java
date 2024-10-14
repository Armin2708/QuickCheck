package com.quickcheck.admin;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    private final AdminDao adminDao;

    public AdminService(AdminDao adminDao) {
        this.adminDao = adminDao;
    }

    public List<Admin> getAllAdmins() {
        return adminDao.selectAllAdmins();
    }

    public Admin getAdmin(Integer adminId) {
        return adminDao.selectAdminById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Admin with id [%s] not found".formatted(adminId)
                ));
    }

    public void addAdmin(AdminRegistrationRequest request) {
        String email = request.email();
        if (adminDao.existAdminWithEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }
        Admin admin = new Admin(
                request.schoolName(),
                request.name(),
                request.address(),
                request.email(),
                request.password(),
                request.dateOfBirth(),
                request.gender(),
                request.classesId()
        );
        adminDao.insertAdmin(admin);
    }

    public void updateAdmin(Integer adminId, AdminUpdateRequest adminUpdateRequest) {
        Admin admin = adminDao.selectAdminById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Admin with id [%s] not found".formatted(adminId)
                ));
        boolean changes = false;

        if (adminUpdateRequest.schoolName() != null && !adminUpdateRequest.schoolName().equals(admin.getSchoolName())) {
            admin.setSchoolName(adminUpdateRequest.schoolName());
            changes = true;
        }

        if (adminUpdateRequest.name() != null && !adminUpdateRequest.name().equals(admin.getName())) {
            admin.setName(adminUpdateRequest.name());
            changes = true;
        }

        if (adminUpdateRequest.address() != null && !adminUpdateRequest.address().equals(admin.getAddress())) {
            admin.setAddress(adminUpdateRequest.address());
            changes = true;
        }

        if (adminUpdateRequest.email() != null && !adminUpdateRequest.email().equals(admin.getEmail())) {
            if (adminDao.existAdminWithEmail(adminUpdateRequest.email())) {
                throw new DuplicateResourceException("Email already taken");
            }
            admin.setEmail(adminUpdateRequest.email());
            changes = true;
        }

        if (adminUpdateRequest.password() != null && !adminUpdateRequest.password().equals(admin.getPassword())) {
            admin.setPassword(adminUpdateRequest.password());
            changes = true;
        }

        if (adminUpdateRequest.dateOfBirth() != null && !adminUpdateRequest.dateOfBirth().equals(admin.getDateOfBirth())) {
            admin.setDateOfBirth(adminUpdateRequest.dateOfBirth());
            changes = true;
        }

        if (adminUpdateRequest.gender() != null && !adminUpdateRequest.gender().equals(admin.getGender())) {
            admin.setGender(adminUpdateRequest.gender());
            changes = true;
        }

        if (adminUpdateRequest.classesId() != null && !adminUpdateRequest.classesId().equals(admin.getClassesId())) {
            admin.setClassesId(adminUpdateRequest.classesId());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        adminDao.updateAdmin(admin);
    }

    public void deleteAdmin(Integer adminId) {
        if (!adminDao.existAdminById(adminId)){
            throw new ResourceNotFoundException("Admin with id [%s] not found".formatted(adminId));
        }
        adminDao.deleteAdminById(adminId);
    }
}