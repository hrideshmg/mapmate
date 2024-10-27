# URBANALYZE

**URBANALYZE** is a web application designed to help users determine the suitability of specific areas for housing by analyzing various critical factors, including weather, earthquake activity, air quality index, crime index, and more. With a calculated suitability score based on real-time data and AI analysis, URBANALYZE enables users to make informed decisions about potential housing areas.

---

## Features

- **Location Suitability Analysis**: Evaluate whether a specific area is suitable for housing based on multiple data points.
- **Data Insights**: Collect and analyze key data points, including:
  - **Weather**: Current and historical weather patterns and predictions.
  - **Seismic Activity**: Records of earthquakes in the area.
  - **Crime Index**: Analysis of crime rates and types of crimes within the area.
- **AI-Powered Scoring**: Generate a suitability score using AI to calculate a comprehensive assessment for each area within a defined range.
- **User-Friendly Map Interface**: Easily input a location and view the analysis results through a visual, map-based interface.

---

## Tech Stack

- **Next.js**: Enables server-side rendering and efficient routing for a fast, responsive user experience.
- **Tailwind CSS**: Provides a responsive and modern design with custom styling options.
- **OpenStreetMap API**: Supplies map data to visualize the location and display analytical data overlays.
- **Gemini**: Integrates data management and enables scalable analytics, empowering the AI model for score calculation.

---

## Getting Started

Follow these steps to set up URBANALYZE on your local machine:

### Prerequisites

- **Node.js** and **npm**
- API keys for **OpenStreetMap** and **Gemini**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hrideshmg/urbanalyze.git
   cd urbanalyze
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory with the necessary API keys:

   ```plaintext
   NEXT_PUBLIC_MAP_API_KEY=<Your_OpenStreetMap_API_Key>
   NEXT_PUBLIC_GEMINI_API_KEY=<Your_Gemini_API_Key>
   NEXT_PUBLIC_AQI_KEY=<Your_public_Aqi_key>
   NEXT_PUBLIC_PEXELS_KEY=<Your_public_pexels_api_key>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## Usage

1. **Enter a Location**: Search or select a location on the map.
2. **Enter description**: Enter a brief of your desired plot.
3. **View Data Analysis**: The app gathers weather, earthquake, and crime data relevant to the chosen area.
4. **Receive Suitability Score**: An AI-powered score provides a summary of the area’s suitability for housing.
5. **Compare Areas**: Adjust the search radius to compare nearby locations and evaluate different housing options.

---

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to suggest improvements.

---

## License

This project is licensed under the [MIT License.](LICENSE)