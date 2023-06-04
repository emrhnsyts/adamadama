package com.emrhnsyts.adamadama.request;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record UserLoginRequest(@NotBlank(message = "Username can not be blank.")
                               @Length(min = 2, max = 20, message = "Username length must be between 2 and 20.")
                               String username,
                               @NotBlank(message = "Password can not be blank.")
                               @Length(min = 5, max = 30, message = "Password length must be between 5 and 30.")
                               String password) {
}
