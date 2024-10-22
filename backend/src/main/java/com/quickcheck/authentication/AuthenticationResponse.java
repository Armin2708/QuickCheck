package com.quickcheck.authentication;

import com.quickcheck.user.UserDTO;

public record AuthenticationResponse(
        String token,
        UserDTO userDTO
) {
}
