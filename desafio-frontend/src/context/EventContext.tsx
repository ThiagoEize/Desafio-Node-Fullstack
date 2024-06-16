// EventContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for an event
interface Event {
  id: string;
  placeId: string;
  event: string;
  type: string;
  date: string;
}

// Define the context type
interface EventContextType {
  eventsList: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
}

// Create the context with default values
const EventContext = createContext<EventContextType | undefined>(undefined);

// Create the provider component
const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eventsList, setEventsList] = useState<Event[]>([
    {
      id: "1",
      placeId: "1",
      event: "Event 1",
      type: "Type 1",
      date: "2023-01-01",
    },
    {
      id: "2",
      placeId: "2",
      event: "Event 2",
      type: "Type 2",
      date: "2023-01-02",
    },
    {
      id: "3",
      placeId: "3",
      event: "Event 3",
      type: "Type 3",
      date: "2023-01-03",
    },
    {
      id: "4",
      placeId: "4",
      event: "Event 4",
      type: "Type 4",
      date: "2023-01-04",
    },
    {
      id: "5",
      placeId: "5",
      event: "Event 5",
      type: "Type 5",
      date: "2023-01-05",
    },
    {
      id: "6",
      placeId: "6",
      event: "Event 6",
      type: "Type 6",
      date: "2023-01-06",
    },
    {
      id: "7",
      placeId: "7",
      event: "Event 7",
      type: "Type 7",
      date: "2023-01-07",
    },
    {
      id: "8",
      placeId: "8",
      event: "Event 8",
      type: "Type 8",
      date: "2023-01-08",
    },
    {
      id: "9",
      placeId: "9",
      event: "Event 9",
      type: "Type 9",
      date: "2023-01-09",
    },
    {
      id: "10",
      placeId: "10",
      event: "Event 10",
      type: "Type 10",
      date: "2023-01-10",
    },
  ]);

  const addEvent = (event: Event) => {
    setEventsList((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (id: string, updatedEvent: Event) => {
    setEventsList((prevEvents) =>
      prevEvents.map((event) => (event.id === id ? updatedEvent : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEventsList((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  };

  return (
    <EventContext.Provider
      value={{ eventsList, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the EventContext
const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};

export { EventProvider, useEventContext };
