package com.tripnest.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${OPENWEATHER_API_KEY:}")
    private String openWeatherApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getWeatherForDestination(String destination) {
        if (openWeatherApiKey != null && !openWeatherApiKey.trim().isEmpty() && !openWeatherApiKey.equals("YOUR_OPENWEATHER_API_KEY")) {
            try {
                String url = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&appid=%s", destination, openWeatherApiKey);
                Map response = restTemplate.getForObject(url, Map.class);
                if (response != null && response.containsKey("main")) {
                    Map main = (Map) response.get("main");
                    List weatherList = (List) response.get("weather");
                    Map weatherFirst = weatherList != null && !weatherList.isEmpty() ? (Map) weatherList.get(0) : Map.of();

                    Map<String, Object> result = new HashMap<>();
                    result.put("city", destination);
                    result.put("temp", main.get("temp"));
                    result.put("feelsLike", main.get("feels_like"));
                    result.put("humidity", main.get("humidity"));
                    result.put("condition", weatherFirst.get("main"));
                    result.put("description", weatherFirst.get("description"));
                    result.put("icon", weatherFirst.get("icon"));
                    result.put("isLive", true);
                    return result;
                }
            } catch (Exception e) {
                // Fallback to mock data if API call fails
            }
        }

        return getMockWeather(destination);
    }

    private Map<String, Object> getMockWeather(String destination) {
        String destLower = destination.toLowerCase();
        int temp = 22;
        String condition = "Sunny";
        String description = "Clear skies with light breeze";

        if (destLower.contains("tokyo") || destLower.contains("paris") || destLower.contains("rome")) {
            temp = 24;
            condition = "Pleasant";
            description = "Partly cloudy with pleasant temperatures";
        } else if (destLower.contains("bali") || destLower.contains("tropical")) {
            temp = 29;
            condition = "Tropical Warmth";
            description = "Warm and sunny with light coastal breeze";
        } else if (destLower.contains("swiss") || destLower.contains("snow") || destLower.contains("alps")) {
            temp = 8;
            condition = "Cool Alpine";
            description = "Crisp mountain air with clear blue skies";
        }

        Map<String, Object> mock = new HashMap<>();
        mock.put("city", destination);
        mock.put("temp", temp);
        mock.put("feelsLike", temp + 1);
        mock.put("humidity", 58);
        mock.put("condition", condition);
        mock.put("description", description);
        mock.put("icon", "01d");
        mock.put("isLive", false);
        return mock;
    }
}
