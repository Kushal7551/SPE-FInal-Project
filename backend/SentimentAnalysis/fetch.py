import requests
import pandas as pd
from datetime import datetime, timedelta

# Your NewsAPI key
api_key = "dbe0bf42faf44f41917591471d452cdf"  # Replace with your NewsAPI key

# Stock symbols and their respective search keywords
stocks = {
    "BLUEDART": "Blue Dart Express",
    "NHPC": "NHPC Limited",
    "ADANIPOWER": "Adani Power"
}

# Calculate date range for the past week
end_date = datetime.now()
start_date = end_date - timedelta(days=7)
start_date_str = start_date.strftime("%Y-%m-%d")
end_date_str = end_date.strftime("%Y-%m-%d")

# Function to fetch headlines for a specific stock
def fetch_headlines(stock, query):
    url = (
        f"https://newsapi.org/v2/everything?q={query}&from={start_date_str}&to={end_date_str}"
        f"&sortBy=relevancy&language=en&apiKey={api_key}"
    )
    response = requests.get(url)
    articles = response.json().get("articles", [])
    headlines = [{"headline": article["title"], "stock": stock} for article in articles]
    return headlines

# Collect headlines for all stocks
all_headlines = []
for stock, query in stocks.items():
    headlines = fetch_headlines(stock, query)
    all_headlines.extend(headlines)

# Convert to DataFrame and save as CSV
df = pd.DataFrame(all_headlines, columns=["headline", "stock"])
df.to_csv("stock_headlines.csv", index=False)

print("Dataset created with headlines for the past week.")
