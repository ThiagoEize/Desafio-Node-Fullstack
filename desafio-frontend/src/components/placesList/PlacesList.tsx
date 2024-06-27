import React from "react";
import { usePlaceContext } from "../../context/PlaceContext";
import Place from "../place/Place";
import styles from "./PlacesList.module.css";

interface PlacesListProps {
  fieldsToDisplay: { key: string; name: string }[];
  showTitles: boolean;
  showPagination: boolean;
}

const PlacesList: React.FC<PlacesListProps> = ({
  fieldsToDisplay,
  showTitles,
  showPagination,
}) => {
  const { placesList, totalPlaces, currentPage, fetchPlaces } =
    usePlaceContext();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      fetchPlaces({ page, limit: 10, searchTerm: "", orderBy: "name asc" });
    }
  };

  if (!placesList) return <p>Loading...</p>;

  return (
    <div>
      {placesList.length === 0 ? (
        <p>No places available.</p>
      ) : (
        <table className={styles.placesTable}>
          {showTitles && (
            <thead>
              <tr>
                {fieldsToDisplay.map(({ key, name }) => (
                  <th key={key}>{name}</th>
                ))}
                <th></th>
              </tr>
            </thead>
          )}
          <tbody>
            {placesList.map((place, index) => (
              <Place
                key={place.id}
                place={place}
                fieldsToDisplay={fieldsToDisplay.map((field) => field.key)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#333B49" : "#10141D",
                }}
              />
            ))}
          </tbody>
        </table>
      )}

      {totalPlaces > 10 && showPagination && (
        <div className={styles.pagination}>
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
