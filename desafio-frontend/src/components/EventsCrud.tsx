import React from "react";
import { Link } from "react-router-dom";
import EventsList from "./EventsList";

const EventsCrud: React.FC = () => {
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
          to="/events"
          style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}
        >
          Events
        </Link>
      </nav>
      <div style={{ padding: "20px" }}>
        <h1>Events</h1>
        <p>
          This section allows you to view, add, edit, and delete events in the
          system.
        </p>
        <EventsList fieldsToDisplay={["event", "placeId", "type", "date"]} />
      </div>
    </div>
  );
};

export default EventsCrud;