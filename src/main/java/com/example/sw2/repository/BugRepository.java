package com.example.sw2.repository;

import com.example.sw2.model.Bug;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {

    List<Bug> findByStatus(Bug.Status status);

    List<Bug> findBySeverity(Bug.Severity severity);

    List<Bug> findByAssignedTo(String assignedTo);

    Page<Bug> findAll(Pageable pageable);

    long countByStatus(Bug.Status status);

    @Query("SELECT b FROM Bug b ORDER BY b.createdAt DESC")
    List<Bug> findRecentBugs(Pageable pageable);
}
