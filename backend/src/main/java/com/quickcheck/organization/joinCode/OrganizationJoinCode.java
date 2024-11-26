package com.quickcheck.organization.joinCode;

import java.util.Objects;

public class OrganizationJoinCode {

    private Integer id;
    private Integer code;
    private Integer organizationId;
    private Integer usageLimit;
    private Integer creatorId;

    public OrganizationJoinCode(Integer code, Integer organizationId, Integer usageLimit, Integer creatorId) {
        this.code = code;
        this.organizationId = organizationId;
        this.usageLimit = usageLimit;
        this.creatorId = creatorId;
    }

    public OrganizationJoinCode(Integer id, Integer code, Integer organizationId, Integer usageLimit, Integer creatorId) {
        this.id = id;
        this.code = code;
        this.organizationId = organizationId;
        this.usageLimit = usageLimit;
        this.creatorId = creatorId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    public Integer getUsageLimit() {
        return usageLimit;
    }

    public void setUsageLimit(Integer usageLimit) {
        this.usageLimit = usageLimit;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrganizationJoinCode that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(code, that.code) && Objects.equals(organizationId, that.organizationId) && Objects.equals(usageLimit, that.usageLimit) && Objects.equals(creatorId, that.creatorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, organizationId, usageLimit, creatorId);
    }

    @Override
    public String toString() {
        return "OrganizationJoinCode{" +
                "id=" + id +
                ", code=" + code +
                ", organizationId=" + organizationId +
                ", usageLimit=" + usageLimit +
                ", creatorId=" + creatorId +
                '}';
    }
}
