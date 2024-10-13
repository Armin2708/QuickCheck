package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.quickcheck.Gender;
import com.quickcheck.admin.Admin;
import com.quickcheck.admin.AdminRegistrationRequest;
import com.quickcheck.admin.AdminUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.sql.SQLException;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class AdminIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    private static final Random RANDOM = new Random();
    private static final String ADMIN_URI = "/api/admins";

    @Test
    void canRegisterAdmin() throws SQLException {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String schoolName = "Test School";
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        String dateOfBirth = "2000-01-01";
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<Integer> classesId = List.of(1, 2, 3);

        AdminRegistrationRequest request = new AdminRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all admins
        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        // make sure that admin is present
        int id = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        Admin expectedAdmin = new Admin(
                id, schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        assertThat(allAdmins).contains(expectedAdmin);

        // get admin by id
        webTestClient.get()
                .uri(ADMIN_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Admin.class)
                .isEqualTo(expectedAdmin);
    }

    @Test
    void canDeleteAdmin() throws SQLException {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String schoolName = "Test School";
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        String dateOfBirth = "2000-01-01";
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<Integer> classesId = List.of(1, 2, 3);

        AdminRegistrationRequest request = new AdminRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all admins
        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        int id = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // delete admin
        webTestClient.delete()
                .uri(ADMIN_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk();

        // try to get admin by id (should return 404)
        webTestClient.get()
                .uri(ADMIN_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void canUpdateAdmin() throws SQLException {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String schoolName = "Test School";
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        String dateOfBirth = "2000-01-01";
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<Integer> classesId = List.of(1, 2, 3);

        AdminRegistrationRequest request = new AdminRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), AdminRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all admins
        List<Admin> allAdmins = webTestClient.get()
                .uri(ADMIN_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<Admin>() {})
                .returnResult()
                .getResponseBody();

        int id = allAdmins.stream()
                .filter(admin -> admin.getEmail().equals(email))
                .map(Admin::getId)
                .findFirst()
                .orElseThrow();

        // update admin
        String newName = "Updated Name";
        AdminUpdateRequest updateRequest = new AdminUpdateRequest(
                "Updated School", newName, "Updated Address", null, null, null, null, null
        );

        webTestClient.put()
                .uri(ADMIN_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(updateRequest), AdminUpdateRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get updated admin by id
        Admin updatedAdmin = webTestClient.get()
                .uri(ADMIN_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(Admin.class)
                .returnResult()
                .getResponseBody();

        Admin expected = new Admin(id, "Updated School", newName, "Updated Address", email, "password", dateOfBirth, gender, classesId);

        assertThat(updatedAdmin).isEqualTo(expected);
    }
}

