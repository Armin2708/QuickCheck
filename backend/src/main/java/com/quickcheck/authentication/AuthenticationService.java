package com.quickcheck.authentication;

import com.quickcheck.jwt.JWTUtil;
import com.quickcheck.user.User;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserDTOMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserDTOMapper userDTOMapper;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public AuthenticationService(UserDTOMapper userDTOMapper, AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.userDTOMapper = userDTOMapper;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username().toLowerCase(),
                        request.password()
                )
        );
        User principal = (User) authentication.getPrincipal();
/*
        ResponseBodyHandlers.FileDownloadBodyHandler userDTOMapper;
*/
        UserDTO userDTO = userDTOMapper.apply(principal);
        String token = jwtUtil.issueToken(userDTO.username(), userDTO.accountType());
        return new AuthenticationResponse(token, userDTO);
    }
}
