/*
package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.quickcheck.classroom.Classroom;
import com.quickcheck.classroom.ClassroomRegistrationRequest;
import com.quickcheck.classroom.ClassroomUpdateRequest;
import com.quickcheck.Gender;
import com.quickcheck.user.User;
import com.quickcheck.user.UserRegistrationRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.InstanceOfAssertFactories.LOCAL_DATE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class ClassroomIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    private static final String CLASSROOM_URI = "/api/classrooms";
    private static final String USER_URI = "/api/users";


    private String insertUser(){
        Faker faker = new Faker();
        String userEmail = faker.internet().emailAddress();
        LocalDate dob = Date.valueOf("2000-01-01").toLocalDate();
        UserRegistrationRequest userRequest = new UserRegistrationRequest(
                faker.name().fullName(),
                faker.address().fullAddress(),
                userEmail,
                "password",
                dob,
                Gender.MALE
        );

        // Send a POST request to register the user
        String jwtToken = webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRequest), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        return jwtToken;
    }

    private String insertClassroom(String roomName,String location,Integer capacity,String jwtToken){

        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                roomName, location, capacity
        );
        // Send a POST request to register the classroom
        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassroomRegistrationRequest.class)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        return roomName;
    }

    // Add: Admin permission required, cannot create classroom
    @Test
    void canRegisterClassroom() {
        // Step 1: Insert an User
        String jwtToken = insertUser();

        // Step 2: Create Classroom
        Faker FAKER = new Faker();
        String roomName = FAKER.book().title();
        String location = FAKER.address().fullAddress();
        Integer capacity = FAKER.number().randomDigit();
        insertClassroom(roomName, location, capacity, jwtToken);

        // Get all classrooms
        List<Classroom> allClassrooms = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Classroom>() {})
                .returnResult()
                .getResponseBody();

        // Make sure that classroom is present
        int id = allClassrooms.stream()
                .filter(classroom -> classroom.getRoomName().equals(roomName))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        Classroom expectedClassroom = new Classroom(
                roomName, location, capacity
        );

        assertThat(allClassrooms).contains(expectedClassroom);

        // Get classroom by id
        webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Classroom.class)
                .isEqualTo(expectedClassroom);
    }

    @Test
    void canDeleteClassroom() {
        // Step 1: Insert an User
        Faker faker = new Faker();
        String userEmail = faker.internet().emailAddress();
        LocalDate dob = Date.valueOf("2000-01-01").toLocalDate();
        UserRegistrationRequest userRequest = new UserRegistrationRequest(
                faker.name().fullName(),
                faker.address().fullAddress(),
                userEmail,
                "password",
                dob,
                Gender.MALE
        );

        String jwtToken = webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRequest), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        List<User> allUsers = webTestClient.get()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<User>() {})
                .returnResult()
                .getResponseBody();

        int professorId = allUsers.stream()
                .filter(user -> user.getEmail().equals(userEmail))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // Step 2: Create Classroom
        String name = faker.book().title();
        String location = faker.address().fullAddress();
        String startDate = "2023-09-01";
        String endDate = "2023-12-15";
        List<String> classDays = List.of("Monday", "Wednesday", "Friday");
        List<Integer> studentsId = List.of(101, 102, 103);
        List<Integer> usersId = List.of(201, 202, 203);

        ClassRegistrationRequest request = new ClassRegistrationRequest(
                name, professorId, location, startDate, endDate, classDays, studentsId, usersId
        );

        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassRegistrationRequest.class)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // Get all classrooms
        List<Class> allClasses = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Class>() {})
                .returnResult()
                .getResponseBody();

        int id = allClasses.stream()
                .filter(classroom -> classroom.getName().equals(name))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        // Delete classroom
        webTestClient.delete()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // Try to get the classroom by id (should return 404)
        webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void canUpdateClassroom() {
        // Step 1: Insert an User
        Faker faker = new Faker();
        String userEmail = faker.internet().emailAddress();
        List<String> roles = List.of("ADMIN");
        UserRegistrationRequest userRequest = new UserRegistrationRequest(
                "Test School",
                faker.name().fullName(),
                faker.address().fullAddress(),
                userEmail,
                "password",
                "2000-01-01",
                Gender.MALE,
                roles
        );

        String jwtToken = webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRequest), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        List<User> allUsers = webTestClient.get()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<User>() {})
                .returnResult()
                .getResponseBody();

        int professorId = allUsers.stream()
                .filter(user -> user.getEmail().equals(userEmail))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // Step 2: Create Classroom
        String name = faker.book().title();
        String location = faker.address().fullAddress();
        String startDate = "2023-09-01";
        String endDate = "2023-12-15";
        List<String> classDays = List.of("Monday", "Wednesday", "Friday");
        List<Integer> studentsId = List.of(101, 102, 103);
        List<Integer> usersId = List.of(201, 202, 203);

        ClassRegistrationRequest request = new ClassRegistrationRequest(
                name, professorId, location, startDate, endDate, classDays, studentsId, usersId
        );

        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassRegistrationRequest.class)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // Get all classrooms
        List<Class> allClasses = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Class>() {})
                .returnResult()
                .getResponseBody();

        int id = allClasses.stream()
                .filter(classroom -> classroom.getName().equals(name))
                .map(Class::getId)
                .findFirst()
                .orElseThrow();

        // Update classroom
        String newName = faker.book().title();
        ClassUpdateRequest updateRequest = new ClassUpdateRequest(
                newName, professorId, "Room 405", "2023-10-01", "2023-12-20",
                List.of("Tuesday", "Thursday"), List.of(104, 105), List.of(204, 205)
        );

        webTestClient.put()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(updateRequest), ClassUpdateRequest.class)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // Get updated classroom by id
        Class updatedClass = webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Class.class)
                .returnResult()
                .getResponseBody();

        Class expected = new Class(
                id, newName, professorId, "Room 405", "2023-10-01", "2023-12-20",
                List.of("Tuesday", "Thursday"), List.of(104, 105), List.of(204, 205)
        );

        assertThat(updatedClass).isEqualTo(expected);
    }
}

*/
