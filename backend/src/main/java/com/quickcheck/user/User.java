package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.user.roles.RoleDTO;
import com.quickcheck.user.roles.RolesTitle;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

public class User implements UserDetails {
    private Integer id;
    private String name;
    private String address;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    private Gender gender;
    private AccountType accountType;
    private List<RoleDTO> roles;
    private String profileImageId;

    public User() {}

    public User(String name, String address, String email,
                String password, LocalDate dateOfBirth, Gender gender, List<RoleDTO> roles, AccountType accountType) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.roles = roles;
        this.accountType=accountType;
    }

    public User(Integer id, String name, String address, String email,
                String password, LocalDate dateOfBirth, Gender gender, List<RoleDTO> roles, AccountType accountType) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.roles = roles;
        this.accountType=accountType;
    }

    public User(Integer id, String name, String address, String email,
                String password, LocalDate dateOfBirth, Gender gender,
                List<RoleDTO> roles, AccountType accountType, String profileImageId) {
        this(id, name, address,email, password, dateOfBirth, gender,roles,accountType);
        this.profileImageId=profileImageId;
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

    public List<RoleDTO> getRoles() {
        return roles;  // Getter for roles
    }

    public void setRoles(List<RoleDTO> roles) {
        this.roles = roles;  // Setter for roles
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(accountType.name()));

        return authorities;
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getProfileImageId() {
        return profileImageId;
    }

    public void setProfileImageId(String profileImageId) {
        this.profileImageId = profileImageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(address, user.address) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(dateOfBirth, user.dateOfBirth) && gender == user.gender && accountType == user.accountType && Objects.equals(roles, user.roles) && Objects.equals(profileImageId, user.profileImageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, email, password, dateOfBirth, gender, accountType, roles, profileImageId);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", gender=" + gender +
                ", accountType=" + accountType +
                ", roles=" + roles +
                ", profileImageId='" + profileImageId + '\'' +
                '}';
    }
}
