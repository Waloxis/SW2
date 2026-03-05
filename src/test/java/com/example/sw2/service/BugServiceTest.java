package com.example.sw2.service;

import com.example.sw2.dto.BugDto;
import com.example.sw2.dto.DashboardStats;
import com.example.sw2.model.Bug;
import com.example.sw2.repository.BugRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BugServiceTest {

    @Mock BugRepository bugRepository;
    @InjectMocks BugService bugService;

    @Test
    void getDashboardStats_returnsCounts() {
        when(bugRepository.count()).thenReturn(3L);
        when(bugRepository.countByStatus(Bug.Status.OPEN)).thenReturn(2L);
        when(bugRepository.countByStatus(Bug.Status.IN_PROGRESS)).thenReturn(1L);
        when(bugRepository.countByStatus(Bug.Status.RESOLVED)).thenReturn(0L);
        when(bugRepository.findRecentBugs(any(Pageable.class))).thenReturn(List.of());

        DashboardStats stats = bugService.getDashboardStats();

        assertThat(stats.getTotalBugs()).isEqualTo(3);
        assertThat(stats.getOpenBugs()).isEqualTo(2);
        assertThat(stats.getInProgressBugs()).isEqualTo(1);
        assertThat(stats.getResolvedBugs()).isEqualTo(0);
    }

    @Test
    void createBug_persistsAndReturnsResponse() {
        BugDto.CreateRequest req = new BugDto.CreateRequest(
                "Test bug", "desc", Bug.Severity.HIGH, "reporter", null);

        Bug saved = Bug.builder().id(1L).title("Test bug")
                .severity(Bug.Severity.HIGH).status(Bug.Status.OPEN).build();
        when(bugRepository.save(any(Bug.class))).thenReturn(saved);

        BugDto.Response response = bugService.createBug(req);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getStatus()).isEqualTo(Bug.Status.OPEN);
        verify(bugRepository).save(any(Bug.class));
    }

    @Test
    void getBugById_notFound_throwsException() {
        when(bugRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bugService.getBugById(99L))
                .isInstanceOf(jakarta.persistence.EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void deleteBug_callsRepository() {
        Bug bug = Bug.builder().id(1L).title("x").severity(Bug.Severity.LOW)
                .status(Bug.Status.OPEN).build();
        when(bugRepository.findById(1L)).thenReturn(Optional.of(bug));

        bugService.deleteBug(1L);

        verify(bugRepository).deleteById(1L);
    }
}
