package com.quickcheck.admin;

import com.quickcheck.Gender;
import com.quickcheck.admin.Admin;
import com.quickcheck.admin.AdminRowMapper;
import org.junit.jupiter.api.Test;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AdminRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        AdminRowMapper adminRowMapper = new AdminRowMapper();

        ResultSet resultSet = mock(ResultSet.class);
        Array mockSqlArray = mock(Array.class);

        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("schoolname")).thenReturn("Test School");
        when(resultSet.getString("name")).thenReturn("John Doe");
        when(resultSet.getString("address")).thenReturn("123 Main St");
        when(resultSet.getString("email")).thenReturn("john@example.com");
        when(resultSet.getString("password")).thenReturn("password");
        when(resultSet.getString("dateofbirth")).thenReturn("2000-01-01");
        when(resultSet.getString("gender")).thenReturn("MALE");

        // Mocking the SQL Array for classesId (assumed as Integer[] in the database)
        when(resultSet.getArray("classesid")).thenReturn(mockSqlArray);
        when(mockSqlArray.getArray()).thenReturn(new Integer[]{101, 102, 103});

        // When
        Admin actualAdmin = adminRowMapper.mapRow(resultSet, 1);

        // Then
        Admin expectedAdmin = new Admin();
        expectedAdmin.setId(1);
        expectedAdmin.setSchoolName("Test School");
        expectedAdmin.setName("John Doe");
        expectedAdmin.setAddress("123 Main St");
        expectedAdmin.setEmail("john@example.com");
        expectedAdmin.setPassword("password");
        expectedAdmin.setDateOfBirth("2000-01-01");
        expectedAdmin.setGender(Gender.MALE);
        expectedAdmin.setClassesId(Arrays.asList(101, 102, 103)); // List of integers for classesId

        assertThat(actualAdmin).isEqualTo(expectedAdmin);
    }
}
