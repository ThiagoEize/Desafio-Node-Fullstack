import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaceContext } from "../context/PlaceContext";
import Place from "./place/Place";

interface PlacesListProps {
  fieldsToDisplay: string[];
}

const PlacesList: React.FC<PlacesListProps> = ({ fieldsToDisplay }) => {
  const { placesList, totalPlaces, currentPage, fetchPlaces } =
    usePlaceContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("name asc");
  const [searchField, setSearchField] = useState("name");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1200); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchPlaces(
      currentPage,
      10,
      `${searchField}:${debouncedSearchTerm}`,
      orderBy
    );
  }, [debouncedSearchTerm, orderBy, searchField, currentPage]);

  const handleAddPlace = () => {
    navigate("/edit-place/new");
  };

  const getFilteredPlaceProps = (place: any) => {
    const filteredProps: any = { id: place.id };
    fieldsToDisplay.forEach((field) => {
      if (place[field] !== undefined) {
        filteredProps[field] = place[field];
      }
    });
    return filteredProps;
  };

  const handlePageChange = (page: number) => {
    fetchPlaces(page, 10, `${searchField}:${debouncedSearchTerm}`, orderBy);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!placesList) return <p>Loading...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="name">Name</option>
          <option value="address">Address</option>
          <option value="city">City</option>
          <option value="state">State</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="name asc">Name Ascending</option>
          <option value="name desc">Name Descending</option>
          <option value="city asc">City Ascending</option>
          <option value="city desc">City Descending</option>
        </select>
        <button onClick={handleAddPlace}>Add Place</button>
      </div>
      <h1>Places List</h1>
      {placesList.length === 0 ? (
        <p>No places available.</p>
      ) : (
        placesList.map((place) => (
          <Place key={place.id} {...getFilteredPlaceProps(place)} />
        ))
      )}
      {totalPlaces > 10 && (
        <div>
          {Array.from({ length: Math.ceil(totalPlaces / 10) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesList;
