import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { usePlaceContext } from "../../context/PlaceContext";
import styles from "./Place.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

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

  const handleDelete = () => {
    deletePlace(id);
  };

  const ref = useOutsideClick(() => {
    if (showOptions) setShowOptions(false);
  });

  return (
    <div className={styles.place}>
      <div className={styles.placeInfo}>
        {name && <div className={styles.placeField}>{name}</div>}
        {address && <div className={styles.placeField}>{address}</div>}
        {city && <div className={styles.placeField}>{city}</div>}
        {state && <div className={styles.placeField}>{state}</div>}
        {gates && <div className={styles.placeField}>{gates.join(", ")}</div>}
        {lastUpdate && <div className={styles.placeField}>{lastUpdate}</div>}
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
          <div className={styles.placeOptions}>
            <div onClick={handleEdit}>Edit</div>
            <div onClick={handleDelete}>Delete</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Place;
