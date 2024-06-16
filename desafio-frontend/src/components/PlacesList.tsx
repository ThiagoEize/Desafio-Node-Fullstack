import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaceContext } from "../context/PlaceContext";
import Place from "./place/Place";

interface PlacesListProps {
  fieldsToDisplay: string[];
}

const PlacesList: React.FC<PlacesListProps> = ({ fieldsToDisplay }) => {
  const { placesList } = usePlaceContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState(placesList);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredPlaces(
      placesList.filter((place) =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, placesList]);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <button onClick={handleAddPlace}>Add Place</button>
      </div>
      <h1>Places List</h1>
      {filteredPlaces.length === 0 ? (
        <p>No places available.</p>
      ) : (
        filteredPlaces.map((place) => (
          <Place key={place.id} {...getFilteredPlaceProps(place)} />
        ))
      )}
    </div>
  );
};

export default PlacesList;
