package com.tripnest.service;

import com.tripnest.entity.Destination;
import com.tripnest.repository.DestinationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import java.util.ArrayList;
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
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
<<<<<<< HEAD
        if (destinationRepository.count() < 10) {
            destinationRepository.deleteAll();

            List<Destination> worldDestinations = List.of(
                // EUROPE
                Destination.builder()
                        .name("Paris").country("France")
                        .description("The City of Light captivates visitors with iconic landmarks like the Eiffel Tower, Louvre Museum, world-class gastronomy, and romantic river cruises.")
                        .imageUrl("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, Arc de Triomphe, Seine River Cruise")
                        .popularLocations("Le Marais, Montmartre, Champs-Élysées, Latin Quarter")
                        .bestTimeToVisit("April to October").rating(4.9).popular(true).build(),

                Destination.builder()
                        .name("Rome").country("Italy")
                        .description("The Eternal City boasts nearly 3,000 years of globally influential art, architecture, ancient ruins, Vatican treasures, and exquisite Italian cuisine.")
                        .imageUrl("https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Colosseum, Vatican Museums, Pantheon, Trevi Fountain, Roman Forum")
                        .popularLocations("Trastevere, Piazza Navona, Spanish Steps, Monti")
                        .bestTimeToVisit("October to April").rating(4.88).popular(true).build(),

                Destination.builder()
                        .name("London").country("United Kingdom")
                        .description("A historic yet trendy global capital where royal palaces, world-class West End theater, iconic red buses, and vibrant street markets collide.")
                        .imageUrl("https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Big Ben, London Eye, Tower Bridge, British Museum, Buckingham Palace")
                        .popularLocations("Soho, Camden Town, Kensington, Covent Garden, Shoreditch")
                        .bestTimeToVisit("May to September").rating(4.85).popular(true).build(),

                Destination.builder()
                        .name("Swiss Alps").country("Switzerland")
                        .description("Majestic alpine mountain ranges offering world-class skiing, scenic glacier trains, crystal-clear lakes, and picturesque mountain villages.")
                        .imageUrl("https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Matterhorn, Jungfraujoch, Lake Geneva, Glacier Express, Rhine Falls")
                        .popularLocations("Zermatt, Interlaken, Grindelwald, St. Moritz, Lucerne")
                        .bestTimeToVisit("December to April (Ski) & June to September (Hiking)").rating(4.95).popular(true).build(),

                Destination.builder()
                        .name("Santorini").country("Greece")
                        .description("Famed island paradise with whitewashed cliffside villages, blue-domed churches, volcanic black beaches, and world-renowned Aegean sunsets.")
                        .imageUrl("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Oia Sunset Viewpoint, Fira Caldera Walk, Red Beach, Akrotiri Ruins, Wine Tasting")
                        .popularLocations("Oia, Fira, Imerovigli, Perissa, Kamari")
                        .bestTimeToVisit("May to October").rating(4.92).popular(true).build(),

                Destination.builder()
                        .name("Barcelona").country("Spain")
                        .description("Catalonia's cosmopolitan seaside city known for Antoni Gaudí's whimsical architecture, lively tapas bars, Mediterranean beaches, and vibrant nightlife.")
                        .imageUrl("https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Sagrada Família, Park Güell, Casa Batlló, Gothic Quarter, La Rambla")
                        .popularLocations("Eixample, El Born, Barceloneta, Gràcia, Montjuïc")
                        .bestTimeToVisit("May to June & September to October").rating(4.87).popular(true).build(),

                Destination.builder()
                        .name("Amsterdam").country("Netherlands")
                        .description("Charming European capital famous for its historic canal network, bicycle culture, gabled townhouses, vibrant flower markets, and world-class museums.")
                        .imageUrl("https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Rijksmuseum, Anne Frank House, Van Gogh Museum, Canal Cruise, Vondelpark")
                        .popularLocations("Jordaan, De Pijp, Museumkwartier, Grachtengordel")
                        .bestTimeToVisit("April to May & September to November").rating(4.82).popular(true).build(),

                Destination.builder()
                        .name("Venice").country("Italy")
                        .description("Romantic water city built on 100+ small islands connected by grand canals, gondolas, marble palaces, and intricate Renaissance bridges.")
                        .imageUrl("https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80")
                        .attractions("St. Mark's Basilica, Doge's Palace, Grand Canal Gondola, Rialto Bridge, Murano Island")
                        .popularLocations("San Marco, Cannaregio, Dorsoduro, Murano, Burano")
                        .bestTimeToVisit("April to May & September to November").rating(4.86).popular(true).build(),

                Destination.builder()
                        .name("Prague").country("Czech Republic")
                        .description("City of a Hundred Spires renowned for its Gothic churches, medieval astronomical clock, cobblestone streets, and fairy-tale castle complex.")
                        .imageUrl("https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Prague Castle, Charles Bridge, Old Town Square, Astronomical Clock, St. Vitus Cathedral")
                        .popularLocations("Old Town (Staré Město), Lesser Town (Malá Strana), Vinohrady")
                        .bestTimeToVisit("May to September").rating(4.83).popular(true).build(),

                Destination.builder()
                        .name("Dubrovnik").country("Croatia")
                        .description("Pearl of the Adriatic surrounded by massive 16th-century stone walls, crystal turquoise sea, Baroque architecture, and dramatic coastal vistas.")
                        .imageUrl("https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80")
                        .attractions("City Walls Walk, Stradun Thoroughfare, Fort Lovrijenac, Cable Car to Mount Srđ")
                        .popularLocations("Old Town, Lapad Peninsula, Ploče, Lokrum Island")
                        .bestTimeToVisit("May to June & September to October").rating(4.89).popular(false).build(),

                // ASIA
                Destination.builder()
                        .name("Tokyo").country("Japan")
                        .description("A futuristic metropolis where ultra-modern skyscrapers meet historic temples, serene gardens, vibrant pop culture, and unmatched culinary experiences.")
                        .imageUrl("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Sensō-ji Temple, Tokyo Skytree, Shibuya Crossing, Meiji Shrine, Tsukiji Outer Market")
                        .popularLocations("Shibuya, Shinjuku, Akihabara, Asakusa, Ginza")
                        .bestTimeToVisit("March to May & September to November").rating(4.95).popular(true).build(),

                Destination.builder()
                        .name("Bali").country("Indonesia")
                        .description("Tropical paradise featuring lush volcanic mountain ranges, iconic rice paddies, serene sea temples, world-class surfing, and spiritual wellness retreats.")
                        .imageUrl("https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Ubud Sacred Monkey Forest, Tanah Lot Temple, Tegallalang Rice Terraces, Mount Batur")
                        .popularLocations("Ubud, Seminyak, Canggu, Uluwatu, Nusa Penida")
                        .bestTimeToVisit("April to October").rating(4.9).popular(true).build(),

                Destination.builder()
                        .name("Kyoto").country("Japan")
                        .description("Cultural heart of Japan adorned with thousands of classical Buddhist temples, traditional wooden machiya houses, geisha districts, and bamboo groves.")
                        .imageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Fushimi Inari Shrine, Arashiyama Bamboo Grove, Kinkaku-ji (Golden Pavilion), Gion District")
                        .popularLocations("Gion, Higashiyama, Arashiyama, Pontocho Alley")
                        .bestTimeToVisit("March to May & October to November").rating(4.94).popular(true).build(),

                Destination.builder()
                        .name("Bangkok").country("Thailand")
                        .description("Exhilarating city known for ornate shrines, bustling street food stalls, riverboat canals, floating markets, and vibrant night markets.")
                        .imageUrl("https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Grand Palace, Wat Arun (Temple of Dawn), Wat Pho (Reclining Buddha), Chatuchak Market")
                        .popularLocations("Khao San Road, Sukhumvit, Silom, Yaowarat (Chinatown)")
                        .bestTimeToVisit("November to February").rating(4.81).popular(true).build(),

                Destination.builder()
                        .name("Singapore").country("Singapore")
                        .description("Sleek global garden city state blending futuristic architecture, lush indoor rainforests, hawker center gastronomy, and luxury shopping.")
                        .imageUrl("https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Gardens by the Bay, Marina Bay Sands SkyPark, Jewel Changi, Sentosa Island")
                        .popularLocations("Marina Bay, Orchard Road, Chinatown, Little India, Clarke Quay")
                        .bestTimeToVisit("February to April").rating(4.91).popular(true).build(),

                Destination.builder()
                        .name("Seoul").country("South Korea")
                        .description("Dynamic mega-city seamlessly fusing royal Joseon Dynasty palaces, cutting-edge K-pop culture, street markets, and high-tech skyscrapers.")
                        .imageUrl("https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Gyeongbokgung Palace, N Seoul Tower, Bukchon Hanok Village, Myeongdong Shopping District")
                        .popularLocations("Hongdae, Gangnam, Itaewon, Insadong, Dongdaemun")
                        .bestTimeToVisit("September to November & March to May").rating(4.88).popular(true).build(),

                Destination.builder()
                        .name("Goa").country("India")
                        .description("India's coastal haven famous for golden sandy beaches, lively nightlife, Portuguese colonial architecture, and fresh seafood dining.")
                        .imageUrl("https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Baga Beach, Fort Aguada, Basilica of Bom Jesus, Dudhsagar Waterfalls")
                        .popularLocations("North Goa, South Goa, Panaji, Anjuna, Palolem")
                        .bestTimeToVisit("November to February").rating(4.75).popular(true).build(),

                Destination.builder()
                        .name("Jaipur").country("India")
                        .description("The Pink City of Rajasthan showcases royal palaces, hill forts, vibrant bazaars, colorful textiles, and rich Rajputana heritage.")
                        .imageUrl("https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Hawa Mahal, Amber Fort, City Palace, Jantar Mantar, Nahargarh Fort")
                        .popularLocations("Johari Bazaar, Pink City Wall, C-Scheme, Amer")
                        .bestTimeToVisit("October to March").rating(4.82).popular(false).build(),

                // AMERICAS
                Destination.builder()
                        .name("New York City").country("United States")
                        .description("The Big Apple offers non-stop energy, Broadway shows, Central Park, world-renowned museums, iconic architecture, and vibrant diverse neighborhoods.")
                        .imageUrl("https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Statue of Liberty, Times Square, Central Park, Empire State Building, Brooklyn Bridge")
                        .popularLocations("Manhattan, Brooklyn, Soho, Greenwich Village, DUMBO")
                        .bestTimeToVisit("September to November & April to June").rating(4.85).popular(true).build(),

                Destination.builder()
                        .name("Rio de Janeiro").country("Brazil")
                        .description("Marvelous coastal city framed by dramatic mountain peaks, Copacabana and Ipanema beaches, samba rhythms, and Christ the Redeemer.")
                        .imageUrl("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Christ the Redeemer, Sugarloaf Mountain, Copacabana Beach, Selarón Steps, Tijuca Forest")
                        .popularLocations("Ipanema, Copacabana, Santa Teresa, Leblon, Lapa")
                        .bestTimeToVisit("December to March").rating(4.84).popular(true).build(),

                Destination.builder()
                        .name("Machu Picchu").country("Peru")
                        .description("Mystical 15th-century Incan citadel set high in the Andes Mountains surrounded by cloud forests, sacred valleys, and ancient hiking trails.")
                        .imageUrl("https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Sun Gate, Huayna Picchu, Sacred Valley, Inca Trail, Temple of the Sun")
                        .popularLocations("Cusco, Aguas Calientes, Ollantaytambo, Urubamba")
                        .bestTimeToVisit("May to October").rating(4.96).popular(true).build(),

                Destination.builder()
                        .name("Vancouver").country("Canada")
                        .description("Scenic West Coast harbor city framed by snow-capped mountains, Pacific ocean waters, expansive urban rainforests, and multicultural dining.")
                        .imageUrl("https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Stanley Park, Capilano Suspension Bridge, Granville Island, Gastown Steam Clock")
                        .popularLocations("Downtown, Gastown, Yaletown, Kitsilano, Robson Street")
                        .bestTimeToVisit("June to September").rating(4.86).popular(false).build(),

                Destination.builder()
                        .name("Cancún & Tulum").country("Mexico")
                        .description("Caribbean coastal paradise of turquoise sea waters, white sand beaches, ancient Mayan ruins, and magical underground cenotes.")
                        .imageUrl("https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Tulum Mayan Ruins, Chichén Itzá, Gran Cenote, Isla Mujeres, Xcaret Park")
                        .popularLocations("Tulum Beach Strip, Hotel Zone Cancún, Playa del Carmen")
                        .bestTimeToVisit("December to April").rating(4.88).popular(true).build(),

                Destination.builder()
                        .name("Honolulu & Hawaii").country("United States")
                        .description("Tropical Pacific island haven with world-class surf, volcanic craters, Polynesian luaus, palm-lined beaches, and lush rainforests.")
                        .imageUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Waikiki Beach, Diamond Head State Monument, Pearl Harbor National Memorial, Hanauma Bay")
                        .popularLocations("Waikiki, North Shore Oahu, Lahaina Maui, Kauai Coast")
                        .bestTimeToVisit("April to May & September to November").rating(4.93).popular(true).build(),

                // MIDDLE EAST & AFRICA
                Destination.builder()
                        .name("Dubai").country("United Arab Emirates")
                        .description("Glitz and glamour desert metropolis famous for ultra-futuristic skyscrapers, man-made islands, luxury shopping, and desert safaris.")
                        .imageUrl("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Burj Khalifa, Dubai Mall & Fountain, Palm Jumeirah, Museum of the Future, Desert Safari")
                        .popularLocations("Downtown Dubai, Dubai Marina, Jumeirah Beach, Deira Souks")
                        .bestTimeToVisit("November to March").rating(4.9).popular(true).build(),

                Destination.builder()
                        .name("Istanbul").country("Turkey")
                        .description("Transcontinental city bridging Europe and Asia across the Bosphorus Strait, rich with Byzantine domes, Ottoman minarets, and spice markets.")
                        .imageUrl("https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus Cruise")
                        .popularLocations("Sultanahmet, Beyoğlu, Karaköy, Taksim Square, Kadıköy")
                        .bestTimeToVisit("April to May & September to November").rating(4.89).popular(true).build(),

                Destination.builder()
                        .name("Cape Town").country("South Africa")
                        .description("Stunning coastal city situated beneath Table Mountain where two oceans meet, surrounded by winelands, penguins, and dramatic sea cliffs.")
                        .imageUrl("https://images.unsplash.com/photo-1580619305218-81442488a0ab?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Table Mountain Aerial Cableway, Cape of Good Hope, Boulders Penguin Beach, Robben Island")
                        .popularLocations("V&A Waterfront, Camps Bay, Bo-Kaap, Constantia Wine Route")
                        .bestTimeToVisit("November to March").rating(4.91).popular(true).build(),

                Destination.builder()
                        .name("Cairo").country("Egypt")
                        .description("Ancient city along the Nile River home to the Great Pyramids of Giza, the Sphinx, millennia of Pharaonic treasures, and Islamic architecture.")
                        .imageUrl("https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Pyramids of Giza & Sphinx, Grand Egyptian Museum, Khan el-Khalili Bazaar, Citadel of Saladin")
                        .popularLocations("Giza, Zamalek, Islamic Cairo, Downtown Cairo")
                        .bestTimeToVisit("October to April").rating(4.83).popular(false).build(),

                Destination.builder()
                        .name("Marrakech").country("Morocco")
                        .description("Enchanting imperial city of labyrinthine souks, terracotta palaces, fragrant spices, peaceful riads, and vibrant street performers.")
                        .imageUrl("https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Jemaa el-Fnaa Square, Jardin Majorelle, Bahia Palace, Koutoubia Mosque, Medina Souks")
                        .popularLocations("Medina, Guéliz, Palmeraie, Kasbah")
                        .bestTimeToVisit("March to May & September to November").rating(4.84).popular(false).build(),

                // OCEANIA & ISLANDS
                Destination.builder()
                        .name("Sydney").country("Australia")
                        .description("Dynamic harbor city famous for the sail-shaped Opera House, dramatic Harbor Bridge, golden Bondi beach, and coastal cliff walks.")
                        .imageUrl("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Sydney Opera House, Sydney Harbour Bridge, Bondi Beach, Darling Harbour, Royal Botanic Garden")
                        .popularLocations("The Rocks, Bondi, Manly, Surry Hills, Darlinghurst")
                        .bestTimeToVisit("September to November & February to April").rating(4.91).popular(true).build(),

                Destination.builder()
                        .name("Maldives").country("Maldives")
                        .description("Tropical archipelago in the Indian Ocean boasting iconic overwater bungalows, translucent blue lagoons, vibrant coral reefs, and pristine luxury.")
                        .imageUrl("https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Overwater Bungalow Villa Stay, Snorkeling with Manta Rays, Coral Reef Diving, Sunset Cruises")
                        .popularLocations("North Malé Atoll, South Ari Atoll, Baa Atoll, Maafushi")
                        .bestTimeToVisit("November to April").rating(4.97).popular(true).build(),

                Destination.builder()
                        .name("Queenstown").country("New Zealand")
                        .description("Adventure capital of the world set on Lake Wakatipu backed by The Remarkables mountain range, famous for bungee jumping, jet boating, and wine.")
                        .imageUrl("https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Milford Sound Cruise, Skyline Gondola, Lake Wakatipu, Shotover Jet Boat, Arrowtown")
                        .popularLocations("Town Centre, Frankton, Lake Hayes, Gibbston Valley")
                        .bestTimeToVisit("December to February (Summer) & June to August (Winter)").rating(4.94).popular(true).build(),

                Destination.builder()
                        .name("Reykjavik").country("Iceland")
                        .description("Gateway to Iceland's dramatic volcanic landscapes, geothermal Blue Lagoon, cascading waterfalls, black sand beaches, and Northern Lights.")
                        .imageUrl("https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Blue Lagoon Geothermal Spa, Hallgrímskirkja Church, Golden Circle Tour, Northern Lights Safari")
                        .popularLocations("Downtown Reykjavik, Grandi Harbour, Laugavegur Street")
                        .bestTimeToVisit("September to March (Northern Lights) & June to August (Midnight Sun)").rating(4.93).popular(true).build(),

                Destination.builder()
                        .name("Bora Bora").country("French Polynesia")
                        .description("Exclusive South Pacific island famous for Mount Otemanu rising above turquoise lagoons, overwater bungalows, and coral reef sanctuaries.")
                        .imageUrl("https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&w=1200&q=80")
                        .attractions("Mount Otemanu, Coral Gardens Lagoon Snorkeling, Matira Beach, Shark & Ray Safari")
                        .popularLocations("Motu Tapu, Matira Point, Vaitape")
                        .bestTimeToVisit("May to October").rating(4.98).popular(true).build()
            );

            destinationRepository.saveAll(worldDestinations);
=======
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
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        }
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id)
<<<<<<< HEAD
                .orElseGet(() -> getOrCreateDefaultByName("Destination #" + id));
=======
                .orElseThrow(() -> new RuntimeException("Destination not found"));
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    }

    public List<Destination> searchDestinations(String query) {
        if (query == null || query.isBlank()) {
            return destinationRepository.findAll();
        }
<<<<<<< HEAD
        List<Destination> results = destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(query, query);
        if (results.isEmpty()) {
            // Dynamic world place name generator if not in database!
            Destination customPlace = getOrCreateDefaultByName(query.trim());
            results = List.of(customPlace);
        }
        return results;
    }

    public Destination getOrCreateDefaultByName(String name) {
        return destinationRepository.findAll().stream()
                .filter(d -> d.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    Destination generated = Destination.builder()
                            .name(capitalize(name))
                            .country("Global Destination")
                            .description(capitalize(name) + " is a captivating travel destination offering unique cultural experiences, scenic sights, local dining, and memorable adventures.")
                            .imageUrl("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80")
                            .attractions("Historical Landmarks, Scenic Viewpoints, Local Markets, Cultural Museums")
                            .popularLocations("City Center, Waterfront Promenade, Old Town District")
                            .bestTimeToVisit("Year-round")
                            .rating(4.8)
                            .popular(false)
                            .build();
                    return destinationRepository.save(generated);
                });
    }

    private String capitalize(String str) {
        if (str == null || str.isBlank()) return str;
        return Character.toUpperCase(str.charAt(0)) + str.substring(1);
=======
        return destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(query, query);
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    }
}
