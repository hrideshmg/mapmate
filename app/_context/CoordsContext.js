"use client";
import { createContext, useContext, useState } from "react";

const CoordsContext = createContext();

export function CoordsProvider({ children }) {
  const [coords, setCoords] = useState([51.23, -0.09]);
  const [settlementData, setSettlementData] = useState([]);

  return (
    <CoordsContext.Provider
      value={{ coords, setCoords, settlementData, setSettlementData }}
    >
      {children}
    </CoordsContext.Provider>
  );
}

export function useCoords() {
  return useContext(CoordsContext);
}
