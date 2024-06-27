import React from "react";
import { useEventContext } from "../../context/EventContext";
import Event from "../event/Event";
import styles from "./EventsList.module.css";

interface EventsListProps {
  fieldsToDisplay: { key: string; name: string }[];
  showTitles: boolean;
  showPagination: boolean;
}

const EventsList: React.FC<EventsListProps> = ({
  fieldsToDisplay,
  showTitles,
  showPagination,
}) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();

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
        <table className={styles.eventsTable}>
          {showTitles && (
            <thead>
              <tr>
                {fieldsToDisplay.map(({ key, name }) => (
                  <th key={key}>{name}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {eventsList.map((event, index) => (
              <Event
                key={event.id}
                event={event}
                fieldsToDisplay={fieldsToDisplay.map((field) => field.key)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#333B49" : "#10141D",
                }}
              />
            ))}
          </tbody>
        </table>
      )}
      {totalEvents > 10 && showPagination && (
        <div className={styles.pagination}>
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
