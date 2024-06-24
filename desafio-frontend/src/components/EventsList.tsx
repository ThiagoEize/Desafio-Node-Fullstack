import React from "react";
import { useEventContext } from "../context/EventContext";
import Event from "./event/Event";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();

  const getFilteredEventProps = (event: any) => {
    const filteredProps: any = { id: event.id };
    fieldsToDisplay.forEach((field) => {
      if (event[field] !== undefined) {
        filteredProps[field] = event[field];
      } else if (field === "showGates" || field === "showTurnstiles") {
        filteredProps[field] = field;
      }
    });
    return filteredProps;
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      fetchEvents({ page, limit: 10, searchTerm: "", orderBy: "event asc" });
    }
  };

  if (!eventsList) return <p>Loading...</p>;

  return (
    <div>
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
