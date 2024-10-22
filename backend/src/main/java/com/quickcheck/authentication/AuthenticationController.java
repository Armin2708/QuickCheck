package com.quickcheck.authentication;

import com.quickcheck.jwt.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService, JWTUtil jwtUtil) {
        this.authenticationService = authenticationService;
    }
    @PostMapping("login")
    public ResponseEntity<?> login(
            @RequestBody AuthenticationRequest request
    ){
        authenticationService.login(request);
        AuthenticationResponse response = authenticationService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.token())
                .body(response);

    }
}
