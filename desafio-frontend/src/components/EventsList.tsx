import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import Event from "./Event";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList } = useEventContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsList);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredEvents(
      eventsList.filter((event) =>
        event.event.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, eventsList]);

  const handleAddEvent = () => {
    navigate("/edit-event/new");
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <h1>Events List</h1>
      {filteredEvents.length === 0 ? (
        <p>No events available.</p>
      ) : (
        filteredEvents.map((event) => (
          <Event key={event.id} {...getFilteredEventProps(event)} />
        ))
      )}
    </div>
  );
};

export default EventsList;
