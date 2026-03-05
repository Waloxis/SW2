package com.bugtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private long totalBugs;
    private long openBugs;
    private long inProgressBugs;
    private long resolvedBugs;
    private List<BugDto.Response> recentBugs;
}
