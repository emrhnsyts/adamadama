package com.emrhnsyts.adamadama.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;



public record SessionCreateRequest(

        @Length(min = 2, max = 255, message = "Description length must be between 2 and 255.")
        String description,
        @NotBlank(message = "City can not be blank.")
        @Length(min = 2, max = 30, message = "City length must be between 2 and 30 letters.")
        String city,
        @Length(min = 2, max = 255, message = "District length must be between 2 and 255.")
        String district,
        @NotBlank(message = "Facility name can not be blank.")
        @Length(min = 2, max = 30, message = "Facility name length must be between 2 and 30 letters.")
        String facilityName,
        @NotBlank(message = "Datetime can not be blank.")
        String eventDate,
        @Range(min = 2, max = 22, message = "Player limit must be between 2 and 22.")
        Integer playerLimit) {

}
