package com.quickcheck.organization.joinCode;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/organization-join-code")
public class OrganizationJoinCodeController {

    private final OrganizationJoinCodeService organizationJoinCodeService;

    public OrganizationJoinCodeController(OrganizationJoinCodeService organizationJoinCodeService) {
        this.organizationJoinCodeService = organizationJoinCodeService;
    }

    @GetMapping("organization/{organizationId}")
    public List<OrganizationJoinCode> getAllOrganizationJoinCodeFromOrganization(
            @PathVariable("organizationId") Integer organizationId
    ){
        return organizationJoinCodeService.getAllJoinCodeFromOrganization(organizationId);
    }

    @GetMapping("{organizationJoinCodeId}")
    public OrganizationJoinCode getOrganizationJoinCode(
            @PathVariable("organizationJoinCodeId") Integer organizationJoinCodeId
    ){
        return organizationJoinCodeService.getOrganizationJoinCode(organizationJoinCodeId);
    }

    @GetMapping("verify/{code}")
    public OrganizationVerifyCodeResponse verifyJoinCode(
            @PathVariable("code") Integer code
    ){
        return organizationJoinCodeService.verifyJoinCode(code);
    }

    @PostMapping
    public Integer createOrganizationJoinCode(
            @RequestBody OrganizationJoinCodeRegistrationRequest request
    ){
        return organizationJoinCodeService.createOrganizationJoinCode(request);
    }

    @PostMapping("decrement/{code}")
    public void decrementOrganizationJoinCode(
            @PathVariable("code") Integer code
    ){
        organizationJoinCodeService.decrementCodeUsageLimit(code);
    }

    @PutMapping("{organizationJoinCodeId}")
    public void updateOrganizationJoinCode(
            @PathVariable("organizationJoinCodeId") Integer organizationJoinCodeId,
            @RequestBody OrganizationJoinCodeUpdateRequest updateRequest){
        organizationJoinCodeService.updateOrganizationJoinCode(organizationJoinCodeId,updateRequest);
    }

    @DeleteMapping("{organizationJoinCodeId}")
    public void deleteOrganizationJoinCode(
            @PathVariable("organizationJoinCodeId") Integer organizationJoinCodeId
    ){
        organizationJoinCodeService.deleteOrganizationJoinCode(organizationJoinCodeId);
    }

}
