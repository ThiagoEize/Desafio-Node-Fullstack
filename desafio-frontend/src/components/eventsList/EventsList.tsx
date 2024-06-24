import React from "react";
import { useEventContext } from "../../context/EventContext";
import Event from "../event/Event";
import styles from "./EventsList.module.css";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      fetchEvents({ page, limit: 10, searchTerm: "", orderBy: "event asc" });
    }
  };

  const getFieldDisplayName = (field: string) => {
    const fieldNames: { [key: string]: string } = {
      placeId: "Nome do local",
      event: "Evento",
      type: "Tipo",
      dateStart: "Data Início",
      dateEnd: "Data Fim",
      showGates: "Portões cadastrados",
      showTurnstiles: "Catracas cadastradas",
    };
    return fieldNames[field] || field;
  };

  if (!eventsList) return <p>Loading...</p>;

  return (
    <div>
      {eventsList.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <table className={styles.eventsTable}>
          {!fieldsToDisplay.includes("noTitles") && (
            <thead>
              <tr>
                {fieldsToDisplay
                  .filter((field) => field !== "singlePage")
                  .map((field) => (
                    <th key={field}>{getFieldDisplayName(field)}</th>
                  ))}
                <th></th>
              </tr>
            </thead>
          )}
          <tbody>
            {eventsList.map((event, index) => (
              <Event
                key={event.id}
                event={event}
                fieldsToDisplay={fieldsToDisplay}
                style={{
                  backgroundColor: index % 2 === 0 ? "#333B49" : "#10141D",
                }}
              />
            ))}
          </tbody>
        </table>
      )}
      {totalEvents > 10 && !fieldsToDisplay.includes("singlePage") && (
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
