package com.agridirect.backend.repository;

import com.agridirect.backend.model.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long> {

    // Use read replica for historical price queries (heavy SELECT)
    @Query(value = "SELECT * FROM market_prices WHERE commodity = :commodity ORDER BY recorded_at DESC LIMIT 100", nativeQuery = true)
    List<MarketPrice> findTop100ByCommodityOrderByRecordedAtDesc(String commodity);
}
