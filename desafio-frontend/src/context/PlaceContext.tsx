// PlaceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for a place
interface Place {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  gates: string[];
  lastUpdate: string;
}

// Define the context type
interface PlaceContextType {
  placesList: Place[];
  addPlace: (place: Place) => void;
  updatePlace: (id: string, updatedPlace: Place) => void;
  deletePlace: (id: string) => void;
}

// Create the context with default values
const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

// Create the provider component
const PlaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [placesList, setPlacesList] = useState<Place[]>([
    {
      id: "1",
      name: "Place 1",
      address: "Address 1",
      city: "City 1",
      state: "State 1",
      gates: ["Front", "Back"],
      lastUpdate: "2023-01-01",
    },
    {
      id: "2",
      name: "Place 2",
      address: "Address 2",
      city: "City 2",
      state: "State 2",
      gates: ["Front"],
      lastUpdate: "2023-01-02",
    },
    {
      id: "3",
      name: "Place 3",
      address: "Address 3",
      city: "City 3",
      state: "State 3",
      gates: ["Back"],
      lastUpdate: "2023-01-03",
    },
    {
      id: "4",
      name: "Place 4",
      address: "Address 4",
      city: "City 4",
      state: "State 4",
      gates: ["Front", "Back", "Side"],
      lastUpdate: "2023-01-04",
    },
    {
      id: "5",
      name: "Place 5",
      address: "Address 5",
      city: "City 5",
      state: "State 5",
      gates: ["Side"],
      lastUpdate: "2023-01-05",
    },
    {
      id: "6",
      name: "Place 6",
      address: "Address 6",
      city: "City 6",
      state: "State 6",
      gates: ["Front"],
      lastUpdate: "2023-01-06",
    },
    {
      id: "7",
      name: "Place 7",
      address: "Address 7",
      city: "City 7",
      state: "State 7",
      gates: ["Back"],
      lastUpdate: "2023-01-07",
    },
    {
      id: "8",
      name: "Place 8",
      address: "Address 8",
      city: "City 8",
      state: "State 8",
      gates: ["Front", "Back"],
      lastUpdate: "2023-01-08",
    },
    {
      id: "9",
      name: "Place 9",
      address: "Address 9",
      city: "City 9",
      state: "State 9",
      gates: ["Front"],
      lastUpdate: "2023-01-09",
    },
    {
      id: "10",
      name: "Place 10",
      address: "Address 10",
      city: "City 10",
      state: "State 10",
      gates: ["Back"],
      lastUpdate: "2023-01-10",
    },
  ]);

  const addPlace = (place: Place) => {
    setPlacesList((prevPlaces) => [...prevPlaces, place]);
  };

  const updatePlace = (id: string, updatedPlace: Place) => {
    setPlacesList((prevPlaces) =>
      prevPlaces.map((place) => (place.id === id ? updatedPlace : place))
    );
  };

  const deletePlace = (id: string) => {
    setPlacesList((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== id)
    );
  };

  return (
    <PlaceContext.Provider
      value={{ placesList, addPlace, updatePlace, deletePlace }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

// Custom hook to use the PlaceContext
const usePlaceContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("usePlace must be used within a PlaceProvider");
  }
  return context;
};

export { PlaceProvider, usePlaceContext };
