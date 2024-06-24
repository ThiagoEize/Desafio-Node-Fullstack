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
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
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

  const handleOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY - 60,
      left: rect.left + window.scrollX - 96,
    });
    setShowOptions(!showOptions);
  };

  return (
    <>
      <tr className={styles.place}>
        {name !== undefined && <td>{name}</td>}
        {address !== undefined && <td>{address}</td>}
        {city !== undefined && <td>{city}</td>}
        {state !== undefined && <td>{state}</td>}
        {gates !== undefined && (
          <td>{gates.map((gate) => gate.name).join(", ")}</td>
        )}
        {turnstiles !== undefined && (
          <td>{turnstiles.map((turnstile) => turnstile.name).join(", ")}</td>
        )}
        {lastUpdate !== undefined && <td>{lastUpdate}</td>}
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
          className={styles.placeOptions}
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

export default Place;
