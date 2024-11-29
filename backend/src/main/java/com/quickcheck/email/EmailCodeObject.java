package com.quickcheck.email;

import com.quickcheck.user.User;

import java.util.Objects;

public class EmailCodeObject {

    private Integer id;
    private String email;
    private String code;

    public EmailCodeObject() {}

    public EmailCodeObject(String email, String code) {
        this.email = email;
        this.code = code;
    }

    public EmailCodeObject(Integer id, String email, String code) {
        this.id = id;
        this.email = email;
        this.code = code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmailCodeObject emailCodeObject = (EmailCodeObject) o;
        return Objects.equals(id, emailCodeObject.id) &&
                Objects.equals(email, emailCodeObject.email) &&
                Objects.equals(code, emailCodeObject.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, code);
    }

    @Override
    public String toString() {
        return "EmailCodeObject{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
