// MyComponent.tsx
import React from "react";
import EventsList from "./EventsList";
import PlacesList from "./PlacesList";

const MyComponent: React.FC = () => {
  const placesToDisplay = ["name", "gates"];
  const eventsToDisplay = ["event", "placeId", "type", "date"];

  // Example usage of places and events state and functions
  return (
    <div>
      <PlacesList fieldsToDisplay={placesToDisplay} />
      <EventsList fieldsToDisplay={eventsToDisplay} />
    </div>
  );
};

export default MyComponent;
