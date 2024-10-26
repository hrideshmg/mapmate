import { useEffect } from "react";
import {
  getAQI,
  getEarthquake,
  getHospital,
  getNearbySettlements,
  getRiverDischarge,
  getWeather,
  nomainatimQuery,
} from "./integrations";

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function triggerGeoFusion(coords, radius) {
  const [lat, lon] = coords;
  const result = [];
  const nearby_settlements = await getNearbySettlements(lat, lon, radius);

  // Use Promise.all with map for async handling
  const settlementsData = await Promise.all(
    nearby_settlements["elements"].map(async (settlement) => {
      const s_lat = settlement["lat"];
      const s_lon = settlement["lon"];
      const settlement_data = {
        address: {},
        amenities: {},
        weather: {},
        calamity: {},
      };

      const aqi = await getAQI(s_lat, s_lon);
      const weather = await getWeather(s_lat, s_lon);
      const avg_humidity = weather["current"]["temperature_2m"];
      const avg_temperature = weather["current"]["relative_humidity_2m"];
      const nominatim = await nomainatimQuery(s_lat, s_lon);
      const display_name = nominatim["display_name"];
      const river_discharge = (await getRiverDischarge(s_lat, s_lon))["daily"][
        "river_discharge"
      ];
      const river_discharge_avg =
        river_discharge.reduce((a, b) => a + b) / river_discharge.length;
      const earthquakes = await getEarthquake(s_lat, s_lon);
      const closest_hospital = (await getHospital(s_lat, s_lon))["elements"][0];
      const closest_hospital_dist = haversineDistance(
        s_lat,
        s_lon,
        closest_hospital["lat"],
        closest_hospital["lon"],
      );
      const closest_hospital_name = closest_hospital["tags"]["name"];
      const index = 75;

      settlement_data["index"] = index;
      settlement_data["address"]["display_name"] = display_name;
      settlement_data["address"]["city"] =
        nominatim["address"]["city"] ||
        nominatim["address"]["town"] ||
        nominatim["address"]["village"];
      settlement_data["address"]["state"] = nominatim["address"]["state"];
      settlement_data["address"]["country"] = nominatim["address"]["country"];
      settlement_data["address"]["location"] = [s_lat, s_lon];
      settlement_data["amenities"]["closest_hosp_name"] = closest_hospital_name;
      settlement_data["amenities"]["closest_hosp_dist"] = closest_hospital_dist;
      settlement_data["weather"]["temperature"] = avg_temperature;
      settlement_data["weather"]["humidity"] = avg_humidity;
      settlement_data["calamity"]["river_discharge"] = river_discharge_avg;
      settlement_data["calamity"]["earthquakes"] =
        earthquakes["features"].length;
      settlement_data["calamity"]["aqi"] = aqi["data"]["aqi"];

      return settlement_data;
    }),
  );

  // Add all settlement data to result after all promises resolve
  result.push(...settlementsData);
  return result;
}
