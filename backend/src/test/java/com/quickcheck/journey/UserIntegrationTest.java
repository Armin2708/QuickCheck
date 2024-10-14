package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.quickcheck.Gender;
import com.quickcheck.user.*;
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
public class UserIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    private static final Random RANDOM = new Random();
    private static final String USER_URI = "/api/users";

    @Test
    void canRegisterUser() throws SQLException {
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

        UserRegistrationRequest request = new UserRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all users
        List<User> allUsers = webTestClient.get()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<User>() {})
                .returnResult()
                .getResponseBody();

        // make sure that user is present
        int id = allUsers.stream()
                .filter(user -> user.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        User expectedUser = new User(
                id, schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        assertThat(allUsers).contains(expectedUser);

        // get user by id
        webTestClient.get()
                .uri(USER_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(User.class)
                .isEqualTo(expectedUser);
    }

    @Test
    void canDeleteUser() throws SQLException {
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

        UserRegistrationRequest request = new UserRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all users
        List<User> allUsers = webTestClient.get()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<User>() {})
                .returnResult()
                .getResponseBody();

        int id = allUsers.stream()
                .filter(user -> user.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // delete user
        webTestClient.delete()
                .uri(USER_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk();

        // try to get user by id (should return 404)
        webTestClient.get()
                .uri(USER_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void canUpdateUser() throws SQLException {
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

        UserRegistrationRequest request = new UserRegistrationRequest(
                schoolName, name, address, email, "password", dateOfBirth, gender, classesId
        );

        // send a post request
        webTestClient.post()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all users
        List<User> allUsers = webTestClient.get()
                .uri(USER_URI)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<User>() {})
                .returnResult()
                .getResponseBody();

        int id = allUsers.stream()
                .filter(user -> user.getEmail().equals(email))
                .map(User::getId)
                .findFirst()
                .orElseThrow();

        // update user
        String newName = "Updated Name";
        UserUpdateRequest updateRequest = new UserUpdateRequest(
                "Updated School", newName, "Updated Address", null, null, null, null, null
        );

        webTestClient.put()
                .uri(USER_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(updateRequest), UserUpdateRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get updated user by id
        User updatedUser = webTestClient.get()
                .uri(USER_URI + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(User.class)
                .returnResult()
                .getResponseBody();

        User expected = new User(id, "Updated School", newName, "Updated Address", email, "password", dateOfBirth, gender, classesId);

        assertThat(updatedUser).isEqualTo(expected);
    }
}

