package com.agridirect.backend.service;

import com.agridirect.backend.model.MarketPrice;
import org.springframework.stereotype.Service;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarketPriceService {

    private final List<MarketPrice> mockDatabase = Arrays.asList(
            createMockPrice("wheat", "Mumbai", 2450.0, 5.0),
            createMockPrice("wheat", "Delhi", 2400.0, -2.0),
            createMockPrice("rice", "Mumbai", 3200.0, 10.0),
            createMockPrice("tomato", "Punjab", 1500.0, -50.0));

    private MarketPrice createMockPrice(String crop, String district, double price, double change) {
        MarketPrice mp = new MarketPrice();
        mp.setCrop(crop);
        mp.setCommodity(crop);
        mp.setDistrict(district);
        mp.setPrice(price);
        mp.setChange(change);
        return mp;
    }

    public List<MarketPrice> getLatestPrices(String commodity, String district) {
        // Simulate a small delay for DB/Network
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return mockDatabase.stream()
                .filter(p -> p.getCrop().equalsIgnoreCase(commodity))
                .filter(p -> district == null || district.isEmpty() || p.getDistrict().equalsIgnoreCase(district))
                .collect(Collectors.toList());
    }
}
