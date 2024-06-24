import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EventsList from "./EventsList";
import EventSearch from "./EventSearch";

const EventsCrud: React.FC = () => {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate("/edit-event/new");
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
        <button onClick={handleAddEvent}>Add Event</button>
        <EventSearch />
        <EventsList
          fieldsToDisplay={[
            "placeId",
            "event",
            "type",
            "dateStart",
            "showGates",
            "showTurnstiles",
            "dateEnd",
          ]}
        />
      </div>
    </div>
  );
};

export default EventsCrud;
