package com.quickcheck.admin;

import java.util.List;
import java.util.Optional;

public interface AdminDao {
    List<Admin> selectAllAdmins();
    Optional<Admin> selectAdminById(Integer id);
    void insertAdmin(Admin admin);
    boolean existAdminWithEmail(String email);
    void deleteAdminById(Integer id);
    boolean existAdminById(Integer id);
    void updateAdmin(Admin admin);
}