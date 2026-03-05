package com.example.sw2.config;

import com.example.sw2.model.Bug;
import com.example.sw2.repository.BugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    /**
     * Seeds a handful of sample bugs when running with the "dev" profile.
     * Run with:  ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
     */
    @Bean
    @Profile("dev")
    public CommandLineRunner seedData(BugRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            repo.save(Bug.builder()
                    .title("Login page crashes on iOS 17")
                    .description("Users on iOS 17 get a white screen after tapping 'Sign in'.")
                    .severity(Bug.Severity.CRITICAL)
                    .status(Bug.Status.OPEN)
                    .reportedBy("alice@example.com")
                    .build());

            repo.save(Bug.builder()
                    .title("Dashboard stats not refreshing")
                    .description("Counter cards show stale data after adding a new bug.")
                    .severity(Bug.Severity.HIGH)
                    .status(Bug.Status.IN_PROGRESS)
                    .reportedBy("bob@example.com")
                    .assignedTo("charlie@example.com")
                    .build());

            repo.save(Bug.builder()
                    .title("Typo in error message")
                    .description("'Occured' should be 'Occurred' on the 404 page.")
                    .severity(Bug.Severity.LOW)
                    .status(Bug.Status.RESOLVED)
                    .reportedBy("dave@example.com")
                    .assignedTo("eve@example.com")
                    .build());

            repo.save(Bug.builder()
                    .title("Table pagination breaks at 100+ rows")
                    .description("Next-page button becomes unresponsive when bug count exceeds 100.")
                    .severity(Bug.Severity.MEDIUM)
                    .status(Bug.Status.OPEN)
                    .reportedBy("frank@example.com")
                    .build());
        };
    }
}
