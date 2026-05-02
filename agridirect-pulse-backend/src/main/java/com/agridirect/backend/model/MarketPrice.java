package com.agridirect.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "market_prices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarketPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Database fields from schema
    private String commodity;
    private String mandiName;
    private String state;
    private BigDecimal modalPrice;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Instant recordedAt;

    // Legacy fields for controller compatibility
    private String crop;
    private String district;
    private double price;
    private double change;
}
