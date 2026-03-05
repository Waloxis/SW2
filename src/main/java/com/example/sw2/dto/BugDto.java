package com.bugtracker.dto;

import com.bugtracker.model.Bug;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BugDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {

        @NotBlank(message = "Title is required")
        private String title;

        private String description;

        @NotNull(message = "Severity is required")
        private Bug.Severity severity;

        private String reportedBy;

        private String assignedTo;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateRequest {

        private String title;

        private String description;

        private Bug.Severity severity;

        private Bug.Status status;

        private String assignedTo;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private Long id;
        private String title;
        private String description;
        private Bug.Severity severity;
        private Bug.Status status;
        private String reportedBy;
        private String assignedTo;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static Response fromBug(Bug bug) {
            return Response.builder()
                    .id(bug.getId())
                    .title(bug.getTitle())
                    .description(bug.getDescription())
                    .severity(bug.getSeverity())
                    .status(bug.getStatus())
                    .reportedBy(bug.getReportedBy())
                    .assignedTo(bug.getAssignedTo())
                    .createdAt(bug.getCreatedAt())
                    .updatedAt(bug.getUpdatedAt())
                    .build();
        }
    }
}
