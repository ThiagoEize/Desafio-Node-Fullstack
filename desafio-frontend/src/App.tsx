import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlaceProvider } from "./context/PlaceContext";
import { EventProvider } from "./context/EventContext";
import Home from "./components/Home";
import EventsCrud from "./components/EventsCrud";
import PlaceForm from "./components/PlaceForm";
import EventForm from "./components/EventForm";
import PlacesCrud from "./components/PlacesCrud";
import { PlaceSearchProvider } from "./context/PlaceSearchContext";
import { EventSearchProvider } from "./context/EventSearchContext";

const App: React.FC = () => {
  return (
    <PlaceProvider>
      <EventProvider>
        <PlaceSearchProvider>
          <EventSearchProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/places" element={<PlacesCrud />} />
              <Route path="/events" element={<EventsCrud />} />
              <Route path="/edit-place/:id" element={<PlaceForm />} />
              <Route path="/edit-event/:id" element={<EventForm />} />
            </Routes>
          </EventSearchProvider>
        </PlaceSearchProvider>
      </EventProvider>
    </PlaceProvider>
  );
};

export default App;
