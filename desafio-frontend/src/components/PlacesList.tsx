import React from "react";
import { usePlaceContext } from "../context/PlaceContext";
import Place from "./place/Place";

interface PlacesListProps {
  fieldsToDisplay: string[];
}

const PlacesList: React.FC<PlacesListProps> = ({ fieldsToDisplay }) => {
  const { placesList, totalPlaces, currentPage, fetchPlaces } =
    usePlaceContext();

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
    if (page !== currentPage) {
      fetchPlaces({ page, limit: 10, searchTerm: "", orderBy: "name asc" });
    }
  };

  if (!placesList) return <p>Loading...</p>;

  return (
    <div>
      <h1>Places List</h1>
      {placesList.length === 0 ? (
        <p>No places available.</p>
      ) : (
        placesList.map((place) => (
          <Place key={place.id} {...getFilteredPlaceProps(place)} />
        ))
      )}

      {totalPlaces > 10 && !fieldsToDisplay.includes("singlePage") && (
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
