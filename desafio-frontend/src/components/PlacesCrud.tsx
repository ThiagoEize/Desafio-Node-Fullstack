import React from "react";
import { Link } from "react-router-dom";
import PlacesList from "./PlacesList";
import PlaceSearch from "./PlaceSearch";
import NavBar from "./navBar/NavBar";

const PlacesCrud: React.FC = () => {
  return (
    <div>
      <NavBar></NavBar>
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
