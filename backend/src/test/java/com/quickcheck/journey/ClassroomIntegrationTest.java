package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.quickcheck.admin.Admin;
import com.quickcheck.admin.AdminRegistrationRequest;
import com.quickcheck.classroom.Classroom;
import com.quickcheck.classroom.ClassroomRegistrationRequest;
import com.quickcheck.classroom.ClassroomUpdateRequest;
import com.quickcheck.Gender;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class ClassroomIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    private static final String CLASSROOM_URI = "/api/classrooms";
    private static final String ADMIN_URI = "/api/admins";

    @Test
    void canRegisterClassroom() {
        // Step 1: Insert an Admin
        Faker faker = new Faker();
        String adminEmail = faker.internet().emailAddress();
        AdminRegistrationRequest adminRequest = new AdminRegistrationRequest(
                "Test School",
                faker.name().fullName(),
                faker.address().fullAddress(),
                adminEmail,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );

        // Send a POST request to register the admin
        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(adminRequest), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Get the admin ID
        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        int professorId = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(adminEmail))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // Step 2: Create Classroom using professorId
        String name = faker.book().title();
        String location = faker.address().fullAddress();
        String startDate = "2023-09-01";
        String endDate = "2023-12-15";
        List<String> classDays = List.of("Monday", "Wednesday", "Friday");
        List<Integer> studentsId = List.of(101, 102, 103);
        List<Integer> adminsId = List.of(201, 202, 203);

        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                name, professorId, location, startDate, endDate, classDays, studentsId, adminsId
        );

        // Send a POST request to register the classroom
        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassroomRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Get all classrooms
        List<Classroom> allClassrooms = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Classroom>() {})
                .returnResult()
                .getResponseBody();

        // Make sure that classroom is present
        int id = allClassrooms.stream()
                .filter(classroom -> classroom.getName().equals(name))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        Classroom expectedClassroom = new Classroom(
                id, name, professorId, location, startDate, endDate, classDays, studentsId, adminsId
        );

        assertThat(allClassrooms).contains(expectedClassroom);

        // Get classroom by id
        webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Classroom.class)
                .isEqualTo(expectedClassroom);
    }

    @Test
    void canDeleteClassroom() {
        // Step 1: Insert an Admin
        Faker faker = new Faker();
        String adminEmail = faker.internet().emailAddress();
        AdminRegistrationRequest adminRequest = new AdminRegistrationRequest(
                "Test School",
                faker.name().fullName(),
                faker.address().fullAddress(),
                adminEmail,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );

        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(adminRequest), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        int professorId = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(adminEmail))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // Step 2: Create Classroom
        String name = faker.book().title();
        String location = faker.address().fullAddress();
        String startDate = "2023-09-01";
        String endDate = "2023-12-15";
        List<String> classDays = List.of("Monday", "Wednesday", "Friday");
        List<Integer> studentsId = List.of(101, 102, 103);
        List<Integer> adminsId = List.of(201, 202, 203);

        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                name, professorId, location, startDate, endDate, classDays, studentsId, adminsId
        );

        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassroomRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Get all classrooms
        List<Classroom> allClassrooms = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Classroom>() {})
                .returnResult()
                .getResponseBody();

        int id = allClassrooms.stream()
                .filter(classroom -> classroom.getName().equals(name))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // Delete classroom
        webTestClient.delete()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk();

        // Try to get the classroom by id (should return 404)
        webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void canUpdateClassroom() {
        // Step 1: Insert an Admin
        Faker faker = new Faker();
        String adminEmail = faker.internet().emailAddress();
        AdminRegistrationRequest adminRequest = new AdminRegistrationRequest(
                "Test School",
                faker.name().fullName(),
                faker.address().fullAddress(),
                adminEmail,
                "password",
                "2000-01-01",
                Gender.MALE,
                List.of(1, 2, 3)
        );

        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(adminRequest), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        int professorId = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(adminEmail))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // Step 2: Create Classroom
        String name = faker.book().title();
        String location = faker.address().fullAddress();
        String startDate = "2023-09-01";
        String endDate = "2023-12-15";
        List<String> classDays = List.of("Monday", "Wednesday", "Friday");
        List<Integer> studentsId = List.of(101, 102, 103);
        List<Integer> adminsId = List.of(201, 202, 203);

        ClassroomRegistrationRequest request = new ClassroomRegistrationRequest(
                name, professorId, location, startDate, endDate, classDays, studentsId, adminsId
        );

        webTestClient.post()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), ClassroomRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Get all classrooms
        List<Classroom> allClassrooms = webTestClient.get()
                .uri(CLASSROOM_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Classroom>() {})
                .returnResult()
                .getResponseBody();

        int id = allClassrooms.stream()
                .filter(classroom -> classroom.getName().equals(name))
                .map(Classroom::getId)
                .findFirst()
                .orElseThrow();

        // Update classroom
        String newName = faker.book().title();
        ClassroomUpdateRequest updateRequest = new ClassroomUpdateRequest(
                newName, professorId, "Room 405", "2023-10-01", "2023-12-20",
                List.of("Tuesday", "Thursday"), List.of(104, 105), List.of(204, 205)
        );

        webTestClient.put()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(updateRequest), ClassroomUpdateRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Get updated classroom by id
        Classroom updatedClassroom = webTestClient.get()
                .uri(CLASSROOM_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Classroom.class)
                .returnResult()
                .getResponseBody();

        Classroom expected = new Classroom(
                id, newName, professorId, "Room 405", "2023-10-01", "2023-12-20",
                List.of("Tuesday", "Thursday"), List.of(104, 105), List.of(204, 205)
        );

        assertThat(updatedClassroom).isEqualTo(expected);
    }
}
