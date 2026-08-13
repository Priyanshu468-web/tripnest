package com.tripnest.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tripId;

    @Column(nullable = false)
    private String title;

    private String type; // PASSPORT, TICKET, HOTEL_BOOKING, PHOTO, OTHER

    @Column(nullable = false)
    private String fileUrl;

    private Long fileSizeBytes;

    private LocalDateTime uploadedAt;

    public Document() {}

    public Document(Long id, Long tripId, String title, String type, String fileUrl, Long fileSizeBytes, LocalDateTime uploadedAt) {
        this.id = id;
        this.tripId = tripId;
        this.title = title;
        this.type = type;
        this.fileUrl = fileUrl;
        this.fileSizeBytes = fileSizeBytes;
        this.uploadedAt = uploadedAt;
    }

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
        if (type == null) type = "OTHER";
    }

    public static DocumentBuilder builder() { return new DocumentBuilder(); }

    public static class DocumentBuilder {
        private Long id;
        private Long tripId;
        private String title;
        private String type;
        private String fileUrl;
        private Long fileSizeBytes;
        private LocalDateTime uploadedAt;

        public DocumentBuilder id(Long id) { this.id = id; return this; }
        public DocumentBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public DocumentBuilder title(String title) { this.title = title; return this; }
        public DocumentBuilder type(String type) { this.type = type; return this; }
        public DocumentBuilder fileUrl(String fileUrl) { this.fileUrl = fileUrl; return this; }
        public DocumentBuilder fileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; return this; }
        public DocumentBuilder uploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; return this; }

        public Document build() {
            return new Document(id, tripId, title, type, fileUrl, fileSizeBytes, uploadedAt);
        }
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
