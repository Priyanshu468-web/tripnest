package com.tripnest.service;

import com.tripnest.entity.Destination;
import com.tripnest.repository.DestinationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @PostConstruct
    @Transactional
    public void seedDestinations() {
        if (destinationRepository.count() == 0) {
            Destination d1 = Destination.builder()
                    .name("Kyoto")
                    .country("Japan")
                    .latitude(BigDecimal.valueOf(35.0116))
                    .longitude(BigDecimal.valueOf(135.7681))
                    .description("Famed for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.")
                    .imageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop")
                    .rating(4.9)
                    .tags("culture,temples,nature,historic")
                    .build();

            Destination d2 = Destination.builder()
                    .name("Reykjavik")
                    .country("Iceland")
                    .latitude(BigDecimal.valueOf(64.1466))
                    .longitude(BigDecimal.valueOf(-21.9426))
                    .description("The capital and largest city of Iceland, known for hot springs, geysers, and the dramatic Northern Lights.")
                    .imageUrl("https://images.unsplash.com/photo-1504829857797-ddff28127792?q=80&w=600&auto=format&fit=crop")
                    .rating(4.8)
                    .tags("nature,adventure,glaciers,northern-lights")
                    .build();

            Destination d3 = Destination.builder()
                    .name("Swiss Alps")
                    .country("Switzerland")
                    .latitude(BigDecimal.valueOf(46.8876))
                    .longitude(BigDecimal.valueOf(8.6555))
                    .description("Spectacular snow-covered peaks, alpine meadows, and world-class skiing, perfect for mountain lovers.")
                    .imageUrl("https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600&auto=format&fit=crop")
                    .rating(4.9)
                    .tags("hiking,snow,mountains,scenic")
                    .build();

            Destination d4 = Destination.builder()
                    .name("Paris")
                    .country("France")
                    .latitude(BigDecimal.valueOf(48.8566))
                    .longitude(BigDecimal.valueOf(2.3522))
                    .description("A major European city and a global center for art, fashion, gastronomy and culture, known for its landmarks like Eiffel Tower.")
                    .imageUrl("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop")
                    .rating(4.7)
                    .tags("art,fashion,food,romance")
                    .build();

            destinationRepository.saveAll(Arrays.asList(d1, d2, d3, d4));
        }
    }

    public List<Destination> searchDestinations(String query) {
        if (query == null || query.trim().isEmpty()) {
            return destinationRepository.findAll();
        }
        return destinationRepository.searchDestinations(query);
    }
}
