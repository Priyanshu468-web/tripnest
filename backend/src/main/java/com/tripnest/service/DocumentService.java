package com.tripnest.service;

import com.tripnest.dto.DocumentDto;
import com.tripnest.entity.Document;
import com.tripnest.exception.BadRequestException;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final String uploadDir = "uploads/";

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public List<DocumentDto> getDocumentsByTripId(Long tripId) {
        return documentRepository.findByTripIdOrderByUploadedAtDesc(tripId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public DocumentDto uploadDocument(Long tripId, String title, String type, MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Uploaded file is empty");
        }

        // Validate 5MB max size
        long maxSizeBytes = 5 * 1024 * 1024;
        if (file.getSize() > maxSizeBytes) {
            throw new BadRequestException("File size exceeds maximum limit of 5MB");
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID().toString() + fileExtension;
        Path targetPath = Paths.get(uploadDir).resolve(fileName);

        try {
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }

        String fileUrl = "/uploads/" + fileName;

        Document document = Document.builder()
                .tripId(tripId)
                .title(title != null && !title.trim().isEmpty() ? title : originalFilename)
                .type(type != null ? type.toUpperCase() : "OTHER")
                .fileUrl(fileUrl)
                .fileSizeBytes(file.getSize())
                .build();

        Document saved = documentRepository.save(document);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        // Remove actual file if exists
        try {
            String fileName = document.getFileUrl().replace("/uploads/", "");
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Ignore file deletion error if missing
        }

        documentRepository.delete(document);
    }

    private DocumentDto convertToDto(Document entity) {
        return new DocumentDto(
                entity.getId(),
                entity.getTripId(),
                entity.getTitle(),
                entity.getType(),
                entity.getFileUrl(),
                entity.getFileSizeBytes(),
                entity.getUploadedAt()
        );
    }
}
