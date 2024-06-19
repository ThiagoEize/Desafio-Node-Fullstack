import React from "react";
import EventsList from "./EventsList";
import PlacesList from "./PlacesList";

const Home: React.FC = () => {
  const placesToDisplay = [
    "name",
    "address",
    "city",
    "state",
    "gates",
    "turnstiles",
  ];
  const eventsToDisplay = [
    "event",
    "type",
    "dateStart",
    "hourStart",
    "dateEnd",
    "hourEnd",
    "gates",
    "turnstiles",
  ];

  return (
    <div>
      <PlacesList fieldsToDisplay={placesToDisplay} />
      <EventsList fieldsToDisplay={eventsToDisplay} />
    </div>
  );
};

export default Home;
