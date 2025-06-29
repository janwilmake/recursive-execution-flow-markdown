# Weather-Based Travel Advisor

**Input:** Destination city name and travel date range

Analyze weather conditions and provide comprehensive travel recommendations including what to pack and best activities.

> # Weather Forecast Analysis
>
> **Input:** City name and date range for travel planning
>
> Retrieve detailed weather forecast to understand conditions during the travel period.
>
> **Tool:** https://api.openweathermap.org/data/2.5/forecast
>
> > # Current Weather Check
> >
> > **Input:** City coordinates from forecast API
> >
> > Get current weather conditions to complement the forecast data.
> >
> > **Tool:** https://api.openweathermap.org/data/2.5/weather
> >
> > **Output:** Current temperature, humidity, wind conditions, and weather description

> # Location Information Lookup
>
> **Input:** Destination city name for geographic context
>
> Gather comprehensive location data including timezone, population, and geographic details.
>
> **Tool:** https://restcountries.com/v3.1/capital/{city}
>
> **Output:** Country information, timezone, currency, and regional details

> # Travel Recommendations Engine
>
> **Input:** Weather forecast data, location details, and travel preferences
>
> Generate personalized recommendations based on weather conditions and destination characteristics.
>
> > # Packing List Generator
> >
> > **Input:** Weather forecast and activity preferences
> >
> > Create customized packing recommendations based on expected weather conditions.
> >
> > **Output:** Detailed packing checklist with weather-specific items
>
> > # Activity Suggestions
> >
> > **Input:** Weather conditions and location type
> >
> > Suggest appropriate activities based on forecasted weather and destination features.
> >
> > **Output:** Indoor and outdoor activity recommendations with weather considerations

**Output:** Complete travel advisory with weather forecast, packing recommendations, activity suggestions, and location insights