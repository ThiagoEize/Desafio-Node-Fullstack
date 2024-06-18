// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "./Event";
import { useEventContext, EventProvider } from "../../context/EventContext";
import { PlaceProvider } from "../../context/PlaceContext";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const event = {
  id: "1",
  placeId: "1",
  event: "Test Event",
  type: "Test Type",
  date: "2023-01-01",
};

const place = {
  id: "1",
  name: "Test Place",
};

// const renderComponent = () =>
//   render(
//     <EventProvider>
//       <PlaceProvider>
//         <Event {...event} />
//       </PlaceProvider>
//     </EventProvider>
//   );

test("renders Event component with all fields", () => {
  // renderComponent();

  expect(screen.getByText("Test Event")).toBeInTheDocument();
  expect(screen.getByText("Test Place")).toBeInTheDocument();
  expect(screen.getByText("Test Type")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
});

test("opens options menu when ellipsis icon is clicked", () => {
  // renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));

  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
});

test("navigates to edit page when Edit is clicked", () => {
  // renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));
  fireEvent.click(screen.getByText("Edit"));

  expect(mockNavigate).toHaveBeenCalledWith("/edit-event/1");
});

test("calls deleteEvent when Delete is clicked", () => {
  // renderComponent();

  fireEvent.click(screen.getByRole("button", { name: /options/i }));
  fireEvent.click(screen.getByText("Delete"));

  const { deleteEvent } = useEventContext();
  expect(deleteEvent).toHaveBeenCalledWith("1");
});
