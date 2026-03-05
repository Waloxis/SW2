package com.bugtracker.service;

import com.bugtracker.dto.BugDto;
import com.bugtracker.dto.DashboardStats;
import com.bugtracker.model.Bug;
import com.bugtracker.repository.BugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BugService {

    private final BugRepository bugRepository;

    // ── Dashboard ────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public DashboardStats getDashboardStats() {
        long total      = bugRepository.count();
        long open       = bugRepository.countByStatus(Bug.Status.OPEN);
        long inProgress = bugRepository.countByStatus(Bug.Status.IN_PROGRESS);
        long resolved   = bugRepository.countByStatus(Bug.Status.RESOLVED);

        List<BugDto.Response> recent = bugRepository
                .findRecentBugs(PageRequest.of(0, 10))
                .stream()
                .map(BugDto.Response::fromBug)
                .collect(Collectors.toList());

        return DashboardStats.builder()
                .totalBugs(total)
                .openBugs(open)
                .inProgressBugs(inProgress)
                .resolvedBugs(resolved)
                .recentBugs(recent)
                .build();
    }

    // ── CRUD ─────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<BugDto.Response> getAllBugs(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return bugRepository.findAll(pageable).map(BugDto.Response::fromBug);
    }

    @Transactional(readOnly = true)
    public BugDto.Response getBugById(Long id) {
        Bug bug = findBugOrThrow(id);
        return BugDto.Response.fromBug(bug);
    }

    public BugDto.Response createBug(BugDto.CreateRequest request) {
        Bug bug = Bug.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .severity(request.getSeverity())
                .status(Bug.Status.OPEN)
                .reportedBy(request.getReportedBy())
                .assignedTo(request.getAssignedTo())
                .build();
        return BugDto.Response.fromBug(bugRepository.save(bug));
    }

    public BugDto.Response updateBug(Long id, BugDto.UpdateRequest request) {
        Bug bug = findBugOrThrow(id);

        if (request.getTitle()       != null) bug.setTitle(request.getTitle());
        if (request.getDescription() != null) bug.setDescription(request.getDescription());
        if (request.getSeverity()    != null) bug.setSeverity(request.getSeverity());
        if (request.getStatus()      != null) bug.setStatus(request.getStatus());
        if (request.getAssignedTo()  != null) bug.setAssignedTo(request.getAssignedTo());

        return BugDto.Response.fromBug(bugRepository.save(bug));
    }

    public void deleteBug(Long id) {
        findBugOrThrow(id);
        bugRepository.deleteById(id);
    }

    // ── Filters ───────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<BugDto.Response> getBugsByStatus(Bug.Status status) {
        return bugRepository.findByStatus(status)
                .stream().map(BugDto.Response::fromBug).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BugDto.Response> getBugsBySeverity(Bug.Severity severity) {
        return bugRepository.findBySeverity(severity)
                .stream().map(BugDto.Response::fromBug).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BugDto.Response> getBugsByAssignee(String assignee) {
        return bugRepository.findByAssignedTo(assignee)
                .stream().map(BugDto.Response::fromBug).collect(Collectors.toList());
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Bug findBugOrThrow(Long id) {
        return bugRepository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Bug not found with id: " + id));
    }
}
