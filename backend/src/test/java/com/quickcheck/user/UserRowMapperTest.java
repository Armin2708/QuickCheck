package com.quickcheck.user;

import com.quickcheck.Gender;
import org.junit.jupiter.api.Test;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        UserRowMapper userRowMapper = new UserRowMapper();

        // Mocking ResultSet and SQL Array objects
        ResultSet resultSet = mock(ResultSet.class);
        Array mockClassesIdArray = mock(Array.class);
        Array mockRoleArray = mock(Array.class);

        // Setting up expected date of birth as java.sql.Date
        Date dateOfBirth = Date.valueOf("1985-06-05");

        // Configuring mock ResultSet
        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("name")).thenReturn("John Doe");
        when(resultSet.getString("address")).thenReturn("123 Main St");
        when(resultSet.getString("email")).thenReturn("john@example.com");
        when(resultSet.getString("password")).thenReturn("password");
        when(resultSet.getDate("date_of_birth")).thenReturn(dateOfBirth);
        when(resultSet.getString("gender")).thenReturn("MALE");

        // Mocking classesId and role arrays (currently unused in UserRowMapper)
        when(resultSet.getArray("classes_id")).thenReturn(mockClassesIdArray);
        when(mockClassesIdArray.getArray()).thenReturn(new Integer[]{1, 2, 3});
        when(resultSet.getArray("roles")).thenReturn(mockRoleArray);
        when(mockRoleArray.getArray()).thenReturn(new String[]{"USER"});

        // When
        User actualUser = userRowMapper.mapRow(resultSet, 1);

        // Then - Expected User object for comparison
        User expectedUser = new User(
                1,
                "John Doe",
                "123 Main St",
                "john@example.com",
                "password",
                dateOfBirth,
                Gender.MALE,
                null // Set roles to null for now as per UserRowMapper implementation
        );

        assertThat(actualUser).isEqualTo(expectedUser);
    }
}
