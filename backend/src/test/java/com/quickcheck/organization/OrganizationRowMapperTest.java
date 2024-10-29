package com.quickcheck.organization;/*
package com.quickcheck.classes;

import org.junit.jupiter.api.Test;
import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OrganizationRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        ClassRowMapper classRowMapper = new ClassRowMapper();

        ResultSet resultSet = mock(ResultSet.class);
        Array mockClassDaysArray = mock(Array.class);
        Array mockStudentsIdArray = mock(Array.class);
        Array mockAdminsIdArray = mock(Array.class);

        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("name")).thenReturn("Math 101");
        when(resultSet.getInt("professorId")).thenReturn(1001);
        when(resultSet.getString("location")).thenReturn("Room 305");
        when(resultSet.getString("startDate")).thenReturn("2023-09-01");
        when(resultSet.getString("endDate")).thenReturn("2023-12-15");

        // Mocking the SQL Array for classDays (assumed as String[] in the database)
        when(resultSet.getArray("classDays")).thenReturn(mockClassDaysArray);
        when(mockClassDaysArray.getArray()).thenReturn(new String[]{"Monday", "Wednesday", "Friday"});

        // Mocking the SQL Array for studentsId (assumed as Integer[] in the database)
        when(resultSet.getArray("studentsId")).thenReturn(mockStudentsIdArray);
        when(mockStudentsIdArray.getArray()).thenReturn(new Integer[]{201, 202, 203});

        // Mocking the SQL Array for adminsId (assumed as Integer[] in the database)
        when(resultSet.getArray("adminsId")).thenReturn(mockAdminsIdArray);
        when(mockAdminsIdArray.getArray()).thenReturn(new Integer[]{301, 302, 303});

        // When
        Class actualClass = classRowMapper.mapRow(resultSet, 1);

        // Then
        Class expectedClass = new Class(
                1,
                "Math 101",
                1001,
                "Room 305",
                "2023-09-01",
                "2023-12-15",
                Arrays.asList("Monday", "Wednesday", "Friday"),
                Arrays.asList(201, 202, 203),
                Arrays.asList(301, 302, 303)
        );

        assertThat(actualClass).isEqualTo(expectedClass);
    }
}
*/
