package com.quickcheck.authentication;

public record AuthenticationRequest(
        String username,
        String password
) {
}
