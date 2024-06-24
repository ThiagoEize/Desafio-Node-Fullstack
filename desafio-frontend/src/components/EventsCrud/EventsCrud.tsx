import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EventsList from "../eventsList/EventsList";
import EventSearch from "../EventSearch";
import styles from "./EventsCrud.module.css";

const EventsCrud: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddEvent = () => {
    navigate("/edit-event/new");
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
            to="/events"
            className={location.pathname === "/events" ? styles.selected : ""}
          >
            Events
          </Link>
        </div>
        <div>
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
    </div>
  );
};

export default EventsCrud;
