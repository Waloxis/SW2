package com.example.sw2.controller;

import com.example.sw2.dto.BugDto;
import com.example.sw2.dto.DashboardStats;
import com.example.sw2.model.Bug;
import com.example.sw2.service.BugService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BugController {

    private final BugService bugService;

    // ── Dashboard ─────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/dashboard
     * Returns totals (Total Bugs, Open, In Progress, Resolved) + recent bugs list.
     * This is the primary endpoint for the "Welcome back!" dashboard.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboard() {
        return ResponseEntity.ok(bugService.getDashboardStats());
    }

    // ── Bugs CRUD ─────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/bugs?page=0&size=20&sortBy=createdAt&direction=desc
     */
    @GetMapping("/bugs")
    public ResponseEntity<Page<BugDto.Response>> getAllBugs(
            @RequestParam(defaultValue = "0")          int    page,
            @RequestParam(defaultValue = "20")         int    size,
            @RequestParam(defaultValue = "createdAt")  String sortBy,
            @RequestParam(defaultValue = "desc")       String direction) {
        return ResponseEntity.ok(bugService.getAllBugs(page, size, sortBy, direction));
    }

    /**
     * GET /api/v1/bugs/{id}
     */
    @GetMapping("/bugs/{id}")
    public ResponseEntity<BugDto.Response> getBugById(@PathVariable Long id) {
        return ResponseEntity.ok(bugService.getBugById(id));
    }

    /**
     * POST /api/v1/bugs
     */
    @PostMapping("/bugs")
    public ResponseEntity<BugDto.Response> createBug(@Valid @RequestBody BugDto.CreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bugService.createBug(request));
    }

    /**
     * PATCH /api/v1/bugs/{id}
     */
    @PatchMapping("/bugs/{id}")
    public ResponseEntity<BugDto.Response> updateBug(
            @PathVariable Long id,
            @RequestBody BugDto.UpdateRequest request) {
        return ResponseEntity.ok(bugService.updateBug(id, request));
    }

    /**
     * DELETE /api/v1/bugs/{id}
     */
    @DeleteMapping("/bugs/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable Long id) {
        bugService.deleteBug(id);
        return ResponseEntity.noContent().build();
    }

    // ── Filters ───────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/bugs/status/{status}   (OPEN | IN_PROGRESS | RESOLVED)
     */
    @GetMapping("/bugs/status/{status}")
    public ResponseEntity<List<BugDto.Response>> getBugsByStatus(
            @PathVariable Bug.Status status) {
        return ResponseEntity.ok(bugService.getBugsByStatus(status));
    }

    /**
     * GET /api/v1/bugs/severity/{severity}   (LOW | MEDIUM | HIGH | CRITICAL)
     */
    @GetMapping("/bugs/severity/{severity}")
    public ResponseEntity<List<BugDto.Response>> getBugsBySeverity(
            @PathVariable Bug.Severity severity) {
        return ResponseEntity.ok(bugService.getBugsBySeverity(severity));
    }

    /**
     * GET /api/v1/bugs/assignee/{name}
     */
    @GetMapping("/bugs/assignee/{name}")
    public ResponseEntity<List<BugDto.Response>> getBugsByAssignee(
            @PathVariable String name) {
        return ResponseEntity.ok(bugService.getBugsByAssignee(name));
    }
}
