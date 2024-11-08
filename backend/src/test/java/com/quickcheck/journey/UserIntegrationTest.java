/*
package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.user.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
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
    private static final Faker FAKER = new Faker();
    private static final String USER_PATH = "/api/users";

    @Test
    void canRegisterUser() {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        LocalDate dateOfBirth = Date.valueOf("2000-01-01").toLocalDate();
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<String> expectedRoles = List.of(Roles.USER.toString());

        UserRegistrationRequest request = new UserRegistrationRequest(
                name, address, email, "password", dateOfBirth, gender
        );

        // send a post request
        String jwtToken = webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        // get all users
        List<UserDTO> allUsers = webTestClient.get()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        // make sure that user is present
        int id = allUsers.stream()
                .filter(user -> user.email().equals(email))
                .map(UserDTO::id)
                .findFirst()
                .orElseThrow();

        UserDTO expectedUser = new UserDTO(
                id,
                name,
                address,
                email,
                dateOfBirth,
                gender,
                expectedRoles,
                email
        );

        assertThat(allUsers).contains(expectedUser);

        // get user by id
        webTestClient.get()
                .uri(USER_PATH + "/id/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<UserDTO>() {
                })
                .isEqualTo(expectedUser);
    }

    @Test
    void canDeleteUser() throws SQLException {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String email2 = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";

        String address = faker.address().fullAddress();
        LocalDate dateOfBirth = Date.valueOf("2000-01-01").toLocalDate();
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<String> expectedRoles = List.of(Roles.USER.toString());

        UserRegistrationRequest request = new UserRegistrationRequest(
                name, address, email, "password", dateOfBirth, gender
        );

        UserRegistrationRequest request2 = new UserRegistrationRequest(
                name, address, email2, "password", dateOfBirth, gender
        );

        // send a post request
        String jwtToken = webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request2), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get all users
        List<UserDTO> allUsers = webTestClient.get()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        int id = allUsers.stream()
                .filter(user -> user.email().equals(email2))
                .map(UserDTO::id)
                .findFirst()
                .orElseThrow();


        // delete user
        webTestClient.delete()
                .uri(USER_PATH + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk();

        // try to get user by id (should return 404)
        webTestClient.get()
                .uri(USER_PATH + "/id/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void canUpdateUser() throws SQLException {
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        LocalDate dateOfBirth = Date.valueOf("2000-01-01").toLocalDate();
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<String> expectedRoles = List.of(Roles.USER.toString());

        UserRegistrationRequest request = new UserRegistrationRequest(
                name, address, email, "password", dateOfBirth, gender
        );

        // send a post request
        String jwtToken = webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        // get all users
        List<UserDTO> allUsers = webTestClient.get()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBodyList(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        int id = allUsers.stream()
                .filter(user -> user.email().equals(email))
                .map(UserDTO::id)
                .findFirst()
                .orElseThrow();

        // update user
        String newName = "Updated Name";
        UserUpdateRequest updateRequest = new UserUpdateRequest(
                newName, "Updated Address", null, null, null, null
        );

        webTestClient.put()
                .uri(USER_PATH + "/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(updateRequest), UserUpdateRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // get updated user by id
        UserDTO updatedUser = webTestClient.get()
                .uri(USER_PATH + "/id/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        UserDTO expected = new UserDTO(
                id, newName,
                "Updated Address", email, dateOfBirth, gender,
                expectedRoles,email);

        assertThat(updatedUser).isEqualTo(expected);
    }
    @Test
    void canGetUserById() {
        // Given
        UserRegistrationRequest request = createUserRegistrationRequest();

        // Register user and obtain token
        String jwtToken = webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus().isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        // Fetch all users and find ID of the newly registered user
        List<UserDTO> allUsers = webTestClient.get()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        int userId = allUsers.stream()
                .filter(user -> user.email().equals(request.email()))
                .map(UserDTO::id)
                .findFirst()
                .orElseThrow();

        // When: Retrieve user by ID
        UserDTO userById = webTestClient.get()
                .uri(USER_PATH + "/id/{userId}", userId)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        // Then: Validate the response
        UserDTO expectedUser = new UserDTO(
                userId,
                request.name(),
                request.address(),
                request.email(),
                request.dateOfBirth(),
                request.gender(),
                List.of(Roles.USER.toString()),
                request.email()
        );
        assertThat(userById).isEqualTo(expectedUser);
    }

    @Test
    void canGetUserByEmail() {
        // Given
        UserRegistrationRequest request = createUserRegistrationRequest();

        // Register user and obtain token
        String jwtToken = webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(request), UserRegistrationRequest.class)
                .exchange()
                .expectStatus().isOk()
                .returnResult(Void.class)
                .getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        // When: Retrieve user by email
        UserDTO userByEmail = webTestClient.get()
                .uri(USER_PATH + "/email/{email}", request.email())
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", jwtToken))
                .exchange()
                .expectStatus().isOk()
                .expectBody(new ParameterizedTypeReference<UserDTO>() {})
                .returnResult()
                .getResponseBody();

        // Then: Validate the response
        UserDTO expectedUser = new UserDTO(
                userByEmail.id(),
                request.name(),
                request.address(),
                request.email(),
                request.dateOfBirth(),
                request.gender(),
                List.of(Roles.USER.toString()),
                request.email()
        );
        assertThat(userByEmail).isEqualTo(expectedUser);
    }


    private UserRegistrationRequest createUserRegistrationRequest() {
        return new UserRegistrationRequest(
                FAKER.name().fullName(),
                FAKER.address().fullAddress(),
                FAKER.internet().emailAddress() + UUID.randomUUID(),
                "password",
                LocalDate.of(2000, 1, 1),
                Gender.MALE
        );
    }
}

*/
