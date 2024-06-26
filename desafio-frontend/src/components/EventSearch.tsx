import React, { useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import { useEventSearchContext } from "../context/EventSearchContext";

const EventSearch: React.FC = () => {
  const { fetchEvents, currentPage } = useEventContext();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    orderBy,
    setOrderBy,
    searchField,
    setSearchField,
  } = useEventSearchContext();

  useEffect(() => {
    fetchEvents({
      page: currentPage,
      limit: 10,
      searchTerm: `${searchField}:${debouncedSearchTerm}`,
      orderBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, orderBy, searchField]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        style={{ marginRight: "10px" }}
      >
        <option value="event">Evento</option>
        <option value="type">Tipo</option>
      </select>
      <input
        type="text"
        placeholder={`Busque por ${searchField}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, marginRight: "10px" }}
      />
      <select
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
        style={{ marginRight: "10px" }}
      >
        <option value="event asc">Evento A ... Z</option>
        <option value="event desc">Evento Z ... A</option>
        <option value="type asc">Tipo A ... Z</option>
        <option value="type desc">Tipo Z ... A</option>
        <option value="dateStart asc">Data de início novos ... antigos</option>
        <option value="dateEnd desc">Data de término antigos ... novos</option>
        <option value="createdAt asc">Data de criação novos ... antigos</option>
        <option value="createdAt desc">
          Data de criação antigos ... novos
        </option>
      </select>
    </div>
  );
};

export default EventSearch;
