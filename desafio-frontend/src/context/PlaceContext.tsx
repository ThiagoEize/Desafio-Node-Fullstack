import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHelperContext } from "../context/HelperContext";

interface Gate {
  id?: string;
  placeId?: string;
  name: string;
}

interface Turnstile {
  id?: string;
  placeId?: string;
  name: string;
}

interface Place {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  gates: Gate[];
  turnstiles: Turnstile[];
}

interface PlaceContextType {
  placesList: Place[];
  totalPlaces: number;
  currentPage: number;
  fetchPlaces: (
    page: number,
    limit: number,
    searchTerm: string,
    orderBy: string
  ) => void;
  addPlace: (place: Place) => void;
  updatePlace: (id: string, updatedPlace: Place) => void;
  deletePlace: (id: string) => void;
}

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

const PlaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { showResponse } = useHelperContext(); // Use the HelperContext

  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPlaces = useCallback(
    async (
      page: number,
      limit: number,
      searchTerm: string,
      orderBy: string
    ) => {
      try {
        console.log("Fetching places...");
        const response = await axios.get(
          `http://localhost:8080/places?page=${page}&limit=${limit}&order=${orderBy}&search=${searchTerm}`
        );
        setPlacesList(response.data.data);
        setTotalPlaces(response.data.total);
        setCurrentPage(page);
      } catch (error: any) {
        console.error("Error fetching places:", error);
        showResponse("Error", String(error.response.data.message));
      }
    },
    []
  );

  const addPlace = async (place: Place) => {
    try {
      await axios.post(`http://localhost:8080/places`, place);
      setPlacesList((prevPlaces) => [place, ...prevPlaces]);
      setTotalPlaces((prevTotal) => prevTotal + 1);
      navigate("/places");
      showResponse("Success", "Place added successfully");
    } catch (error: any) {
      console.error("Error adding place:", error);
      showResponse("Error", String(error.response.data.message));
    }
  };

  const updatePlace = async (id: string, updatedPlace: Place) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/places/${id}`,
        updatedPlace
      );
      setPlacesList((prevPlaces) =>
        prevPlaces.map((place) => (place.id === id ? response.data : place))
      );
      navigate("/places");
      showResponse("Success", "Place updated successfully");
    } catch (error: any) {
      console.error("Error updating place:", error);
      showResponse("Error", String(error.response.data.message));
    }
  };

  const deletePlace = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/places/${id}`);
      setPlacesList((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== id)
      );
      setTotalPlaces((prevTotal) => prevTotal - 1);
      showResponse("Success", "Place deleted successfully");
    } catch (error: any) {
      console.error("Error deleting place:", error);
      showResponse("Error", String(error.response.data.message));
    }
  };

  return (
    <PlaceContext.Provider
      value={{
        placesList,
        totalPlaces,
        currentPage,
        fetchPlaces,
        addPlace,
        updatePlace,
        deletePlace,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

const usePlaceContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("usePlace must be used within a PlaceProvider");
  }
  return context;
};

export { PlaceProvider, usePlaceContext };
