package com.quickcheck.user;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("{userId}")
    public User getUser(@PathVariable("userId") Integer userId){
        return userService.getUser(userId);
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest registrationRequest) throws SQLException {
        userService.addUser(registrationRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION)
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
