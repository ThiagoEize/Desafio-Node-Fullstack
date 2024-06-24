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
      <div className="backgroundContainer">
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
        <div>
          <h1>Places</h1>
          <p>
            This section allows you to view, add, edit, and delete places in the
            system.
          </p>
          <button onClick={handleAddPlace}>Add Place</button>
          <PlaceSearch />
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
