import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useEventContext } from "../context/EventContext";
import { usePlaceContext } from "../context/PlaceContext";

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

  const place = placesList.find((place) => place.id === placeId);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        position: "relative",
      }}
    >
      <div
        onClick={() => setShowOptions(!showOptions)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      >
        <FaEllipsisV />
      </div>
      {showOptions && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "10px",
            background: "white",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <button onClick={() => console.log(`Edit ${id}`)}>Edit</button>
          <button onClick={() => deleteEvent(id)}>Delete</button>
        </div>
      )}
      {event && <h2>{event}</h2>}
      {place && <p>Place: {place.name}</p>}
      {type && <p>Type: {type}</p>}
      {date && <p>Date: {date}</p>}
    </div>
  );
};

export default Event;
