"use client";
import { createContext, useContext, useState } from "react";

const CoordsContext = createContext();
const settlementContext = createContext();

export function CoordsProvider({ children }) {
  const [coords, setCoords] = useState([51.23, -0.09]);

  return (
    <CoordsContext.Provider value={{ coords, setCoords }}>
      {children}
    </CoordsContext.Provider>
  );
}

export function SettlementProvider({ children }) {
  const [settlementData, setSettlementData] = useState([]);

  return (
    <CoordsContext.Provider value={{ settlementData, setSettlementData }}>
      {children}
    </CoordsContext.Provider>
  );
}
export function useCoords() {
  return useContext(CoordsContext);
}

export function useSettlement() {
  return useContext(settlementContext);
}
