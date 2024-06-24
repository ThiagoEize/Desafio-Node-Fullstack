import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PlacesList from "../placesList/PlacesList";
import PlaceSearch from "../PlaceSearch";
import styles from "./PlacesCrud.module.css";

const PlacesCrud: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddPlace = () => {
    navigate("/edit-place/new");
  };

  return (
    <div className="mainContainer">
      <div className={styles.navLinks}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.selected : ""}
        >
          Home
        </Link>
        /
        <Link
          to="/places"
          className={location.pathname === "/places" ? styles.selected : ""}
        >
          Places
        </Link>
      </div>
      <h1>Lugares</h1>
      <p>Confira a lista de locais cadastrados</p>

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
          />
        </div>
      </div>
    </div>
  );
};

export default PlacesCrud;
