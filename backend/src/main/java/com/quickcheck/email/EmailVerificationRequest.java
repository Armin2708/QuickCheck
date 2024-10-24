package com.quickcheck.email;

public record EmailVerificationRequest(
        String email,
        String code
) {
}
