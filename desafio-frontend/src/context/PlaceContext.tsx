import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface Gate {
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
  updates: string;
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
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPlaces = async (
    page: number,
    limit: number,
    searchTerm: string,
    orderBy: string
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/places?page=${page}&limit=${limit}&order=${orderBy}&search=${searchTerm}`
      );
      setPlacesList(response.data.data);
      setTotalPlaces(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const addPlace = async (place: Place) => {
    try {
      const response = await axios.post(`http://localhost:8080/places`, place);
      setPlacesList((prevPlaces) => [...prevPlaces, response.data]);
      setTotalPlaces((prevTotal) => prevTotal + 1);
    } catch (error) {
      console.error("Error adding place:", error);
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
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  const deletePlace = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/places/${id}`);
      setPlacesList((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== id)
      );
      setTotalPlaces((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  useEffect(() => {
    fetchPlaces(1, 10, "", "name asc");
  }, []);

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
