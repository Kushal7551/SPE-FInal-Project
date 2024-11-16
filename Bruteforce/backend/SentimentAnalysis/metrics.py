# !pip install finnhub-python
import finnhub
import pandas as pd

# Setup client
finnhub_client = finnhub.Client(api_key="csr07opr01qhtrfmt0o0csr07opr01qhtrfmt0og")

# List of stock symbols
stock_symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA']

# Initialize an empty list to store results
data_list = []

# Iterate through stock symbols
for stock_name in stock_symbols:
    try:
        # Fetch basic financials for each stock
        data = finnhub_client.company_basic_financials(stock_name, 'all')

        # Extract required metrics
        required_metrics = {
            'stock_name': stock_name,
            'pe': data['metric'].get('peAnnual'),
            'pb': data['metric'].get('pbAnnual'),
            'net_profit_margin': data['metric'].get('netProfitMarginAnnual'),
            'roe': data['metric'].get('roeRfy'),
            'debt_to_equity': data['metric'].get('totalDebt/totalEquityAnnual'),
            'beta': data['metric'].get('beta')
        }

        # Append the metrics to the list
        data_list.append(required_metrics)

    except Exception as e:
        print(f"Error retrieving data for {stock_name}: {e}")

# Create a DataFrame from the list of dictionaries
df = pd.DataFrame(data_list)
df.to_csv('stock_metrics.csv', index=False)