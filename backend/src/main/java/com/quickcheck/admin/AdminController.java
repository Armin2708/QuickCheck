package com.quickcheck.admin;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAllAdmins(){
        return adminService.getAllAdmins();
    }

    @GetMapping("{id}")
    public Admin getAdmin(@PathVariable("id") Integer id){
        return adminService.getAdmin(id);
    }

    @PostMapping
    public void addAdmin(@RequestBody AdminRegistrationRequest request) {
        adminService.addAdmin(request);
    }

    // Assuming AdminUpdateRequest is a similar record with AdminRegistrationRequest for updating the admin
    @PutMapping("{id}")
    public void updateAdmin(@PathVariable("id") Integer id, @RequestBody AdminUpdateRequest adminUpdateRequest) {
        adminService.updateAdmin(id, adminUpdateRequest);
    }

    @DeleteMapping("{id}")
    public void deleteAdmin(@PathVariable("id") Integer id){
        adminService.deleteAdmin(id);
    }
}