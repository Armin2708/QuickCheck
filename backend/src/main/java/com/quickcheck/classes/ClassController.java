package com.quickcheck.classes;

import com.quickcheck.classroom.Classroom;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/classes")
public class ClassController {

    private final ClassService classService;

    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping
    public List<Class> getClasses(){
        return classService.getAllClasses();
    }

    @GetMapping("/organization/{organizationName}")
    public List<Class> getOrganizationClasses(@PathVariable("organizationName") String organizationName){
        return classService.getClassesOfOrganization(organizationName);
    }

    @GetMapping("/organization/{orgName}/user/{userId}")
    public List<Class> getClassesOfUserInOrganization(
            @PathVariable("orgName") String orgName,
            @PathVariable("userId") Integer userId){
        return classService.getClassesOfUserInOrganization(orgName,userId);
    }

    @GetMapping("/organization/{orgName}/instructor/{professorId}")
    public List<Class> getClassesOfProfessorInOrganization(
            @PathVariable("orgName") String orgName,
            @PathVariable("professorId") Integer professorId){
        return classService.getClassesOfProfessorInOrganization(orgName,professorId);
    }


    @GetMapping("/id/{classId}")
    public Class getClass(@PathVariable("classId") Integer classId){
        return classService.getClassById(classId);
    }

    @PostMapping
    public ResponseEntity<?> registerClass(
            @RequestBody ClassRegistrationRequest registrationRequest
    ) {
        classService.addClass(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join/{classId}/{userId}")
    public ResponseEntity<?> joinClass(
            @PathVariable("classId") Integer classId,
            @PathVariable("userId") Integer userId
    ) {
        classService.joinClass(classId,userId);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/leave/{classId}/{userId}")
    public ResponseEntity<?> leaveClass(
            @PathVariable("classId") Integer classId,
            @PathVariable("userId") Integer userId
    ) {
        classService.leaveClass(classId,userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{classId}")
    public void updateClass(
            @PathVariable("classId") Integer classId,
            @RequestBody ClassUpdateRequest updateRequest){
        classService.updateClass(classId,updateRequest);
    }

    @DeleteMapping("{classId}")
    public void deleteClass(
            @PathVariable("classId") Integer classId
    ){
        classService.deleteClass(classId);
    }

}