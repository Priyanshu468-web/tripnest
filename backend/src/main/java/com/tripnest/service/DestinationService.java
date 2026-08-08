package com.tripnest.service;

import com.tripnest.entity.Destination;
import com.tripnest.repository.DestinationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @PostConstruct
    public void seedDestinations() {
        if (destinationRepository.count() == 0) {
            List<Destination> defaults = List.of(
                    Destination.builder()
                            .name("Paris")
                            .country("France")
                            .description("The City of Light offers world-class art, culinary experiences, historical monuments, and romantic river cruises.")
                            .imageUrl("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, Arc de Triomphe, Seine River Cruise")
                            .popularLocations("Le Marais, Montmartre, Champs-Élysées, Latin Quarter")
                            .bestTimeToVisit("June to August & September to October")
                            .rating(4.8)
                            .build(),
                    Destination.builder()
                            .name("Bali")
                            .country("Indonesia")
                            .description("Tropical paradise featuring lush volcanic mountain ranges, iconic rice paddies, serene beaches, and vibrant spiritual culture.")
                            .imageUrl("https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Ubud Monkey Forest, Tanot Lot Temple, Tegallalang Rice Terraces, Mount Batur Volcano")
                            .popularLocations("Ubud, Seminyak, Canggu, Uluwatu, Nusa Penida")
                            .bestTimeToVisit("April to October")
                            .rating(4.9)
                            .build(),
                    Destination.builder()
                            .name("Tokyo")
                            .country("Japan")
                            .description("A breathtaking blend of ultra-modern skyscrapers, futuristic neon signs, historic Shinto shrines, and world-famous cuisine.")
                            .imageUrl("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Sensō-ji Temple, Tokyo Skytree, Shibuya Crossing, Meiji Shrine, Tsukiji Outer Market")
                            .popularLocations("Shibuya, Shinjuku, Akihabara, Asakusa, Ginza")
                            .bestTimeToVisit("March to May & September to November")
                            .rating(4.9)
                            .build(),
                    Destination.builder()
                            .name("Rome")
                            .country("Italy")
                            .description("The Eternal City packed with nearly 3,000 years of globally influential art, architecture, and ancient ruins.")
                            .imageUrl("https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Colosseum, Vatican Museums, St. Peter's Basilica, Trevi Fountain, Pantheon")
                            .popularLocations("Trastevere, Piazza Navona, Spanish Steps, Centro Storico")
                            .bestTimeToVisit("October to April")
                            .rating(4.7)
                            .build(),
                    Destination.builder()
                            .name("Goa")
                            .country("India")
                            .description("India's coastal haven famous for golden sandy beaches, lively nightlife, Portuguese heritage, and seafood cuisine.")
                            .imageUrl("https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Baga Beach, Fort Aguada, Basilica of Bom Jesus, Dudhsagar Waterfalls")
                            .popularLocations("North Goa, South Goa, Panaji, Anjuna, Palolem")
                            .bestTimeToVisit("November to February")
                            .rating(4.6)
                            .build(),
                    Destination.builder()
                            .name("New York")
                            .country("United States")
                            .description("The City That Never Sleeps features iconic architecture, Broadway theater, Central Park, and unparalleled energy.")
                            .imageUrl("https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Statue of Liberty, Central Park, Empire State Building, Times Square, Brooklyn Bridge")
                            .popularLocations("Manhattan, Brooklyn, Soho, Greenwich Village")
                            .bestTimeToVisit("September to November & April to June")
                            .rating(4.8)
                            .build()
            );

            destinationRepository.saveAll(defaults);
        }
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    public List<Destination> searchDestinations(String query) {
        if (query == null || query.isBlank()) {
            return destinationRepository.findAll();
        }
        return destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(query, query);
    }
}
