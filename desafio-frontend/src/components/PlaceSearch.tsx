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
  } = usePlaceSearchContext();

  useEffect(() => {
    fetchPlaces({
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
        <option value="name">Name</option>
        <option value="address">Address</option>
        <option value="city">City</option>
        <option value="state">State</option>
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
        <option value="name asc">Nome ascendente</option>
        <option value="name desc">Nome descendente</option>
        <option value="city asc">Cidade ascendente</option>
        <option value="city desc">Cidade descendente</option>
      </select>
    </div>
  );
};

export default PlaceSearch;
