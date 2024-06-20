import React, { useEffect } from "react";
import EventsList from "./EventsList";
import PlacesList from "./PlacesList";
import { usePlaceContext } from "../context/PlaceContext";

const Home: React.FC = () => {
  const placesToDisplay = [
    "name",
    "address",
    "city",
    "state",
    "gates",
    "turnstiles",
    "singlePage",
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

  const { currentPage, fetchPlaces } = usePlaceContext();

  useEffect(() => {
    fetchPlaces(1, 3, "", "dateStart");
  }, []);

  return (
    <div>
      <PlacesList fieldsToDisplay={placesToDisplay} />
      <EventsList fieldsToDisplay={eventsToDisplay} />
    </div>
  );
};

export default Home;
