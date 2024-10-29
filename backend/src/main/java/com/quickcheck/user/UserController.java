package com.quickcheck.user;

import com.quickcheck.jwt.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final JWTUtil jwtUtil;

    public UserController(UserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<UserDTO> getUsers(){
        return userService.getAllUsers();
    }


    @GetMapping("/id/{userId}")
    public UserDTO getUserById(@PathVariable("userId") Integer userId){
        return userService.getUserById(userId);
    }

    @GetMapping("/email/{email}")
    public UserDTO getUserByEmail(@PathVariable("email") String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/class/{classId}")
    public List<UserDTO> getUsersInClass(@PathVariable("classId") Integer classId){
        return userService.getUsersInClass(classId);
    }


    @PostMapping
    public ResponseEntity<?> registerUser(
            @RequestBody UserRegistrationRequest registrationRequest) throws SQLException {
        userService.addUser(registrationRequest);
        String jwtToken = jwtUtil.issueToken(registrationRequest.email(),List.of("ADMIN"));
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
    }

    @PutMapping("{userId}")
    public void updateUser(
            @PathVariable("userId") Integer userId,
            @RequestBody UserUpdateRequest updateRequest){
        userService.updateUser(userId,updateRequest);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(
            @PathVariable("userId") Integer userId
    ){
        userService.deleteUser(userId);
    }

}
