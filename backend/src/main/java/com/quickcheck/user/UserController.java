package com.quickcheck.user;

import com.quickcheck.jwt.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/search/{userName}")
    public List<UserDTO> getUsersBySearch(@PathVariable("userName") String userName){
        return userService.getUsersBySearch(userName);
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

    @GetMapping("/organization/{organizationId}")
    public List<UserDTO> getUsersInOrganization(@PathVariable("organizationId") Integer organizationId){
        return userService.getAllUsersFromOrganization(organizationId);
    }

    @GetMapping("/organization/{organizationId}/search/{userName}")
    public List<UserDTO> getUsersFromOrganizationBySearch(
            @PathVariable("organizationId") Integer organizationId,
            @PathVariable("userName") String userName){
        return userService.getUsersFromOrganizationBySearch(organizationId,userName);
    }

    @GetMapping("/chat/{chatId}")
    public List<UserDTO> getChatMembers(@PathVariable("chatId") Integer chatId){
        return userService.getChatMembers(chatId);
    }

    @GetMapping("/chat/{chatId}/user/{userId}")
    public ResponseEntity<Boolean> isUserInChat(
            @PathVariable("userId") Integer userId,
            @PathVariable("chatId") Integer chatId) {
        boolean isInAttendance = userService.isUserInChat(userId, chatId);
        return ResponseEntity.ok(isInAttendance);
    }

    @GetMapping("/attendance/{attendanceTag}")
    public List<UserDTO> getUsersOfAttendance(
            @PathVariable("attendanceTag") String attendanceTag) {
        return userService.getUsersOfAttendance(attendanceTag);
    }
    @GetMapping("/attendance/{tag}/user/{userId}")
    public ResponseEntity<Boolean> isUserInAttendance(
            @PathVariable("userId") Integer userId,
            @PathVariable("tag") String  tag) {
        boolean isInAttendance = userService.isUserInAttendance(userId, tag);
        return ResponseEntity.ok(isInAttendance);
    }
    @GetMapping("/organization/{orgName}/user/{userId}")
    public ResponseEntity<Boolean> isUserInOrganization(
            @PathVariable("userId") Integer userId,
            @PathVariable("orgName") String  orgName) {
        boolean isInOrganization = userService.isUserInOrganization(userId, orgName);
        return ResponseEntity.ok(isInOrganization);
    }
    @GetMapping("/class/{classId}/user/{userId}")
    public ResponseEntity<Boolean> isUserInClass(
            @PathVariable("userId") Integer userId,
            @PathVariable("classId") Integer  classId) {
        boolean isInClass = userService.isUserInClass(userId, classId);
        return ResponseEntity.ok(isInClass);
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

    @PutMapping("/roles/{userId}")
    public void updateUserRoles(
            @PathVariable("userId") Integer userId,
            @RequestBody UserRolesUpdateRequest updateRequest){
        userService.updateUserRoles(userId,updateRequest);
    }

    @DeleteMapping("{userId}")
    public void deleteUser(
            @PathVariable("userId") Integer userId
    ){
        userService.deleteUser(userId);
    }

    @PostMapping(
            value = "{userId}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void uploadUserProfilePicture(
            @PathVariable("userId") Integer userId,
            @RequestParam("file") MultipartFile file){
        userService.uploadUserImage(userId,file);
    }

    @GetMapping(
            value = "{userId}/profile-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getUserProfilePicture(
            @PathVariable("userId") Integer userId){
        return userService.getUserImage(userId);
    }

}
