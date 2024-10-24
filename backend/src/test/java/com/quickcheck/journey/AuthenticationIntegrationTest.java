package com.quickcheck.journey;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
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

import java.util.List;
import java.util.Random;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

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
    void canLogin(){
        // create registration request
        Faker faker = new Faker();
        Name fakerName = faker.name();

        String schoolName = "Test School";
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@quickcheck.com";
        String address = faker.address().fullAddress();
        String password = "password";
        String dateOfBirth = "2000-01-01";
        int age = RANDOM.nextInt(1, 100);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        List<Integer> classesId = List.of();
        List<String> roles = List.of("ADMIN");
        List<String> expectedRoles = List.of("ADMIN");

        UserRegistrationRequest userRegistrationRequest = new UserRegistrationRequest(
                schoolName, name, address, email, password, dateOfBirth, gender, roles
        );

        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email,password);

        webTestClient.post()
                .uri(AUTH_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest),AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isUnauthorized();

        // send a post request
        webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(userRegistrationRequest), UserRegistrationRequest.class)
                .exchange()
                .expectStatus()
                .isOk();

        /*WebTestClient.BodySpec<AuthenticationResponse,?>  spec = webTestClient.post()
                .uri(AUTH_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest),AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<AuthenticationResponse>() {
                });*/

        EntityExchangeResult<AuthenticationResponse> result = webTestClient.post()
                .uri(AUTH_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest),AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<AuthenticationResponse>() {
                })
                .returnResult();

        String jwtToken = result.getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        AuthenticationResponse authenticationResponse = result.getResponseBody();

        UserDTO userDTO = authenticationResponse.userDTO();

        assertThat(jwtUtil.isTokenValid(
                jwtToken,
                userDTO.username()
        )).isTrue();

        assertThat(userDTO.schoolName()).isEqualTo(schoolName);
        assertThat(userDTO.name()).isEqualTo(name);
        assertThat(userDTO.address()).isEqualTo(address);
        assertThat(userDTO.email()).isEqualTo(email);
        assertThat(userDTO.dateOfBirth()).isEqualTo(dateOfBirth);
        assertThat(userDTO.gender()).isEqualTo(gender);
        assertThat(userDTO.classesId()).isEqualTo(classesId);
        assertThat(userDTO.roles()).isEqualTo(expectedRoles);
        assertThat(userDTO.username()).isEqualTo(email);

    }

}
