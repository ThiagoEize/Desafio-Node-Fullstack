import React, { useState, useEffect } from "react";
import { usePlaceContext } from "../context/PlaceContext";
import { useParams, useNavigate } from "react-router-dom";

const PlaceForm: React.FC = () => {
  const { placesList, addPlace, updatePlace } = usePlaceContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    gates: "",
    lastUpdate: "",
  });

  useEffect(() => {
    if (id) {
      const place = placesList.find((place) => place.id === id);
      if (place) {
        setFormState({
          id: place.id,
          name: place.name,
          address: place.address,
          city: place.city,
          state: place.state,
          gates: place.gates.join(", "),
          lastUpdate: place.lastUpdate,
        });
      }
    }
  }, [id, placesList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gatesArray = formState.gates.split(",").map((gate) => gate.trim());
    const placeData = { ...formState, gates: gatesArray };

    if (formState.id) {
      updatePlace(formState.id, placeData);
    } else {
      addPlace({ ...placeData, id: Date.now().toString() });
    }

    navigate("/places"); // Navigate back to the places list after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formState.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formState.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formState.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gates"
        placeholder="gates (comma separated)"
        value={formState.gates}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="lastUpdate"
        placeholder="Last Update"
        value={formState.lastUpdate}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {formState.id ? "Update Place" : "Add Place"}
      </button>
    </form>
  );
};

export default PlaceForm;
