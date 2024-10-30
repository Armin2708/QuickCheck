package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.quickcheck.Gender;
import com.quickcheck.authentication.AuthenticationRequest;
import com.quickcheck.authentication.AuthenticationResponse;
import com.quickcheck.jwt.JWTUtil;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserRegistrationRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;


@SpringBootTest(webEnvironment = RANDOM_PORT)
public class AuthenticationIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private JWTUtil jwtUtil;

    private static final Random RANDOM = new Random();
    private static final String AUTH_PATH = "/api/auth";
    private static final String USER_PATH = "/api/users";

    @Test
    void canLogin() {
        // Initialize Faker and create a registration request
        Faker faker = new Faker();
        String name = faker.name().fullName();
        String email = faker.name().lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        String password = "password";

        // Convert Faker's birthday date directly to LocalDate
        LocalDate dateOfBirthLocalDate = faker.date().birthday().toInstant().atZone(ZoneOffset.UTC).toLocalDate();
        LocalDate dateOfBirth = LocalDate.from(dateOfBirthLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Gender gender = RANDOM.nextInt(100) % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<String> expectedRoles = List.of("USER");

        UserRegistrationRequest userRegistrationRequest = new UserRegistrationRequest(
                name, address, email, password, dateOfBirth, gender
        );

        // Authentication request
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email, password);

        // Register the user
        webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRegistrationRequest), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        // Log in the user and capture the response
        EntityExchangeResult<AuthenticationResponse> result = webTestClient.post()
                .uri(AUTH_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest), AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<AuthenticationResponse>() {})
                .returnResult();

        String jwtToken = result.getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);
        AuthenticationResponse authenticationResponse = result.getResponseBody();
        UserDTO userDTO = authenticationResponse.userDTO();

        // Convert the Date in UserDTO to LocalDate for consistent comparison
        LocalDate actualDateOfBirth = userDTO.dateOfBirth();

        // Assertions
        assertThat(jwtUtil.isTokenValid(jwtToken, userDTO.username())).isTrue();
        assertThat(userDTO.name()).isEqualTo(name);
        assertThat(userDTO.address()).isEqualTo(address);
        assertThat(userDTO.email()).isEqualTo(email);
        assertThat(actualDateOfBirth).isEqualTo(dateOfBirthLocalDate); // Date comparison
        assertThat(userDTO.gender()).isEqualTo(gender);
        assertThat(userDTO.roles()).isEqualTo(expectedRoles);
        assertThat(userDTO.username()).isEqualTo(email);
    }
}

