"use client";
import { createContext, useContext, useState } from "react";

const CoordsContext = createContext();

export function CoordsProvider({ children }) {
  const [coords, setCoords] = useState([51.23, -0.09]);
  const [settlementData, setSettlementData] = useState([]);
  const [progress, setProgress] = useState({ messages: [], target_len: 0 });
  const [weights, setWeights] = useState();

  return (
    <CoordsContext.Provider
      value={{
        coords,
        setCoords,
        settlementData,
        setSettlementData,
        progress,
        setProgress,
        weights,
        setWeights,
      }}
    >
      {children}
    </CoordsContext.Provider>
  );
}

export function useCoords() {
  return useContext(CoordsContext);
}
