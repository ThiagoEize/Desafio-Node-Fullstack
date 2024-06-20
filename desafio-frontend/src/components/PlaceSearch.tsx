import React, { useState, useEffect } from "react";
import { usePlaceContext } from "../context/PlaceContext";

const PlaceSearch: React.FC = () => {
  const { fetchPlaces, currentPage } = usePlaceContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [orderBy, setOrderBy] = useState("name asc");
  const [searchField, setSearchField] = useState("name");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1200); // 1200ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchPlaces(
      currentPage,
      10,
      `${searchField}:${debouncedSearchTerm}`,
      orderBy
    );
  }, [debouncedSearchTerm, orderBy, searchField, currentPage, fetchPlaces]);

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
        placeholder={`Search by ${searchField}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1, marginRight: "10px" }}
      />
      <select
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
        style={{ marginRight: "10px" }}
      >
        <option value="name asc">Name Ascending</option>
        <option value="name desc">Name Descending</option>
        <option value="city asc">City Ascending</option>
        <option value="city desc">City Descending</option>
      </select>
    </div>
  );
};

export default PlaceSearch;
