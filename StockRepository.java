package com.portfolio.tracker.repository;

import com.portfolio.tracker.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StockRepository extends JpaRepository<Stock, Long>
{

}
