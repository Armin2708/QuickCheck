package com.quickcheck.email;

public record EmailVerificationRequest(
        Integer token,
        String email,
        String code
) {
}
