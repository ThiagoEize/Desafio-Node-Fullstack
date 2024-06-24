import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useHelperContext } from "../context/HelperContext";
import ContentTop from "./contentTop/ContentTop";
import styles from "./EventForm.module.css";

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

  const { showResponse } = useHelperContext();

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
        const startDate = new Date(event.dateStart);
        const endDate = new Date(event.dateEnd);
        setFormState({
          id: event.id,
          placeId: event.placeId,
          event: event.event,
          type: event.type,
          dateStart: formatDate(startDate),
          hourStart: formatTime(startDate),
          dateEnd: formatDate(endDate),
          hourEnd: formatTime(endDate),
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
      [name]: value,
    }));
  };

  const handleMaskedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    maskFunction: (value: string) => string
  ) => {
    const { name, value } = e.target;
    const maskedValue = maskFunction(value);
    setFormState((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateStart = `${formatISODate(formState.dateStart)}T${
      formState.hourStart
    }:00`;
    const formattedDateEnd = `${formatISODate(formState.dateEnd)}T${
      formState.hourEnd
    }:00`;

    console.log("formattedDateStart:", formattedDateStart);
    console.log("formattedDateEnd:", formattedDateEnd);

    try {
      const eventData = {
        ...formState,
        placeId: Number(formState.placeId),
        dateStart: new Date(formattedDateStart).toISOString(),
        dateEnd: new Date(formattedDateEnd).toISOString(),
      };

      if (formState.id) {
        updateEvent(formState.id, eventData);
      } else {
        addEvent({ ...eventData, id: Date.now().toString() });
      }
    } catch (error) {
      showResponse("Erro", "Data ou horas inválidas");
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatISODate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
  };

  const maskTime = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(\d{2})\d+?$/, "$1");
  };

  return (
    <div className="formContainer">
      <ContentTop
        title="edit-event"
        message="Confira os eventos cadastrados no sistema."
      />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            className={`col-5 ${styles.formInput}`}
            type="text"
            name="event"
            placeholder="Event"
            value={formState.event}
            onChange={handleChange}
            required
          />
          <input
            className={`col-5 float-right ${styles.formInput}`}
            type="text"
            name="type"
            placeholder="Type"
            value={formState.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <input
            className={`col-5 ${styles.formInput}`}
            type="text"
            name="dateStart"
            placeholder="Start Date (dd/mm/yyyy)"
            value={formState.dateStart}
            onChange={(e) => handleMaskedChange(e, maskDate)}
            required
          />
          <input
            className={`col-5 float-right ${styles.formInput}`}
            type="text"
            name="hourStart"
            placeholder="Start Hour (hh:mm)"
            value={formState.hourStart}
            onChange={(e) => handleMaskedChange(e, maskTime)}
            required
          />
        </div>
        <div className="row">
          <input
            className={`col-5 ${styles.formInput}`}
            type="text"
            name="dateEnd"
            placeholder="End Date (dd/mm/yyyy)"
            value={formState.dateEnd}
            onChange={(e) => handleMaskedChange(e, maskDate)}
            required
          />
          <input
            className={`col-5 float-right ${styles.formInput}`}
            type="text"
            name="hourEnd"
            placeholder="End Hour (hh:mm)"
            value={formState.hourEnd}
            onChange={(e) => handleMaskedChange(e, maskTime)}
            required
          />
        </div>

        <div className={`form-group ${styles.formInput}`}>
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
          <Link to="/edit-place/new">Cadastrar local</Link>
        </div>
        <button type="submit">
          {formState.id ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
