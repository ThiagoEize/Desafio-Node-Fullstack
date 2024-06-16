import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { usePlaceContext } from "../context/PlaceContext";

interface PlaceProps {
  id: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  gates?: string[];
  lastUpdate?: string;
}

const Place: React.FC<PlaceProps> = ({
  id,
  name,
  address,
  city,
  state,
  gates,
  lastUpdate,
}) => {
  const { deletePlace } = usePlaceContext();
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-place/${id}`);
  };

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
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deletePlace(id)}>Delete</button>
        </div>
      )}
      {name && <h2>{name}</h2>}
      {address && <p>Address: {address}</p>}
      {city && <p>City: {city}</p>}
      {state && <p>State: {state}</p>}
      {gates && <p>gates: {gates.join(", ")}</p>}
      {lastUpdate && <p>Last Update: {lastUpdate}</p>}
    </div>
  );
};

export default Place;
