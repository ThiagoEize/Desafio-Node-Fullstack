import React from "react";
import { useNavigate } from "react-router-dom";
import EventsList from "../eventsList/EventsList";
import EventSearch from "../EventSearch";
import ContentTop from "../contentTop/ContentTop";

const EventsCrud: React.FC = () => {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate("/edit-event/new");
  };

  return (
    <div className="mainContainer">
      <ContentTop
        title="events"
        message="Confira os eventos cadastrados no sistema."
      />
      <div className="backgroundContainer">
        <div>
          <div className="customRowSpace">
            <EventSearch />
            <button onClick={handleAddEvent}>Adicionar evento</button>
          </div>
          <EventsList
            fieldsToDisplay={[
              "placeId",
              "event",
              "type",
              "dateStart",
              "dateEnd",
              "gates",
              "email",
            ]}
            showTitles={true}
            showPagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsCrud;
