import React, { useState, useEffect } from "react";
import { usePlaceContext } from "../context/PlaceContext";
import { useParams } from "react-router-dom";
import useConfirm from "../hooks/useConfirm";

interface Gate {
  id?: string;
  placeId?: string;
  name: string;
}

interface Turnstile {
  id?: string;
  placeId?: string;
  name: string;
}

interface PlaceFormState {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  gates: Gate[];
  turnstiles: Turnstile[];
}

const PlaceForm: React.FC = () => {
  const { placesList, addPlace, updatePlace } = usePlaceContext();
  const { id } = useParams<{ id: string }>();
  const [formState, setFormState] = useState<PlaceFormState>({
    id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    gates: [],
    turnstiles: [],
  });
  const [newGateName, setNewGateName] = useState("");
  const [newTurnstileName, setNewTurnstileName] = useState("");
  const confirm = useConfirm();

  useEffect(() => {
    if (id) {
      const place = placesList.find((place) => place.id.toString() === id);
      if (place) {
        setFormState({
          id: place.id,
          name: place.name,
          address: place.address,
          city: place.city,
          state: place.state,
          gates: place.gates,
          turnstiles: place.turnstiles,
        });
      }
    }
  }, [id, placesList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleGateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGateName(e.target.value);
  };

  const handleTurnstileNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTurnstileName(e.target.value);
  };

  const addGate = () => {
    if (newGateName.trim()) {
      const newGate: Gate = {
        name: newGateName.trim(),
      };
      setFormState((prev) => ({
        ...prev,
        gates: [...prev.gates, newGate],
      }));
      setNewGateName("");
    }
  };

  const addTurnstile = () => {
    if (newTurnstileName.trim()) {
      const newTurnstile: Turnstile = {
        name: newTurnstileName.trim(),
      };
      setFormState((prev) => ({
        ...prev,
        turnstiles: [...prev.turnstiles, newTurnstile],
      }));
      setNewTurnstileName("");
    }
  };

  const removeGate = async (gateName?: string) => {
    const isConfirmed = await confirm("portão", String(gateName));
    if (isConfirmed) {
      setFormState((prev) => ({
        ...prev,
        gates: prev.gates.filter((gate) => gate.name !== gateName),
      }));
    }
  };

  const removeTurnstile = async (turnstileName?: string) => {
    const isConfirmed = await confirm("catraca", String(turnstileName));
    if (isConfirmed) {
      setFormState((prev) => ({
        ...prev,
        turnstiles: prev.turnstiles.filter(
          (turnstile) => turnstile.name !== turnstileName
        ),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const placeData = {
      ...formState,
      gates: formState.gates.map((gate) => ({ id: gate.id, name: gate.name })),
      turnstiles: formState.turnstiles.map((turnstile) => ({
        id: turnstile.id,
        name: turnstile.name,
      })),
    };
    if (formState.id) {
      updatePlace(formState.id, placeData);
    } else {
      addPlace({ ...placeData, id: Date.now().toString() });
    }
  };

  return (
    <div className="formContainer">
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
        <div>
          <input
            type="text"
            placeholder="Add a gate"
            value={newGateName}
            onChange={handleGateNameChange}
          />
          <button type="button" onClick={addGate}>
            +
          </button>
        </div>
        <div>
          {formState.gates.map((gate) => (
            <div key={gate.id ?? gate.name}>
              {gate.name}
              <button type="button" onClick={() => removeGate(gate.name)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Add a turnstile"
            value={newTurnstileName}
            onChange={handleTurnstileNameChange}
          />
          <button type="button" onClick={addTurnstile}>
            +
          </button>
        </div>
        <div>
          {formState.turnstiles.map((turnstile) => (
            <div key={turnstile.id ?? turnstile.name}>
              {turnstile.name}
              <button
                type="button"
                onClick={() => removeTurnstile(turnstile.name)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button type="submit">
          {formState.id ? "Update Place" : "Add Place"}
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
