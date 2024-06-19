import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "../utils/dateUtils";
import axios from "axios";

interface Place {
  id: number;
  name: string;
}

const EventForm: React.FC = () => {
  const { eventsList, addEvent, updateEvent } = useEventContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const [formState, setFormState] = useState({
    id: "",
    placeId: 0,
    event: "",
    type: "",
    dateStart: "",
    hourStart: "",
    dateEnd: "",
    hourEnd: "",
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:8080/places");
        setPlacesList(response.data.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (id) {
      const event = eventsList.find((event) => event.id.toString() === id);
      if (event) {
        setFormState({
          id: event.id,
          placeId: event.placeId,
          event: event.event,
          type: event.type,
          dateStart: formatDate(event.dateStart),
          hourStart: formatTime(event.dateStart),
          dateEnd: formatDate(event.dateEnd),
          hourEnd: formatTime(event.dateEnd),
        });
      }
    }
  }, [id, eventsList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "placeId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateStart = `${formState.dateStart}T${formState.hourStart}:00Z`;
    const formattedDateEnd = `${formState.dateEnd}T${formState.hourEnd}:00Z`;

    const eventData = {
      ...formState,
      dateStart: formattedDateStart,
      dateEnd: formattedDateEnd,
    };

    if (formState.id) {
      updateEvent(formState.id, eventData);
    } else {
      addEvent({ ...eventData, id: Date.now().toString() });
    }

    navigate("/events"); // Navigate back to the events list after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="placeId"
        value={formState.placeId}
        onChange={handleChange}
        required
      >
        <option value={0}>Select Place</option>
        {placesList.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="event"
        placeholder="Event"
        value={formState.event}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formState.type}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateStart"
        placeholder="Start Date"
        value={formState.dateStart}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="hourStart"
        placeholder="Start Hour"
        value={formState.hourStart}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dateEnd"
        placeholder="End Date"
        value={formState.dateEnd}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="hourEnd"
        placeholder="End Hour"
        value={formState.hourEnd}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {formState.id ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
};

export default EventForm;
