package com.quickcheck.email;

public record EmailRequest(
        String to,
        String subject,
        String body,
        String url
){

}