import React from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import Event from "./event/Event";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();
  const navigate = useNavigate();

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

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      fetchEvents(page, 10, "", "event asc");
    }
  };

  if (!eventsList) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleAddEvent}>Add Event</button>
      <h1>Events List</h1>
      {eventsList.length === 0 ? (
        <p>No events available.</p>
      ) : (
        eventsList.map((event) => (
          <Event key={event.id} {...getFilteredEventProps(event)} />
        ))
      )}
      {totalEvents > 10 && !fieldsToDisplay.includes("singlePage") && (
        <div>
          {Array.from({ length: Math.ceil(totalEvents / 10) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
