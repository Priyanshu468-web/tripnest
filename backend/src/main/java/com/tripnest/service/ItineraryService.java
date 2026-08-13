package com.tripnest.service;

import com.tripnest.dto.ItineraryDto;
import com.tripnest.entity.Itinerary;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;

    @Autowired
    public ItineraryService(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    public List<ItineraryDto> getItinerariesByTripId(Long tripId) {
        return itineraryRepository.findByTripIdOrderByDayNumberAsc(tripId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ItineraryDto createOrUpdateItinerary(ItineraryDto dto) {
        Itinerary itinerary;
        if (dto.getId() != null) {
            itinerary = itineraryRepository.findById(dto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Itinerary not found with id: " + dto.getId()));
            itinerary.setDayNumber(dto.getDayNumber());
            itinerary.setDate(dto.getDate());
            itinerary.setTitle(dto.getTitle());
            itinerary.setNotes(dto.getNotes());
        } else {
            itinerary = Itinerary.builder()
                    .tripId(dto.getTripId())
                    .dayNumber(dto.getDayNumber())
                    .date(dto.getDate())
                    .title(dto.getTitle())
                    .notes(dto.getNotes())
                    .build();
        }

        Itinerary saved = itineraryRepository.save(itinerary);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteItinerary(Long id) {
        if (!itineraryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Itinerary not found with id: " + id);
        }
        itineraryRepository.deleteById(id);
    }

    private ItineraryDto convertToDto(Itinerary entity) {
        return new ItineraryDto(
                entity.getId(),
                entity.getTripId(),
                entity.getDayNumber(),
                entity.getDate(),
                entity.getTitle(),
                entity.getNotes()
        );
    }
}
