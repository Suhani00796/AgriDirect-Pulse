package com.agridirect.backend.controller;

import com.agridirect.backend.model.MarketPrice;
import com.agridirect.backend.service.MarketPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/prices")
@CrossOrigin(origins = "http://localhost:5173") // Vite default port
public class MarketPriceController {

    @Autowired 
    private MarketPriceService priceService;

    @GetMapping
    @Cacheable(value = "prices", key = "#commodity + #district")
    public ResponseEntity<List<MarketPrice>> getPrices(
            @RequestParam String commodity,
            @RequestParam(required = false) String district) {
            
        List<MarketPrice> prices = priceService.getLatestPrices(commodity, district);
        return ResponseEntity.ok(prices); // 200 OK + JSON array
    }
}
