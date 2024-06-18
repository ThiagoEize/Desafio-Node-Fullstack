import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";

const EventForm: React.FC = () => {
  const { eventsList, addEvent, updateEvent, fetchEvents } = useEventContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    id: "",
    placeId: "",
    event: "",
    type: "",
    dateStart: "",
    hourStart: "",
    dateEnd: "",
    hourEnd: "",
  });

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
          hourStart: event.hourStart,
          dateEnd: formatDate(event.dateEnd),
          hourEnd: event.hourEnd,
        });
      }
    }
  }, [id, eventsList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { ...formState };

    if (formState.id) {
      updateEvent(formState.id, eventData);
    } else {
      addEvent({ ...eventData, id: Date.now().toString() });
    }

    navigate("/events"); // Navigate back to the events list after submission
  };

  return (
    <form onSubmit={handleSubmit}>
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
        type="text"
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
        type="text"
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
