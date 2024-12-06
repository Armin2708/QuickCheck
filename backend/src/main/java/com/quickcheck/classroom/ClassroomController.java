package com.quickcheck.classroom;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping
    public List<Classroom> getClassrooms(){
        return classroomService.getAllClassrooms();
    }

    @GetMapping("organization/{organizationId}")
    public List<Classroom> getOrganizationClassrooms(
            @PathVariable("organizationId") Integer organizationId
    ){
        return classroomService.getAllOrganizationClassrooms(organizationId);
    }

    @GetMapping("organization/{organizationId}/search/{classroomName}")
    public List<Classroom> searchOrganizationClassrooms(
            @PathVariable("organizationId") Integer organizationId,
            @PathVariable("classroomName") String classroomName
    ){
        return classroomService.getOrganizationClassroomsByNameSearch(organizationId,classroomName);
    }

    @GetMapping("/id/{classroomId}")
    public Classroom getClassroomById(@PathVariable("classroomId") Integer classroomId){
        return classroomService.getClassroomById(classroomId);
    }

    @GetMapping("/name/{name}/organization/{organizationId}")
    public Classroom getClassroomByNameAndOrganization(
            @PathVariable("name") String name,
            @PathVariable("organizationId") Integer organizationId
    ){
        return classroomService.getClassroomByNameAndOrganization(name,organizationId);
    }

    @PostMapping
    public ResponseEntity<?> registerClassroom(@RequestBody ClassroomRegistrationRequest registrationRequest) {
        classroomService.addClassroom(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{classroomId}")
    public void updateClassroom(
            @PathVariable("classroomId") Integer classroomId,
            @RequestBody ClassroomUpdateRequest updateRequest){
        classroomService.updateClassroom(classroomId,updateRequest);
    }

    @DeleteMapping("{classroomId}")
    public void deleteClassroom(
            @PathVariable("classroomId") Integer classroomId
    ){
        classroomService.deleteClassroom(classroomId);
    }

}