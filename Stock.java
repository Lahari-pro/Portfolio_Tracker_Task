package com.portfolio.tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stock_track")

public class Stock 
{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="stock_seq")
	@SequenceGenerator(name="stock_req", sequenceName="stock_track_seq", allocationSize=1)
	private Long id;
	
	@Column(name = "stock_name", nullable=false)
	private String stockName;
	
	@Column(name="ticker", nullable=false, unique=true)
	private String ticker;
	
	@Column(name="quantity", nullable=false)
	private int quantity;
	
	@Column(name="buy_price", nullable=false)
	private double buyPrice;
	
	
	public void setId(Long id) {
		this.id=id;
	}
	
	public Long getId()
	{
		return id;
	}
	
	public void setStockName(String stockName) 
	{
		this.stockName=stockName;
	}
	
	public String getStockName() {
		return stockName;
	}
	
	public void setTicker(String ticker)
	{
		this.ticker=ticker;
	}
	public String getTicker()
	{
		return ticker;
	}
	public void setQuantity(int quantity)
	{
		this.quantity=quantity;
	}
	
	public int getQuantity()
	{
		return quantity;
	}
	
	public void setBuyPrice(double buyPrice)
	{
		this.buyPrice=buyPrice;
	}
	
	public double getBuyPrice()
	{
		return buyPrice;
	}
}
