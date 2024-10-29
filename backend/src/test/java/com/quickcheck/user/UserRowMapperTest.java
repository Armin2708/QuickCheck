package com.quickcheck.user;

import com.quickcheck.Gender;
import org.junit.jupiter.api.Test;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.time.LocalDate;

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

        // Set up a valid date to avoid null issues
        Date dateOfBirth = Date.valueOf(LocalDate.of(2000, 1, 1));

        // Configuring mock ResultSet
        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("name")).thenReturn("John Doe");
        when(resultSet.getString("address")).thenReturn("123 Main St");
        when(resultSet.getString("email")).thenReturn("john@example.com");
        when(resultSet.getString("password")).thenReturn("password");
        when(resultSet.getDate("date_of_birth")).thenReturn(dateOfBirth); // Mock a valid date
        when(resultSet.getString("gender")).thenReturn("MALE");
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
                dateOfBirth.toLocalDate(),  // Ensure it matches the mocked date
                Gender.MALE,
                null // Set roles to null as per UserRowMapper implementation
        );

        assertThat(actualUser).isEqualTo(expectedUser);
    }
}
