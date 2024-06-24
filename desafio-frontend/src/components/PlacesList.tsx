import React from "react";
import { usePlaceContext } from "../context/PlaceContext";
import Place from "./place/Place";
import styles from "./PlacesList.module.css";

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

  const getFieldDisplayName = (field: string) => {
    const fieldNames: { [key: string]: string } = {
      name: "Nome do local",
      address: "Endereço",
      city: "Cidade",
      state: "Estado",
      gates: "Portões cadastrados",
      turnstiles: "Catracas cadastradas",
      lastUpdate: "Atualização",
    };
    return fieldNames[field] || field;
  };

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
          {!fieldsToDisplay.includes("noTitles") && (
            <thead>
              <tr>
                {fieldsToDisplay
                  .filter((field) => field !== "singlePage")
                  .map((field) => (
                    <th key={field}>{getFieldDisplayName(field)}</th>
                  ))}
                <th></th>
              </tr>
            </thead>
          )}
          <tbody>
            {placesList.map((place, index) => (
              <Place
                key={place.id}
                {...getFilteredPlaceProps(place)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#333B49" : "#10141D",
                }}
              />
            ))}
          </tbody>
        </table>
      )}

      {totalPlaces > 10 && !fieldsToDisplay.includes("singlePage") && (
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
