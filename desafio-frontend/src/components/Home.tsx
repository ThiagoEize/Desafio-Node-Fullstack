import React, { useEffect } from "react";
import EventsList from "./EventsList";
import PlacesList from "./PlacesList";
import { usePlaceContext } from "../context/PlaceContext";
import { useEventContext } from "../context/EventContext";
import NavBar from "./navBar/NavBar";

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
    "placeId",
    "showTurnstiles",
    "singlePage",
  ];

  const { fetchPlaces } = usePlaceContext();
  const { fetchEvents } = useEventContext();

  useEffect(() => {
    fetchPlaces({ page: 1, limit: 3, searchTerm: "", orderBy: "dateStart" });
    fetchEvents({ page: 1, limit: 3, searchTerm: "", orderBy: "dateStart" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <PlacesList fieldsToDisplay={placesToDisplay} />
      <EventsList fieldsToDisplay={eventsToDisplay} />
    </div>
  );
};

export default Home;
