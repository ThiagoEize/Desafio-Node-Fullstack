import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface PlaceSearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
  setDebouncedSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  searchField: string;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface PlaceSearchProviderProps {
  children: ReactNode;
}

const PlaceSearchContext = createContext<PlaceSearchContextType | undefined>(
  undefined
);

export const PlaceSearchProvider: React.FC<PlaceSearchProviderProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [orderBy, setOrderBy] = useState("name asc");
  const [searchField, setSearchField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1200); // 1200ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <PlaceSearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        setDebouncedSearchTerm,
        orderBy,
        setOrderBy,
        searchField,
        setSearchField,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PlaceSearchContext.Provider>
  );
};

export const usePlaceSearchContext = (): PlaceSearchContextType => {
  const context = useContext(PlaceSearchContext);
  if (!context) {
    throw new Error(
      "usePlaceSearchContext must be used within a PlaceSearchProvider"
    );
  }
  return context;
};
