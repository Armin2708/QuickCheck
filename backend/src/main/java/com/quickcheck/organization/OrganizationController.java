package com.quickcheck.organization;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public List<Organization> getOrganizations(){
        return organizationService.getAllOrganizations();
    }

    @GetMapping("/user/{userId}")
    public List<Organization> getOrganizationsOfUser(@PathVariable("userId") Integer userId){
        return organizationService.getOrganizationsOfUser(userId);
    }

    @GetMapping("/id/{organizationId}")
    public Organization getOrganizationById(@PathVariable("organizationId") Integer organizationId){
        return organizationService.getOrganizationById(organizationId);
    }

    @GetMapping("/name/{organizationName}")
    public Organization getOrganizationByName(@PathVariable("organizationName") String organizationName){
        return organizationService.getOrganizationByName(organizationName);
    }

    @PostMapping
    public ResponseEntity<?> registerOrganization(@RequestBody OrganizationRegistrationRequest registrationRequest) {
        organizationService.addOrganization(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join/{organizationId}/{userId}")
    public ResponseEntity<?> joinOrganization(
            @PathVariable("organizationId") Integer organizationId,
            @PathVariable("userId") Integer userId
    ) {
        organizationService.joinOrganization(organizationId,userId);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/leave/{organizationId}/{userId}")
    public ResponseEntity<?> leaveOrganization(
            @PathVariable("organizationId") Integer organizationId,
            @PathVariable("userId") Integer userId
    ) {
        organizationService.leaveOrganization(organizationId,userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{organizationId}")
    public void updateOrganization(
            @PathVariable("organizationId") Integer organizationId,
            @RequestBody OrganizationUpdateRequest updateRequest){
        organizationService.updateOrganization(organizationId,updateRequest);
    }

    @DeleteMapping("{organizationId}")
    public void deleteOrganization(
            @PathVariable("organizationId") Integer organizationId
    ){
        organizationService.deleteOrganization(organizationId);
    }

}