import React, { useEffect } from "react";
import EventsList from "./EventsList";
import PlacesList from "./PlacesList";
import { usePlaceContext } from "../context/PlaceContext";
import { useEventContext } from "../context/EventContext";

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
    "singlePage",
  ];

  const { fetchPlaces } = usePlaceContext();
  const { fetchEvents } = useEventContext();

  useEffect(() => {
    fetchPlaces(1, 3, "", "dateStart");
    fetchEvents(1, 3, "", "dateStart");
  }, []);

  return (
    <div>
      <PlacesList fieldsToDisplay={placesToDisplay} />
      <EventsList fieldsToDisplay={eventsToDisplay} />
    </div>
  );
};

export default Home;
