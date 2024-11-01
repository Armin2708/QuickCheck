package com.quickcheck.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidAccessCodeException extends RuntimeException {
        public InvalidAccessCodeException(String message) {
            super(message);
        }
}
