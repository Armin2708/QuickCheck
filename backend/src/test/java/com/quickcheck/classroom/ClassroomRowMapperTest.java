/*
package com.quickcheck.classroom;

import org.junit.jupiter.api.Test;
import java.sql.ResultSet;
import java.sql.SQLException;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ClassroomRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        ClassroomRowMapper classroomRowMapper = new ClassroomRowMapper();

        ResultSet resultSet = mock(ResultSet.class);

        when(resultSet.getInt("id")).thenReturn(1);
        when(resultSet.getString("room_name")).thenReturn("Classroom 233");
        when(resultSet.getString("location")).thenReturn("CSULA");
        when(resultSet.getInt("capacity")).thenReturn(999);

        // When
        Classroom actualClassroom = classroomRowMapper.mapRow(resultSet, 1);

        // Then
        Classroom expectedClassroom = new Classroom(
                1,
                "Classroom 233",
                "CSULA",
                999
        );

        assertThat(actualClassroom).isEqualTo(expectedClassroom);
    }
}
*/
