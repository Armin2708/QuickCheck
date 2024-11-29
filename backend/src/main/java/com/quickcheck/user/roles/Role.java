package com.quickcheck.user.roles;

public class Role {

    private Integer id;
    private Integer userId;
    private RolesTitle role;
    private String organizationName;

    public Role(Integer userId, RolesTitle role, String organizationName) {
        this.userId = userId;
        this.role = role;
        this.organizationName = organizationName;
    }

    public Role(Integer id, Integer userId, RolesTitle role, String organizationName) {
        this.id = id;
        this.userId = userId;
        this.role = role;
        this.organizationName = organizationName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public RolesTitle getRole() {
        return role;
    }

    public void setRole(RolesTitle role) {
        this.role = role;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }
}
