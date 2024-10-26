import { GoogleGenerativeAI } from "@google/generative-ai";

async function handleFetchResponse(response) {
  if (!response.ok) {
    console.error(
      `Request to ${response.url} failed with status ${response.status}`,
    );
    return null;
  }
  return await response.json();
}

export async function getCoordinates(location_string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?addressdetails=1&format=jsonv2&limit=1&q=${location_string}`,
  );
  const jsonData = await handleFetchResponse(response);
  if (jsonData) {
    const { lat, lon } = jsonData[0] || {};
    return [parseFloat(lat), parseFloat(lon)];
  }
}

export async function nomainatimQuery(lat, lon) {
  // ["display_name"]
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );
  return await handleFetchResponse(response);
}

export async function getNearbySettlements(lat, lon, radius) {
  const response = await fetch(`https://overpass-api.de/api/interpreter`, {
    method: "POST",
    body:
      "data=" +
      encodeURIComponent(`
        [out:json];
        node[place~"town|city|village"](around:${2000},${lat},${lon});
        out;
      `),
  });
  return await handleFetchResponse(response);
}

export async function getAQI(lat, lon) {
  // ["data"]["aqi"]
  const response = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}?token=${process.env.NEXT_PUBLIC_AQI_KEY}`,
  );
  return await handleFetchResponse(response);
}

export async function getWeather(lat, lon) {
  // ["timelines"]["daily"]
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&past_days=7`,
  );
  return await handleFetchResponse(response);
}

export async function getRiverDischarge(lat, lon) {
  const response = await fetch(
    `https://flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}&daily=river_discharge&start_date=2020-01-01&end_date=2024-12-31`,
  );
  return await handleFetchResponse(response);
}

export async function getEarthquake(lat, lon) {
  const response = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?latitude=${lat}&maxradiuskm=100&longitude=${lon}&format=geojson&starttime=2022-01-01`,
  );
  return await handleFetchResponse(response);
}

export async function getHospital(lat, lon) {
  const response = await fetch(`https://overpass-api.de/api/interpreter`, {
    method: "POST",
    body:
      "data=" +
      encodeURIComponent(`
        [out:json];
        node["amenity"="hospital"](around:10000,${lat},${lon});
        out 1;
      `),
  });
  return await handleFetchResponse(response);
}

export async function geminiSummarise({ settlementData }) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Use the following data to create a descriptive summary about what it’s like to live in this area. Describe the climate, healthcare access, environmental factors, and air quality in a informative tone. Avoid using bullet points, instead crafting a smooth narrative that flows naturally from one topic to the next.

  Guidelines for Summary:

  Describe healthcare accessibility
  Discuss environmental factors like the low earthquake risk and the risk of flood based on river discharge
  Talk about air quality in relatable terms, mentioning any potential impact on health or lifestyle.
  Conclude with an inviting thought, encouraging readers to picture themselves in this area, mentioning any unique lifestyle benefits."
  Use a single paragraph without any blank lines

  ${settlementData}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
