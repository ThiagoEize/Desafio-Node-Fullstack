import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import { usePlaceContext } from "../context/PlaceContext";
import { useParams, useNavigate } from "react-router-dom";

const EventForm: React.FC = () => {
  const { eventsList, addEvent, updateEvent } = useEventContext();
  const { placesList } = usePlaceContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    id: "",
    placeId: "",
    event: "",
    type: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      const event = eventsList.find((event) => event.id === id);
      if (event) {
        setFormState({
          id: event.id,
          placeId: event.placeId,
          event: event.event,
          type: event.type,
          date: event.date,
        });
      }
    }
  }, [id, eventsList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.id) {
      updateEvent(formState.id, formState);
    } else {
      addEvent({ ...formState, id: Date.now().toString() });
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
        <option value="" disabled>
          Select Place
        </option>
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
        name="date"
        placeholder="Date"
        value={formState.date}
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
