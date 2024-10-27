import { GoogleGenerativeAI } from "@google/generative-ai";

async function handleFetchResponse(response, endpoint) {
  try {
    if (!response.ok) {
      console.error(
        `Request to ${endpoint} failed with status ${response.status}`,
      );
      return null;
    }
    const data = await response.json();
    if (!data) {
      console.error(`Empty response received from ${endpoint}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error(`Error handling response from ${endpoint}:`, error);
    return null;
  }
}

function validateCoordinates(lat, lon) {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    console.error("Invalid coordinates provided");
    return false;
  }
  return true;
}

export async function getCoordinates(location_string) {
  if (!location_string?.trim()) {
    console.error("Location string is required");
    return null;
  }

  try {
    const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${location_string}&apiKey=${process.env.NEXT_PUBLIC_GEO_KEY}`;
    const response = await fetch(endpoint, {
      headers: {
        "User-Agent": "YourApp/1.0",
      },
    });

    const jsonData = await handleFetchResponse(response, endpoint);
    if (!response.ok) {
      console.error("Location not found");
      return null;
    }
    const lat = jsonData.features[0].properties.lat;
    const lon = jsonData.features[0].properties.lon;
    const coordinates = [parseFloat(lat), parseFloat(lon)];

    if (coordinates.some(isNaN)) {
      console.error("Invalid coordinates received from API");
      return null;
    }

    return coordinates;
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
}

export async function nomainatimQuery(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  try {
    const endpoint = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_GEO_KEY}`;
    const response = await fetch(endpoint, {
      headers: {
        "User-Agent": "YourApp/1.0",
      },
    });
    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error in nominatim query:", error);
    return null;
  }
}
export async function getPexelsImage(query) {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_KEY; // Your Pexels API key
  const endpoint = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      console.error("Error fetching image from Pexels:", response.statusText);
      return null;
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data; // Get a medium-sized image
    } else {
      console.error("No images found for the query:", query);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return null;
  }
}

export async function getNearbySettlements(lat, lon, radius) {
  if (!validateCoordinates(lat, lon)) return null;

  if (!radius || radius <= 0) {
    console.error("Invalid radius provided");
    return null;
  }

  try {
    const endpoint = "https://overpass-api.de/api/interpreter";
    const query = `
      [out:json];
      node[place~"town|city|village"](around:${radius},${lat},${lon});
      out;
    `;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "data=" + encodeURIComponent(query),
    });

    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error getting nearby settlements:", error);
    return null;
  }
}

export async function getAQI(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  if (!process.env.NEXT_PUBLIC_AQI_KEY) {
    console.error("AQI API key not configured");
    return null;
  }

  try {
    const endpoint = "https://api.waqi.info/feed/geo";
    const response = await fetch(
      `${endpoint}:${lat};${lon}?token=${process.env.NEXT_PUBLIC_AQI_KEY}`,
    );
    const data = await handleFetchResponse(response, endpoint);

    if (data?.status !== "ok") {
      console.error("AQI API returned error status");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting AQI:", error);
    return null;
  }
}

export async function getWeather(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  try {
    const endpoint = "https://api.open-meteo.com/v1/forecast";
    const response = await fetch(
      `${endpoint}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&past_days=7`,
    );
    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error getting weather:", error);
    return null;
  }
}

export async function getRiverDischarge(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  try {
    const endpoint = "https://flood-api.open-meteo.com/v1/flood";
    const response = await fetch(
      `${endpoint}?latitude=${lat}&longitude=${lon}&daily=river_discharge&start_date=2020-01-01&end_date=2024-12-31`,
    );
    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error getting river discharge:", error);
    return null;
  }
}

export async function getEarthquake(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  try {
    const endpoint = "https://earthquake.usgs.gov/fdsnws/event/1/query";
    const response = await fetch(
      `${endpoint}?latitude=${lat}&maxradiuskm=100&longitude=${lon}&format=geojson&starttime=2022-01-01`,
    );
    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error getting earthquake data:", error);
    return null;
  }
}

export async function getHospital(lat, lon) {
  if (!validateCoordinates(lat, lon)) return null;

  try {
    const endpoint = "https://overpass-api.de/api/interpreter";
    const query = `
      [out:json];
      node["amenity"="hospital"](around:10000,${lat},${lon});
      out 1;
    `;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "data=" + encodeURIComponent(query),
    });

    return await handleFetchResponse(response, endpoint);
  } catch (error) {
    console.error("Error getting hospital data:", error);
    return null;
  }
}

export async function geminiSummarise(settlementData) {
  if (!process.env.NEXT_PUBLIC_GEMINI_KEY) {
    console.error("Gemini API key not configured");
    return null;
  }

  if (!settlementData || typeof settlementData !== "object") {
    console.error("Invalid settlement data provided");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Use the following data to create a descriptive summary about what it's like to live in this area.
      Describe the climate, healthcare access, environmental factors, and air quality in a informative tone using the given data.
      Avoid using bullet points, instead crafting a smooth narrative that flows naturally from one topic to the next.
      Guidelines for Summary:
      Describe healthcare accessibility
      Discuss environmental factors like the earthquake risk and the risk of flood based on river discharge
      Talk about air quality in relatable terms, mentioning any potential impact on health or lifestyle.
      Conclude with an inviting thought, encouraging readers to picture themselves in this area, mentioning any unique lifestyle benefits.
      Use a single paragraph without any blank lines
      USE MAXIMUM 50 words
      ${JSON.stringify(settlementData)}
    `;

    const result = await model.generateContent(prompt);

    if (!result?.response?.text) {
      console.error("Failed to generate summary");
      return null;
    }

    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}
