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
  style?: React.CSSProperties;
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
  style,
}) => {
  const { deleteEvent } = useEventContext();
  const [showOptions, setShowOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [placeName, setPlaceName] = useState<string>("");
  const [gates, setGates] = useState<Gate[]>([]);
  const [turnstiles, setTurnstiles] = useState<Turnstile[]>([]);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        console.log(showGates, showTurnstiles);
        const placeResponse = await axios.get(
          `http://localhost:8080/places/${placeId}`
        );
        setPlaceName(placeResponse.data.name);
        if (showGates) {
          setGates(placeResponse.data.gates);
        }
        if (showTurnstiles) {
          setTurnstiles(placeResponse.data.turnstiles);
        }
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    if (placeId) {
      fetchPlaceData();
    }
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

  const handleOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY - 60,
      left: rect.left + window.scrollX - 96,
    });
    setShowOptions(!showOptions);
  };

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
    <>
      <tr className={styles.event} style={style}>
        {placeId !== undefined && placeName && <td>{placeName}</td>}
        {event !== undefined && <td>{event}</td>}
        {type !== undefined && <td>{type}</td>}
        {dateStart !== undefined && (
          <td>
            {formatDate(dateStart)} {formatTime(dateStart)}
          </td>
        )}
        {dateEnd !== undefined && (
          <td>
            {formatDate(dateEnd)} {formatTime(dateEnd)}
          </td>
        )}
        {showGates !== undefined && (
          <td>{gates.map((gate) => gate.name).join(", ")}</td>
        )}
        {showTurnstiles !== undefined && (
          <td>{turnstiles.map((turnstile) => turnstile.name).join(", ")}</td>
        )}
        <td>
          <div
            onClick={handleOptionsClick}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="options"
          >
            <FaEllipsisV />
          </div>
        </td>
      </tr>
      {showOptions && (
        <div
          ref={ref}
          className={styles.eventOptions}
          style={{
            position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          <div onClick={handleEdit}>Edit</div>
          <div onClick={handleDelete}>Delete</div>
        </div>
      )}
    </>
  );
};

export default Event;
