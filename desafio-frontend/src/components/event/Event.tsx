import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { useEventContext } from "../../context/EventContext";
import { usePlaceContext } from "../../context/PlaceContext";
import styles from "./Event.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

interface EventProps {
  id: string;
  placeId: string;
  event?: string;
  type?: string;
  date?: string;
}

const Event: React.FC<EventProps> = ({ id, placeId, event, type, date }) => {
  const { deleteEvent } = useEventContext();
  const { placesList } = usePlaceContext();
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const place = placesList.find((place) => place.id === placeId);

  const handleEdit = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDelete = () => {
    deleteEvent(id);
  };

  const ref = useOutsideClick(() => {
    if (showOptions) setShowOptions(false);
  });

  return (
    <div className={styles.event}>
      <div className={styles.eventInfo}>
        {event && <div className={styles.eventField}>{event}</div>}
        {place && <div className={styles.eventField}>{place.name}</div>}
        {type && <div className={styles.eventField}>{type}</div>}
        {date && <div className={styles.eventField}>{date}</div>}
      </div>
      <div ref={ref} style={{ position: "relative" }}>
        <div
          onClick={() => setShowOptions(!showOptions)}
          style={{ cursor: "pointer" }}
          role="button"
          aria-label="options"
        >
          <FaEllipsisV />
        </div>
        {showOptions && (
          <div className={styles.eventOptions}>
            <div onClick={handleEdit} role="button">
              Edit
            </div>
            <div onClick={handleDelete} role="button">
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
