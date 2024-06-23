import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { useEventContext } from "../../context/EventContext";
import styles from "./Event.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import useConfirm from "../../hooks/useConfirm";
import axios from "axios";

interface EventProps {
  id: string;
  placeId?: number;
  event?: string;
  type?: string;
  dateStart?: string;
  dateEnd?: string;
  showGates?: string;
  showTurnstiles?: string;
}

interface Gate {
  id: string;
  placeId: string;
  name: string;
}

interface Turnstile {
  id: string;
  placeId: string;
  name: string;
}

const Event: React.FC<EventProps> = ({
  id,
  placeId,
  event,
  type,
  dateStart,
  dateEnd,
  showGates,
  showTurnstiles,
}) => {
  const { deleteEvent } = useEventContext();
  const [showOptions, setShowOptions] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [gates, setGates] = useState<Gate[]>([]); // State for gates
  const [turnstiles, setTurnstiles] = useState<Turnstile[]>([]); // State for turnstiles
  const navigate = useNavigate();

  const confirm = useConfirm();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeResponse = await axios.get(
          `http://localhost:8080/places/${placeId}`
        );
        console.log("showGates", showGates);
        setPlaceName(placeResponse.data.name);
        showGates && setGates(placeResponse.data.gates);
        showTurnstiles && setTurnstiles(placeResponse.data.turnstiles);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    if (placeId) {
      fetchPlaceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  const handleEdit = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = await confirm("evento", String(event));
    if (isConfirmed) {
      deleteEvent(id);
    }
  };

  const ref = useOutsideClick(() => {
    if (showOptions) setShowOptions(false);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.event}>
      <div className={styles.eventInfo}>
        {placeName && <div className={styles.eventField}>{placeName}</div>}
        {event && <div className={styles.eventField}>{event}</div>}
        {type && <div className={styles.eventField}>{type}</div>}
        {dateStart && (
          <div className={styles.eventField}>
            {formatDate(dateStart)} {formatTime(dateStart)}
          </div>
        )}
        {dateEnd && (
          <div className={styles.eventField}>
            {formatDate(dateEnd)} {formatTime(dateEnd)}
          </div>
        )}
        {showGates && (
          <div className={styles.eventField}>
            {gates.map((gate) => gate.name).join(", ")}
          </div>
        )}
        {showTurnstiles && (
          <div className={styles.eventField}>
            {turnstiles.map((turnstile) => turnstile.name).join(", ")}
          </div>
        )}
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
