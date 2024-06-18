import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import Event from "./event/Event";
import axios from "axios";

interface EventsListProps {
  fieldsToDisplay: string[];
}

const EventsList: React.FC<EventsListProps> = ({ fieldsToDisplay }) => {
  const { eventsList, totalEvents, currentPage, fetchEvents } =
    useEventContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("event asc");
  const [placesMap, setPlacesMap] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents(currentPage, 10, searchTerm, orderBy);
  }, [searchTerm, orderBy]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:8080/places");
        const places = response.data.data;
        const placesObj = places.reduce(
          (
            acc: Record<number, string>,
            place: { id: number; name: string }
          ) => {
            acc[place.id] = place.name;
            return acc;
          },
          {}
        );
        setPlacesMap(placesObj);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

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
    fetchEvents(page, 10, searchTerm, orderBy);
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
        <input
          type="text"
          placeholder="Search by event"
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
