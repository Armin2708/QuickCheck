/*
package com.quickcheck.organization;

import org.junit.jupiter.api.Test;

import java.sql.ResultSet;
import java.sql.SQLException;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OrganizationRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        OrganizationRowMapper organizationRowMapper = new OrganizationRowMapper();

        ResultSet resultSet = mock(ResultSet.class);

        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("name")).thenReturn("ORG1223");

        // When
        Organization actualOrganization = organizationRowMapper.mapRow(resultSet, 1);

        // Then
        Organization expectedOrganization = new Organization(
                1,
                "ORG1223"
        );

        assertThat(actualOrganization).isEqualTo(expectedOrganization);
    }
}

*/
