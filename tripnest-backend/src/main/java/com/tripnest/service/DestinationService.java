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
        // Clear any old placeholder locations to load fresh Indian destinations
        destinationRepository.deleteAll();

        Destination d1 = Destination.builder()
                .name("Srinagar")
                .country("India")
                .latitude(BigDecimal.valueOf(34.0837))
                .longitude(BigDecimal.valueOf(74.7973))
                .description("Known as the 'Heaven on Earth', Srinagar is famous for its serene Dal Lake, beautiful houseboats, shikara rides, and historic Mughal Gardens.")
                .imageUrl("https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=600&auto=format&fit=crop")
                .rating(4.9)
                .tags("Nature, Lakes, Mountains, Romantic")
                .build();

        Destination d2 = Destination.builder()
                .name("Leh Ladakh")
                .country("India")
                .latitude(BigDecimal.valueOf(34.1526))
                .longitude(BigDecimal.valueOf(77.5771))
                .description("A high-altitude cold desert famous for its dramatic lakes like Pangong Tso, Buddhist monasteries, and high mountain motorable passes.")
                .imageUrl("https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=600&auto=format&fit=crop")
                .rating(4.8)
                .tags("Adventure, Mountains, Lakes, Trekking")
                .build();

        Destination d3 = Destination.builder()
                .name("Munnar")
                .country("India")
                .latitude(BigDecimal.valueOf(10.0889))
                .longitude(BigDecimal.valueOf(77.0595))
                .description("A lush green hill station in Kerala adorned with sprawling tea plantations, misty valleys, scenic lakes, and wild waterfalls.")
                .imageUrl("https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop")
                .rating(4.8)
                .tags("Nature, Hill Station, Tea Estates, Scenic")
                .build();

        Destination d4 = Destination.builder()
                .name("Goa")
                .country("India")
                .latitude(BigDecimal.valueOf(15.2993))
                .longitude(BigDecimal.valueOf(74.1240))
                .description("Famous for its white sand beaches, vibrant nightlife, Portuguese heritage churches, delicious sea cuisine, and water sports.")
                .imageUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop")
                .rating(4.7)
                .tags("Beach, Coastal, Nightlife, Heritage")
                .build();

        Destination d5 = Destination.builder()
                .name("Udaipur")
                .country("India")
                .latitude(BigDecimal.valueOf(24.5854))
                .longitude(BigDecimal.valueOf(73.7125))
                .description("Known as the 'City of Lakes' and the 'Venice of the East', Udaipur features romantic palaces, royal Havelis, and Lake Pichola boat cruises.")
                .imageUrl("https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop")
                .rating(4.8)
                .tags("Heritage, Lakes, Romance, Palaces")
                .build();

        Destination d6 = Destination.builder()
                .name("Darjeeling")
                .country("India")
                .latitude(BigDecimal.valueOf(27.0410))
                .longitude(BigDecimal.valueOf(88.2627))
                .description("Famous for its aromatic tea estates, colonial-era Himalayan railway (Toy Train), and sweeping views of Mt. Kanchenjunga.")
                .imageUrl("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop")
                .rating(4.7)
                .tags("Hill Station, Tea Estates, Mountains, Scenic")
                .build();

        Destination d7 = Destination.builder()
                .name("Hampi")
                .country("India")
                .latitude(BigDecimal.valueOf(15.3350))
                .longitude(BigDecimal.valueOf(76.4600))
                .description("A UNESCO World Heritage site consisting of the fascinating ruins of the Vijayanagara Empire, giant boulder terrains, and temples.")
                .imageUrl("https://images.unsplash.com/photo-1600100397608-f010e423b971?q=80&w=600&auto=format&fit=crop")
                .rating(4.9)
                .tags("Historic, Heritage, Temples, Culture")
                .build();

        Destination d8 = Destination.builder()
                .name("Shillong")
                .country("India")
                .latitude(BigDecimal.valueOf(25.5788))
                .longitude(BigDecimal.valueOf(91.8933))
                .description("Known as the 'Scotland of the East', Shillong features pine-covered hills, scenic waterfalls, and unique root bridges nearby in Meghalaya.")
                .imageUrl("https://images.unsplash.com/photo-1571401888144-1273fb874e30?q=80&w=600&auto=format&fit=crop")
                .rating(4.8)
                .tags("Hill Station, Waterfalls, Nature, Scenic")
                .build();

        Destination d9 = Destination.builder()
                .name("Agra (Taj Mahal)")
                .country("India")
                .latitude(BigDecimal.valueOf(27.1751))
                .longitude(BigDecimal.valueOf(78.0421))
                .description("Home to the iconic Taj Mahal, a UNESCO World Wonder representing the pinnacle of Mughal architecture and timeless love.")
                .imageUrl("https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop")
                .rating(4.9)
                .tags("Heritage, Historic, Romance, Monuments")
                .build();

        Destination d10 = Destination.builder()
                .name("Manali")
                .country("India")
                .latitude(BigDecimal.valueOf(32.2396))
                .longitude(BigDecimal.valueOf(77.1887))
                .description("A high-altitude Himalayan resort town known for paragliding, skiing, and trekking in the Solang Valley and Rohtang Pass.")
                .imageUrl("https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop")
                .rating(4.8)
                .tags("Hill Station, Snow, Adventure, Mountains")
                .build();

        destinationRepository.saveAll(Arrays.asList(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10));
    }

    public List<Destination> searchDestinations(String query) {
        if (query == null || query.trim().isEmpty()) {
            return destinationRepository.findAll();
        }
        return destinationRepository.searchDestinations(query);
    }
}
