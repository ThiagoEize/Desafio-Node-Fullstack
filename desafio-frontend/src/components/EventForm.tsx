import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { usePlaceContext } from "../context/PlaceContext";

interface EventFormProps {
  eventId?: string;
  initialData?: {
    placeId?: string;
    event?: string;
    type?: string;
    date?: string;
  };
  onSubmit: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  eventId,
  initialData,
  onSubmit,
}) => {
  const { addEvent, updateEvent } = useEventContext();
  const { placesList } = usePlaceContext();
  const [formState, setFormState] = useState({
    id: eventId || "",
    placeId: initialData?.placeId || "",
    event: initialData?.event || "",
    type: initialData?.type || "",
    date: initialData?.date || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventId) {
      updateEvent(eventId, formState as any); // Type assertion to match updateEvent signature
    } else {
      addEvent({ ...formState, id: Date.now().toString() });
    }
    onSubmit();
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
      <button type="submit">{eventId ? "Update Event" : "Add Event"}</button>
    </form>
  );
};

export default EventForm;
