import React from "react";
import { Link } from "react-router-dom";
import PlacesList from "./PlacesList";

const PlacesCrud: React.FC = () => {
  return (
    <div>
      <nav
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   padding: "10px",
      //   backgroundColor: "#eee",
      // }}
      >
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
        <PlacesList fieldsToDisplay={["name", "address", "city", "state"]} />
      </div>
    </div>
  );
};

export default PlacesCrud;
