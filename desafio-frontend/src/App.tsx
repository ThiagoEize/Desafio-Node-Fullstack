import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlaceProvider } from "./context/PlaceContext";
import { EventProvider } from "./context/EventContext";
import Home from "./components/Home";
import PlacesList from "./components/PlacesList";
import EventsList from "./components/EventsList";
import PlaceForm from "./components/PlaceForm";
import EventForm from "./components/EventForm";
// import EventForm from "./components/EventForm";

const App: React.FC = () => {
  return (
    <PlaceProvider>
      <EventProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/places"
            element={
              <PlacesList
                fieldsToDisplay={["name", "address", "city", "state"]}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsList
                fieldsToDisplay={["event", "placeId", "type", "date"]}
              />
            }
          />
          <Route path="/edit-event/:id" element={<EventForm />} />
          <Route path="/edit-place/:id" element={<PlaceForm />} />
        </Routes>
      </EventProvider>
    </PlaceProvider>
  );
};

export default App;
