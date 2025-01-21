package com.portfolio.tracker.controller;

import com.portfolio.tracker.model.Stock;
import com.portfolio.tracker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/stock")
@CrossOrigin(origins="http://localhost:8082")

public class StockTrackingController 
{

		@Autowired
		private StockService stockService;
		
		@GetMapping
		public List<Stock> getAllStocks()
		{
			return stockService.getAllStocks();
		}
		
		@PostMapping
		public Stock addStock(@RequestBody Stock stock)
		{
			return stockService.addStock(stock);
		}
		
		@PutMapping("/{id}")
		public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock)
		{
			return stockService.updateStock(id,  stock);
		}
		
		@DeleteMapping("/{id}")
		public void deleteStock(@PathVariable Long id)
		{
			stockService.deleteStock(id);
		}
}
