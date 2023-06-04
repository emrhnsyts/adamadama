package com.emrhnsyts.adamadama.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

public record UserCreateRequest(
        @NotBlank(message = "Username can not be blank.")
        @Length(min = 2, max = 20, message = "Username length must be between 2 and 20.")
        String username,
        @NotBlank(message = "Name can not be blank.")
        @Length(min = 2, max = 30, message = "Name length must be between 2 and 30.")
        String name,
        @NotBlank(message = "Surname can not be blank.")
        @Length(min = 2, max = 30, message = "Surname length must be between 2 and 30.")
        String surname,
        @NotBlank(message = "Phone number can not be blank.")
        @Length(min = 8, max = 12, message = "Phone number length must be between 8 and 12.")
        String phoneNumber,
        @NotBlank(message = "Email can not be blank.")
        @Email(message = "Email must be in a valid form.")
        String email,
        @NotBlank(message = "Password can not be blank.")
        @Length(min = 5, max = 30, message = "Password length must be between 5 and 30.")
        String password) {

}
