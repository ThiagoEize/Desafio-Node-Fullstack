import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventsList from "../eventsList/EventsList";
import EventSearch from "../EventSearch";
import ContentTop from "../contentTop/ContentTop";
import FieldsModal from "../FieldsModal";

interface Field {
  key: string;
  name: string;
}

const EventsCrud: React.FC = () => {
  const [eventFieldsToDisplay, setEventFieldsToDisplay] = useState<Field[]>([
    { key: "placeId", name: "Nome do local" },
    { key: "event", name: "Evento" },
    { key: "type", name: "Tipo" },
    { key: "dateStart", name: "Data de início" },
    { key: "dateEnd", name: "Data de término" },
    { key: "gates", name: "Portões cadastrados" },
    { key: "email", name: "Email" },
  ]);
  const [availableEventFields, setAvailableEventFields] = useState<Field[]>([
    { key: "turnstiles", name: "Catracas cadastradas" },
    { key: "phone", name: "Celular" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEventFieldsToDisplay = localStorage.getItem(
      "eventFieldsToDisplay"
    );
    const savedAvailableEventFields = localStorage.getItem(
      "availableEventFields"
    );
    if (savedEventFieldsToDisplay && savedAvailableEventFields) {
      setEventFieldsToDisplay(JSON.parse(savedEventFieldsToDisplay));
      setAvailableEventFields(JSON.parse(savedAvailableEventFields));
    }
  }, []);

  const handleAddEvent = () => {
    navigate("/edit-event/new");
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
            <button onClick={handleShowModal}>Modifique a visualização</button>
            <button onClick={handleAddEvent}>Adicionar evento</button>
          </div>
          <EventsList
            fieldsToDisplay={eventFieldsToDisplay}
            showTitles={true}
            showPagination={true}
          />
        </div>
      </div>
      <FieldsModal
        show={showModal}
        handleClose={handleCloseModal}
        eventFieldsToDisplay={eventFieldsToDisplay}
        setEventFieldsToDisplay={setEventFieldsToDisplay}
        availableEventFields={availableEventFields}
        setAvailableEventFields={setAvailableEventFields}
      />
    </div>
  );
};

export default EventsCrud;
