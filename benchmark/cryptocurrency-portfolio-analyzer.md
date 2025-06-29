# Cryptocurrency Portfolio Analysis and Insights

**Input:** List of cryptocurrency holdings with quantities and purchase prices

Analyze cryptocurrency portfolio performance and provide market insights for investment decisions.

> # Current Market Data Service
>
> **Input:** List of cryptocurrency symbols from user portfolio
>
> Retrieve real-time price data and market information for portfolio cryptocurrencies.
>
> **Tool:** https://api.coingecko.com/api/v3/simple/price
>
> > # Detailed Coin Information
> >
> > **Input:** Specific cryptocurrency IDs for comprehensive analysis
> >
> > Get detailed market data including market cap, volume, and price changes.
> >
> > **Tool:** https://api.coingecko.com/api/v3/coins/{id}
> >
> > **Output:** Comprehensive coin data with market metrics, price history, and community statistics
>
> > # Historical Price Analysis
> >
> > **Input:** Cryptocurrency ID and date range for trend analysis
> >
> > Retrieve historical price data to analyze performance trends.
> >
> > **Tool:** https://api.coingecko.com/api/v3/coins/{id}/market_chart
> >
> > **Output:** Historical price, market cap, and volume data for trend analysis

> # Portfolio Performance Calculator
>
> **Input:** Current prices, historical data, and user's purchase information
>
> Calculate portfolio performance metrics and provide investment insights.
>
> > # Profit/Loss Analysis
> >
> > **Input:** Purchase prices, quantities, and current market values
> >
> > Calculate individual coin and total portfolio profit/loss metrics.
> >
> > **Output:** Absolute and percentage gains/losses per coin and total portfolio
>
> > # Risk Assessment
> >
> > **Input:** Portfolio composition and market volatility data
> >
> > Analyze portfolio risk based on market volatility and diversification.
> >
> > **Output:** Risk score, diversification analysis, and volatility metrics

> # Market Trend Analysis
>
> **Input:** Global cryptocurrency market data and portfolio holdings
>
> Analyze broader market trends that might affect portfolio performance.
>
> **Tool:** https://api.coingecko.com/api/v3/global
>
> > # Market Sentiment Indicators
> >
> > **Input:** Global market data and individual coin performance
> >
> > Assess market sentiment and its potential impact on portfolio.
> >
> > **Output:** Market sentiment score, trend indicators, and correlation analysis
>
> > # Investment Recommendations
> >
> > **Input:** Portfolio analysis results and market trend data
> >
> > Generate actionable investment recommendations based on analysis.
> >
> > **Output:** Buy/hold/sell recommendations with reasoning and risk considerations

**Output:** Comprehensive portfolio analysis with current valuations, performance metrics, risk assessment, market insights, and personalized investment recommendations