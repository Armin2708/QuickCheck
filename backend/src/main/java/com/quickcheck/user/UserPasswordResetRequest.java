package com.quickcheck.user;

public record UserPasswordResetRequest(
        String email,
        String password,
        String code
) {
}
