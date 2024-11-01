package com.quickcheck.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class ClosedAccessException extends RuntimeException {
        public ClosedAccessException(String message) {
            super(message);
        }
}
