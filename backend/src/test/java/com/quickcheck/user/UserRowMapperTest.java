package com.quickcheck.user;

import com.quickcheck.Gender;
import org.junit.jupiter.api.Test;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        UserRowMapper userRowMapper = new UserRowMapper();

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
        User actualUser = userRowMapper.mapRow(resultSet, 1);

        // Then
        User expectedUser = new User();
        expectedUser.setId(1);
        expectedUser.setSchoolName("Test School");
        expectedUser.setName("John Doe");
        expectedUser.setAddress("123 Main St");
        expectedUser.setEmail("john@example.com");
        expectedUser.setPassword("password");
        expectedUser.setDateOfBirth("2000-01-01");
        expectedUser.setGender(Gender.MALE);
        expectedUser.setClassesId(Arrays.asList(101, 102, 103)); // List of integers for classesId

        assertThat(actualUser).isEqualTo(expectedUser);
    }
}
