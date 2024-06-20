import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import Event from "./event/Event";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [orderBy, setOrderBy] = useState("event asc");
  const [searchField, setSearchField] = useState("event");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1200); // 1000ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchEvents(
      currentPage,
      10,
      `${searchField}:${debouncedSearchTerm}`,
      orderBy
    );
  }, [debouncedSearchTerm, orderBy, searchField, currentPage]);

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
    fetchEvents(page, 10, `${searchField}:${debouncedSearchTerm}`, orderBy);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!eventsList) return <p>Loading...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="event">Event</option>
          <option value="type">Type</option>
          <option value="dateStart">Date Start</option>
          <option value="dateEnd">Date End</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="event asc">Event Ascending</option>
          <option value="event desc">Event Descending</option>
          <option value="type asc">Type Ascending</option>
          <option value="type desc">Type Descending</option>
        </select>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <h1>Events List</h1>
      {eventsList.length === 0 ? (
        <p>No events available.</p>
      ) : (
        eventsList.map((event) => (
          <Event key={event.id} {...getFilteredEventProps(event)} />
        ))
      )}
      {totalEvents > 10 && (
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
