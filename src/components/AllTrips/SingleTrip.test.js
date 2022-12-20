import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleTrip from "./SingleTrip";

describe("SingleTrip component", () => {
  test("renders its content correctly", () => {
    // Arrange
    const trip = {
      tripId: 1,
      date: "2022-11-30T00:00:00.000Z",
      preferences: ["Entertainment"],
      type: "car",
      waypoints: [
        {
          lat: 52.231956,
          lng: 21.006725,
          name: "Olsztyn, powiat olsztyński, województwo warmińsko-mazurskie, Polska",
        },
        {
          lat: 52.231956,
          lng: 21.006725,
          name: "Warszawa, województwo mazowieckie, Polska",
        },
      ],
    };
    render(
      <BrowserRouter>
        <SingleTrip tripData={trip} />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    expect(screen.getByTestId("month")).toHaveTextContent("November");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
    expect(screen.getByTestId("day")).toHaveTextContent("30");
    expect(screen.getByTestId("type")).toHaveTextContent("Car trip");
    expect(screen.getByTestId("start")).toHaveTextContent("Olsztyn");
    expect(screen.getByTestId("end")).toHaveTextContent("Warszawa");
  });
});
