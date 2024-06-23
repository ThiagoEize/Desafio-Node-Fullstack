import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { usePlaceContext } from "../../context/PlaceContext";
import useConfirm from "../../hooks/useConfirm";
import styles from "./Place.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

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

interface PlaceProps {
  id: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  gates?: Gate[];
  turnstiles?: Turnstile[];
  lastUpdate?: string;
}

const Place: React.FC<PlaceProps> = ({
  id,
  name,
  address,
  city,
  state,
  gates,
  turnstiles,
  lastUpdate,
}) => {
  const { deletePlace } = usePlaceContext();
  const [showOptions, setShowOptions] = useState(false);
  const confirm = useConfirm();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-place/${id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = await confirm("lugar", String(name));
    if (isConfirmed) {
      deletePlace(id);
    }
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
        {gates && (
          <div className={styles.placeField}>
            {gates.map((gate) => gate.name).join(", ")}
          </div>
        )}
        {turnstiles && (
          <div className={styles.placeField}>
            {turnstiles.map((turnstile) => turnstile.name).join(", ")}
          </div>
        )}
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
