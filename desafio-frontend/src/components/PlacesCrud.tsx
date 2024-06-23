import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PlacesList from "./PlacesList";
import PlaceSearch from "./PlaceSearch";

const PlacesCrud: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPlace = () => {
    navigate("/edit-place/new");
  };

  return (
    <div>
      <nav>
        <Link
          to="/"
          style={{ marginRight: "10px", textDecoration: "none", color: "#000" }}
        >
          Home
        </Link>
        /
        <Link
          to="/places"
          style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}
        >
          Places
        </Link>
      </nav>
      <div style={{ padding: "20px" }}>
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
  );
};

export default PlacesCrud;
