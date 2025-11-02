# Weather Proxy API Documentation

Complete API reference for the Weather Proxy service.

## Base URL

```
http://localhost:3000
```

## Interactive Documentation

Swagger UI is available at: **http://localhost:3000/api/docs**

---

## Endpoints

### 1. Get Weather by City

Fetch current weather information for a specified city.

**Endpoint:** `GET /api/weather`

**Query Parameters:**

| Parameter | Type   | Required | Description                    | Example |
|-----------|--------|----------|--------------------------------|---------|
| city      | string | Yes      | Name of the city               | London  |

**Request Example:**

```bash
GET http://localhost:3000/api/weather?city=London
```

**Success Response (200 OK):**

```json
{
  "city": "London",
  "temperature": 15.5,
  "condition": "Clouds",
  "description": "scattered clouds",
  "humidity": 72,
  "windSpeed": 4.5,
  "country": "GB",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response Fields:**

| Field       | Type   | Description                           |
|-------------|--------|---------------------------------------|
| city        | string | City name                             |
| temperature | number | Temperature in Celsius                |
| condition   | string | Main weather condition                |
| description | string | Detailed weather description          |
| humidity    | number | Humidity percentage (0-100)           |
| windSpeed   | number | Wind speed in meters per second       |
| country     | string | Country code (ISO 3166-1 alpha-2)     |
| timestamp   | string | ISO 8601 timestamp of the request     |

**Error Responses:**

**404 Not Found** - City not found
```json
{
  "statusCode": 404,
  "message": "City \"InvalidCity\" not found"
}
```

**500 Internal Server Error** - API key not configured
```json
{
  "statusCode": 500,
  "message": "OpenWeatherMap API key is not configured. Please set OPENWEATHER_API_KEY in .env file"
}
```

**401 Unauthorized** - Invalid API key
```json
{
  "statusCode": 401,
  "message": "Invalid API key"
}
```

---

### 2. Get Weather Search History

Retrieve the history of all weather searches stored in the database.

**Endpoint:** `GET /api/weather/history`

**Query Parameters:** None

**Request Example:**

```bash
GET http://localhost:3000/api/weather/history
```

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "city": "London",
    "temperature": 15.5,
    "condition": "Clouds",
    "description": "scattered clouds",
    "humidity": 72,
    "windSpeed": 4.5,
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "city": "Tokyo",
    "temperature": 22.3,
    "condition": "Clear",
    "description": "clear sky",
    "humidity": 45,
    "windSpeed": 3.2,
    "timestamp": "2024-01-15T10:25:00.000Z"
  }
]
```

**Response Fields:**

| Field       | Type   | Description                           |
|-------------|--------|---------------------------------------|
| id          | number | Unique identifier for the log entry   |
| city        | string | City name                             |
| temperature | number | Temperature in Celsius                |
| condition   | string | Main weather condition                |
| description | string | Detailed weather description          |
| humidity    | number | Humidity percentage                   |
| windSpeed   | number | Wind speed in meters per second       |
| timestamp   | string | ISO 8601 timestamp of the search      |

**Notes:**
- Returns the last 50 search records
- Ordered by timestamp (most recent first)
- Empty array `[]` if no history exists

---

### 3. Clear Weather Search History

Delete all weather search history from the database.

**Endpoint:** `DELETE /api/weather/history`

**Query Parameters:** None

**Request Example:**

```bash
DELETE http://localhost:3000/api/weather/history
```

**Success Response (200 OK):**

```json
{
  "message": "Weather history cleared successfully",
  "deletedCount": 15
}
```

**Response Fields:**

| Field        | Type   | Description                              |
|--------------|--------|------------------------------------------|
| message      | string | Success message                          |
| deletedCount | number | Number of records deleted from database  |

---

## Using the API

### cURL Examples

**Get Weather:**
```bash
curl "http://localhost:3000/api/weather?city=London"
```

**Get History:**
```bash
curl "http://localhost:3000/api/weather/history"
```

**Clear History:**
```bash
curl -X DELETE "http://localhost:3000/api/weather/history"
```

### JavaScript/Axios Examples

**Get Weather:**
```javascript
const axios = require('axios');

axios.get('http://localhost:3000/api/weather', {
  params: { city: 'London' }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});
```

**Get History:**
```javascript
axios.get('http://localhost:3000/api/weather/history')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
```

**Clear History:**
```javascript
axios.delete('http://localhost:3000/api/weather/history')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
```

### Python/Requests Examples

**Get Weather:**
```python
import requests

response = requests.get(
    'http://localhost:3000/api/weather',
    params={'city': 'London'}
)
print(response.json())
```

**Get History:**
```python
response = requests.get('http://localhost:3000/api/weather/history')
print(response.json())
```

**Clear History:**
```python
response = requests.delete('http://localhost:3000/api/weather/history')
print(response.json())
```

---

## Weather Conditions

The API returns various weather conditions from OpenWeatherMap:

| Condition    | Description                          |
|--------------|--------------------------------------|
| Clear        | Clear sky                            |
| Clouds       | Cloudy weather                       |
| Rain         | Rainy weather                        |
| Drizzle      | Light rain                           |
| Thunderstorm | Thunderstorm                         |
| Snow         | Snowy weather                        |
| Mist         | Misty conditions                     |
| Smoke        | Smoke in the air                     |
| Haze         | Hazy conditions                      |
| Dust         | Dusty conditions                     |
| Fog          | Foggy weather                        |
| Sand         | Sand/dust whirls                     |
| Ash          | Volcanic ash                         |
| Squall       | Squalls                              |
| Tornado      | Tornado                              |

---

## Rate Limiting

- OpenWeatherMap free tier: 60 calls/minute, 1,000,000 calls/month
- No rate limiting implemented on the proxy API itself
- Consider implementing rate limiting for production use

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3001` (Frontend)
- `http://localhost:3000` (Same origin)

To add more origins, modify `main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:3001', 'http://your-domain.com'],
  credentials: true,
});
```

---

## Database Schema

### weather_logs Table

```sql
CREATE TABLE weather_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT NOT NULL,
  temperature REAL NOT NULL,
  condition TEXT NOT NULL,
  description TEXT,
  humidity INTEGER,
  windSpeed REAL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Error Handling

All errors follow this format:

```json
{
  "statusCode": 404,
  "message": "Error message here",
  "error": "Not Found"
}
```

**Common HTTP Status Codes:**

| Code | Meaning                | When it occurs                          |
|------|------------------------|-----------------------------------------|
| 200  | OK                     | Successful request                      |
| 400  | Bad Request            | Missing or invalid parameters           |
| 401  | Unauthorized           | Invalid API key                         |
| 404  | Not Found              | City not found                          |
| 500  | Internal Server Error  | Server error or API key not configured  |

---

## Testing with Swagger UI

1. Navigate to http://localhost:3000/api/docs
2. Click on any endpoint to expand it
3. Click "Try it out"
4. Fill in the required parameters
5. Click "Execute"
6. View the response below

---

## Best Practices

1. **Cache Results**: Consider caching weather data to reduce API calls
2. **Error Handling**: Always handle errors gracefully in your client
3. **Validation**: Validate city names before making requests
4. **Rate Limiting**: Implement rate limiting for production
5. **API Key Security**: Never expose your API key in client-side code

---

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Consult OpenWeatherMap documentation: https://openweathermap.org/api

---

**Last Updated:** January 2024
