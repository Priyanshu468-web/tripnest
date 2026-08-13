package com.tripnest.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String country;

    @Column(length = 2000)
    private String description;

    private String imageUrl;

    @Column(length = 1500)
    private String attractions;

    @Column(length = 1500)
    private String popularLocations;

    private String bestTimeToVisit;

    private Double rating;

    private Boolean popular;

    public Destination() {}

    public Destination(Long id, String name, String country, String description, String imageUrl, String attractions, String popularLocations, String bestTimeToVisit, Double rating, Boolean popular) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.description = description;
        this.imageUrl = imageUrl;
        this.attractions = attractions;
        this.popularLocations = popularLocations;
        this.bestTimeToVisit = bestTimeToVisit;
        this.rating = rating;
        this.popular = popular;
    }

    @PrePersist
    protected void onCreate() {
        if (popular == null) popular = true;
        if (rating == null) rating = 4.8;
    }

    public static DestinationBuilder builder() { return new DestinationBuilder(); }

    public static class DestinationBuilder {
        private Long id;
        private String name;
        private String country;
        private String description;
        private String imageUrl;
        private String attractions;
        private String popularLocations;
        private String bestTimeToVisit;
        private Double rating;
        private Boolean popular;

        public DestinationBuilder id(Long id) { this.id = id; return this; }
        public DestinationBuilder name(String name) { this.name = name; return this; }
        public DestinationBuilder country(String country) { this.country = country; return this; }
        public DestinationBuilder description(String description) { this.description = description; return this; }
        public DestinationBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public DestinationBuilder attractions(String attractions) { this.attractions = attractions; return this; }
        public DestinationBuilder popularLocations(String popularLocations) { this.popularLocations = popularLocations; return this; }
        public DestinationBuilder bestTimeToVisit(String bestTimeToVisit) { this.bestTimeToVisit = bestTimeToVisit; return this; }
        public DestinationBuilder rating(Double rating) { this.rating = rating; return this; }
        public DestinationBuilder popular(Boolean popular) { this.popular = popular; return this; }

        public Destination build() {
            return new Destination(id, name, country, description, imageUrl, attractions, popularLocations, bestTimeToVisit, rating, popular);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getAttractions() { return attractions; }
    public void setAttractions(String attractions) { this.attractions = attractions; }

    public String getPopularLocations() { return popularLocations; }
    public void setPopularLocations(String popularLocations) { this.popularLocations = popularLocations; }

    public String getBestTimeToVisit() { return bestTimeToVisit; }
    public void setBestTimeToVisit(String bestTimeToVisit) { this.bestTimeToVisit = bestTimeToVisit; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Boolean getPopular() { return popular; }
    public void setPopular(Boolean popular) { this.popular = popular; }
}
