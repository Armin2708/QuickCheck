package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

public class User implements UserDetails {
    private Integer id;
    private String name;
    private String address;
    private String email;
    private String password;
    private Date dateOfBirth;
    private Gender gender;
    private List<Roles> roles;

    public User() {
    }

    public User(String name, String address, String email,
                String password, Date dateOfBirth, Gender gender, List<Roles> roles) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.roles = roles;
    }

    public User(Integer id, String name, String address, String email,
                String password, Date dateOfBirth, Gender gender, List<Roles> roles) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.roles = roles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id){this.id=id;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Roles> getRoles() {
        return roles;  // Getter for roles
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;  // Setter for roles
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return roles.stream()  // Stream the roles
                .map(role -> new SimpleGrantedAuthority(role.name()))  // Map each role to a GrantedAuthority with "ROLE_" prefix
                .collect(Collectors.toList());  // Collect as a list of GrantedAuthority
    }

    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true /*UserDetails.super.isAccountNonExpired()*/;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true/*UserDetails.super.isAccountNonLocked()*/;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true/*UserDetails.super.isCredentialsNonExpired()*/;
    }

    @Override
    public boolean isEnabled() {
        return true/*UserDetails.super.isEnabled()*/;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(name, user.name) &&
                Objects.equals(address, user.address) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password) &&
                Objects.equals(dateOfBirth, user.dateOfBirth) &&
                Objects.equals(gender, user.gender) &&
                Objects.equals(roles, user.roles) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, email, password, dateOfBirth, gender, roles);
    }

    @Override
    public String toString() {

        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth + '\'' +
                ", gender=" + gender + '\'' +
                ", roles=" + roles + '\'' +
                '}';
    }

}
