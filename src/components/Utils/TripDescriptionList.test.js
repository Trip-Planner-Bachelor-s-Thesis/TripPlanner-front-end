import { render, screen } from "@testing-library/react";
import TripDescriptionList from "./TripDescriptionList";

describe("TripDescriptionList component", () => {
  test("renders its content correctly", () => {
    // Arrange
    const trip = {
      date: "2022-11-30T00:00:00.000Z",
      preferences: "entertainment",
      type: "car",
    };
    render(
      <TripDescriptionList
        type="car"
        preferences="entertainment"
        start="Olsztyn, powiat olsztyński, województwo warmińsko-mazurskie, Polska"
        end="Warszawa, województwo mazowieckie, Polska"
      />
    );

    // Act
    // ... nothing

    // Assert
    expect(screen.getByTestId("type")).toHaveTextContent("Car trip");
    expect(screen.getByTestId("preferences")).toHaveTextContent("Entertainment");
    expect(screen.getByTestId("start")).toHaveTextContent("Olsztyn");
    expect(screen.getByTestId("end")).toHaveTextContent("Warszawa");
  });
});
