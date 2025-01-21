const stockForm = document.getElementById('stockForm');
const holdingsTable = document.getElementById('holdingsTable');
const totalValueElement = document.getElementById('totalValue');
const topStockElement = document.getElementById('topStock');
const distributionChartElement = document.getElementById('distributionChart')

let portfolio = [];

function updateDashboard()
{
	let totalValue = 0;
	let topStock = { name: '', value: 0 };
	const distribution = {};

  portfolio.forEach(stock => {
	const stockValue = stock.quantity * stock.buyPrice;
	totalValue += stockValue;
	
	if(stockValue > topStock.value)
		{
			topStock = { name: stock.stockName, value: stockValue };
		}
		distribution[stock.stockName] = stockValue;
  });

  totalValueElement.textContent = `$${totalValue.toFixed(2)}`;
  topStockElement.textContent = topStock.name || '-';
  
  renderDistributionChart(distribution);
}

function renderDistributionChart(distribution)
{
	const labels = Object.keys(distribution);
	const data = Object.values(distribution);
	
	if(window.distributionChart)
		{
			window.distributionChart.destroy();
		}
		
	window.distributionChart = new Chart(distributionChartElement, {
		type: 'pie',
		data: {
			labels,
			datasets:[{
			data,
			backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#f44336']
			}]
		}
	});
}

function renderTable()
{
	holdingsTable.innerHTML = '';
	
	portfolio.forEach((stock, index) => {
		const row = document.createElement('tr');
		
		row.innerHTML = `
		<td>${stock.stockName}</td>
		<td>${stock.ticker}</td>
		<td>${stock.quantity}</td>
		<td>$${stock.buyPrice.toFixed(2)}</td>
		<td>
			<button onclick="editStock(${index})">Edit Stock</button>
			<button onclick="deleteStock(${index})">Delete Stock</button>
		</td>
		`;
		holdingsTable.appendChild(row);
		
	});
	updateDashboard();
}

async function addOrUpdateStock(event)
{
	event.preventDefault();
	
	const stockName = stockForm.stockName.value.trim();
	const ticker = stockForm.ticker.value.trim();
	const quantity = parseFloat(stockForm.quantity.value.trim());
	const buyPrice = parseFloat(stockForm.buyPrice.value.trim());
	
	if(!stockName || !ticker || isNaN(quantity) || isNaN(buyPrice))
		{
			alert("All fields are required..");
			return;
		}
		
		const stock = {stockName, ticker, quantity, buyPrice};
		
		try
		{
			const response = await fetch('http://localhost:8082/api/stock', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(stock),
			});
			
		if(!response.ok)
			{
				throw new Error('Failed to save the stock......');
			}
		loadPortfolio();
		}
		catch(error)
		{
			console.error('Error adding stock:', error);
		}
		stockForm.reset();
}


async function loadPortfolio()
{
	try{
		const response = await fetch('http://localhost:8082/api/stock');
		if(!response.ok)
			{
				throw new Error('Failed to fetch stock...');
			}
			portfolio = await response.json();
			renderTable();
	}
	catch(error)
	{
		console.error('Error fetching portfolio:', error);
	}
}

async function updateStock(index)
{
	const stock = portfolio[index];
	const updatedStock = {
		stockName: stockForm.stockName.value,
		ticker: stockForm.ticker.value,
		quantity: parseFloat(stockForm.quantity.value),
		buyPrice: parseFloat(stockForm.buyPrice.value)
	};
	
	try{
		const response = await fetch(`http://localhost:8082/api/stock/${stock.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedStock),
		});
		
		if(!response.ok)
			{
				throw new Error('Failed to update stock...');
			}
			
			loadPortfolio();
		}
		catch(error)
		{
			console.error('Error updating stock:', error);
		}
	}
	
	function editStock(index)
	{
		const stock = portfolio[index];
		stockForm.stockName.value = stock.stockName;
		stockForm.ticker.value = stock.ticker;
		stockForm.quantity.value = stock.quantity;
		stockForm.buyPrice.value = stock.buyPrice;
		stockForm.addEventListener('submit', function updateForm(event)
	{
		event.preventDefault();
		updateStock(index);
		stockForm.removeEventListener('submit', updateForm);
	});
	}
	
async function deleteStock(index)
{
	const stock = portfolio[index];
	if(!stock) return;
	
	try{
		const response = await fetch(`http://localhost:8082/api/stock/${stock.id}`, {
			method: 'DELETE',
		});
		
		if(!response.ok)
			{
				throw new Error('Failed to delete stock...');
			}
			
		portfolio.splice(index, 1);
		renderTable();
	  }
	  catch(error)
	  {
		console.error('Error deleting stock:', error);
	  }
	}
document.addEventListener('DOMContentLoaded', loadPortfolio);
stockForm.addEventListener('submit', addOrUpdateStock);
