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
import "bootstrap/dist/css/bootstrap.min.css";
import { HelperProvider } from "./context/HelperContext";

const App: React.FC = () => {
  return (
    <PlaceProvider>
      <EventProvider>
        <PlaceSearchProvider>
          <EventSearchProvider>
            <HelperProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/places" element={<PlacesCrud />} />
                <Route path="/events" element={<EventsCrud />} />
                <Route path="/edit-place/:id" element={<PlaceForm />} />
                <Route path="/edit-event/:id" element={<EventForm />} />
              </Routes>
            </HelperProvider>
          </EventSearchProvider>
        </PlaceSearchProvider>
      </EventProvider>
    </PlaceProvider>
  );
};

export default App;
