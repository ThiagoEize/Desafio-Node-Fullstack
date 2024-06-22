import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  // useEffect,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  placeId: number;
  event: string;
  type: string;
  dateStart: string;
  dateEnd: string;
}

interface EventContextType {
  eventsList: Event[];
  totalEvents: number;
  currentPage: number;
  fetchEvents: (
    page: number,
    limit: number,
    searchTerm: string,
    orderBy: string
  ) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchEvents = async (
    page: number,
    limit: number,
    searchTerm: string,
    orderBy: string
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/events?page=${page}&limit=${limit}&order=${orderBy}&search=${searchTerm}`
      );
      setEventsList(response.data.data);
      setTotalEvents(response.data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async (event: Event) => {
    try {
      await axios.post(`http://localhost:8080/events`, event);
      setEventsList((prevEvents) => [event, ...prevEvents]);
      setTotalEvents((prevTotal) => prevTotal + 1);

      navigate("/events");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const updateEvent = async (id: string, updatedEvent: Event) => {
    try {
      const newUdatedEvent = {
        ...updatedEvent,
        placeId: Number(updatedEvent.placeId),
      };
      await axios.put(`http://localhost:8080/events/${id}`, newUdatedEvent);
      setEventsList((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      );

      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      setEventsList((prevEvents) =>
        prevEvents.filter((event) => event.id !== id)
      );
      setTotalEvents((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // useEffect(() => {
  //   fetchEvents(1, 10, "", "event asc");
  // }, []);

  return (
    <EventContext.Provider
      value={{
        eventsList,
        totalEvents,
        currentPage,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

export { EventProvider, useEventContext };
