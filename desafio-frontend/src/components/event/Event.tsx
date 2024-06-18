import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { useEventContext } from "../../context/EventContext";
import styles from "./Event.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import axios from "axios";

interface EventProps {
  id: string;
  placeId?: number;
  event?: string;
  type?: string;
  dateStart?: string;
  hourStart?: string;
  dateEnd?: string;
  hourEnd?: string;
}

const Event: React.FC<EventProps> = ({
  id,
  placeId,
  event,
  type,
  dateStart,
  hourStart,
  dateEnd,
  hourEnd,
}) => {
  const { deleteEvent } = useEventContext();
  const [showOptions, setShowOptions] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/places/${placeId}`
        );
        setPlaceName(response.data.name);
      } catch (error) {
        console.error("Error fetching place name:", error);
      }
    };

    if (placeId) {
      fetchPlaceName();
    }
  }, [placeId]);

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
        {placeName && <div className={styles.eventField}>{placeName}</div>}
        {event && <div className={styles.eventField}>{event}</div>}
        {type && <div className={styles.eventField}>{type}</div>}
        {dateStart && <div className={styles.eventField}>{dateStart}</div>}
        {hourStart && <div className={styles.eventField}>{hourStart}</div>}
        {dateEnd && <div className={styles.eventField}>{dateEnd}</div>}
        {hourEnd && <div className={styles.eventField}>{hourEnd}</div>}
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
            <div onClick={handleEdit}>Edit</div>
            <div onClick={handleDelete}>Delete</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
