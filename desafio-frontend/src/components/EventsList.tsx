import React from "react";
import { useEventContext } from "../context/EventContext";
import Event from "./Event";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList } = useEventContext();

  const getFilteredEventProps = (event: any) => {
    const filteredProps: any = { id: event.id };
    fieldsToDisplay.forEach((field) => {
      if (event[field] !== undefined) {
        filteredProps[field] = event[field];
      }
    });
    return filteredProps;
  };

  return (
    <div>
      <h1>Events List</h1>
      {eventsList.length === 0 ? (
        <p>No events available.</p>
      ) : (
        eventsList.map((event) => (
          <Event key={event.id} {...getFilteredEventProps(event)} />
        ))
      )}
    </div>
  );
};

export default EventsList;
