import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Place from "../../components/place/Place";
import { PlaceProvider } from "../../context/PlaceContext";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const place = {
  id: "1",
  name: "Test Place",
  address: "123 Test St",
  city: "Test City",
  state: "TS",
  gates: [],
  lastUpdate: "2023-01-01",
};

const renderComponent = () =>
  render(
    <PlaceProvider>
      <Place {...place} />
    </PlaceProvider>
  );

test("renders Place component with all fields", () => {
  renderComponent();

  expect(screen.getByText("Test Place")).toBeInTheDocument();
  expect(screen.getByText("123 Test St")).toBeInTheDocument();
  expect(screen.getByText("Test City")).toBeInTheDocument();
  expect(screen.getByText("TS")).toBeInTheDocument();
  expect(screen.getByText("Gate1, Gate2")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
});

test("opens options menu when ellipsis icon is clicked", () => {
  renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));

  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
});

test("navigates to edit page when Edit is clicked", () => {
  renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));
  fireEvent.click(screen.getByText("Edit"));

  expect(mockNavigate).toHaveBeenCalledWith("/edit-place/1");
});

test("calls deletePlace when Delete is clicked", () => {
  const deletePlaceMock = jest.fn();

  jest.spyOn(React, "useContext").mockImplementation(() => ({
    placesList: [],
    addPlace: jest.fn(),
    updatePlace: jest.fn(),
    deletePlace: deletePlaceMock,
  }));

  renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));
  fireEvent.click(screen.getByText("Delete"));

  expect(deletePlaceMock).toHaveBeenCalledWith("1");
});
