import React, { useEffect } from "react";
import { usePlaceContext } from "../context/PlaceContext";
import { usePlaceSearchContext } from "../context/PlaceSearchContext";

const PlaceSearch: React.FC = () => {
  const { fetchPlaces, currentPage } = usePlaceContext();
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    orderBy,
    setOrderBy,
    searchField,
    setSearchField,
    limit,
    setLimit,
  } = usePlaceSearchContext();

  useEffect(() => {
    fetchPlaces({
      page: currentPage,
      limit: limit ? limit : 10,
      searchTerm: `${searchField}:${debouncedSearchTerm}`,
      orderBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, orderBy, searchField]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setLimit(Number(e.target.value));
    } else {
      setLimit(undefined);
    }
  };

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
        <option value="name">Nome</option>
        <option value="address">Endereço</option>
        <option value="city">Cidade</option>
        <option value="state">Estado</option>
      </select>
      <input
        type="text"
        placeholder="Digite para buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, marginRight: "10px" }}
      />
      <select
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
        style={{ marginRight: "10px" }}
      >
        <option value="name asc">Nome A ... Z</option>
        <option value="name desc">Nome Z ... A</option>
        <option value="city asc">Cidade A ... Z</option>
        <option value="city desc">Cidade Z ... A</option>
        <option value="address asc">Endereço A ... Z</option>
        <option value="address desc">Endereço Z ... A</option>
      </select>
      <input
        type="number"
        placeholder="Itens por pagina"
        value={limit}
        onChange={(e) => handleLimitChange(e)}
        style={{ flex: 1, marginRight: "10px" }}
      />
    </div>
  );
};

export default PlaceSearch;
