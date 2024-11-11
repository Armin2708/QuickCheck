package com.quickcheck.email;

public record EmailCodeCreationRequest(
        String email,
        String url
) {
}
