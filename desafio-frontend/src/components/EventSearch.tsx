import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";

const EventSearch: React.FC = () => {
  const { fetchEvents, currentPage } = useEventContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [orderBy, setOrderBy] = useState("event asc");
  const [searchField, setSearchField] = useState("event");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1200); // 1200ms debounce delay

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

  return (
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
        onChange={(e) => setSearchTerm(e.target.value)}
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
    </div>
  );
};

export default EventSearch;