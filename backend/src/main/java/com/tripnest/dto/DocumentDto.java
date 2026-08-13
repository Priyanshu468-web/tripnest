package com.tripnest.dto;

import java.time.LocalDateTime;

public class DocumentDto {
    private Long id;
    private Long tripId;
    private String title;
    private String type;
    private String fileUrl;
    private Long fileSizeBytes;
    private LocalDateTime uploadedAt;

    public DocumentDto() {}

    public DocumentDto(Long id, Long tripId, String title, String type, String fileUrl, Long fileSizeBytes, LocalDateTime uploadedAt) {
        this.id = id;
        this.tripId = tripId;
        this.title = title;
        this.type = type;
        this.fileUrl = fileUrl;
        this.fileSizeBytes = fileSizeBytes;
        this.uploadedAt = uploadedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
