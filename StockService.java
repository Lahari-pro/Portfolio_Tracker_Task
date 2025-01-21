package com.portfolio.tracker.service;

import com.portfolio.tracker.model.Stock;
import com.portfolio.tracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService 
{
	@Autowired
	private StockRepository stockRepository;
	
	public List<Stock> getAllStocks(){
		return stockRepository.findAll();
	}
	
	public Stock addStock(Stock stock) {
		return stockRepository.save(stock);
	}
	
	public Stock updateStock(Long id, Stock stockDetails)
	{
		Stock stock = stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Sorry!...Stock not found in the given data.."));
		stock.setStockName(stockDetails.getStockName());
		stock.setTicker(stockDetails.getTicker());
		stock.setQuantity(stockDetails.getQuantity());
		stock.setBuyPrice(stockDetails.getBuyPrice());
		return stockRepository.save(stock);
		
	}
	
	public void deleteStock(Long id)
	{
		stockRepository.deleteById(id);
	}
}
