import React from "react";
import { useNavigate } from "react-router-dom";
import PlacesList from "../placesList/PlacesList";
import PlaceSearch from "../PlaceSearch";
import ContentTop from "../contentTop/ContentTop";

const PlacesCrud: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPlace = () => {
    navigate("/edit-place/new");
  };

  return (
    <div className="mainContainer">
      <ContentTop
        title="places"
        message="Confira os lugares cadastrados no sistema."
      />

      <div className="backgroundContainer">
        <div>
          <div className="customRowSpace">
            <PlaceSearch />
            <button onClick={handleAddPlace}>Adicionar local</button>
          </div>
          <PlacesList
            fieldsToDisplay={[
              "name",
              "address",
              "city",
              "state",
              "gates",
              "turnstiles",
            ]}
            showTitles={true}
            showPagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PlacesCrud;
