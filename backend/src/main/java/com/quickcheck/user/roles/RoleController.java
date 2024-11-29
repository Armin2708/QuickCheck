package com.quickcheck.user.roles;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {

        this.roleService = roleService;
    }

    /*@GetMapping("/organization/{organizationId}")
    public List<UserDTO> getOrganizationUserRoles(@PathVariable("organizationId") Integer organizationId){
        return userService.getAllUsersFromOrganization(organizationId);
    }*/

    @PostMapping("/user/{userId}")
    public void registerRole(
            @PathVariable("userId") Integer userId,
            @RequestBody UserRolesUpdateRequest registrationRequest){
        System.out.println(registrationRequest);
        roleService.addUserRole(userId,registrationRequest);
    }

    @DeleteMapping("{roleId}")
    public void deleteRole(
            @PathVariable("roleId") Integer roleId
    ){
        roleService.deleteUserRole(roleId);
    }

}
