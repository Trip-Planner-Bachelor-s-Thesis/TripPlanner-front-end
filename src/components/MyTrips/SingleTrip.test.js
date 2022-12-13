import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleTrip from "./SingleTrip";

describe("SingleTrip component", () => {
  test("renders its content correctly", () => {
    // Arrange
    const trip = {
      date: "2022-11-30T00:00:00.000Z",
      preferences: "entertainment",
      type: "car",
    };
    render(
      <BrowserRouter>
        <SingleTrip
          id="-NGTvWu_IyGeBtOr8bXX"
          date="2022-11-30T00:00:00.000Z"
          type="car"
          preferences="entertainment" 
          start="Olsztyn, powiat olsztyński, województwo warmińsko-mazurskie, Polska"
          end="Warszawa, województwo mazowieckie, Polska"
        />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    expect(screen.getByTestId("month")).toHaveTextContent("November");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
    expect(screen.getByTestId("day")).toHaveTextContent("30");
    expect(screen.getByTestId("type")).toHaveTextContent("Car trip");
    expect(screen.getByTestId("preferences")).toHaveTextContent("Entertainment");
    expect(screen.getByTestId("start")).toHaveTextContent("Olsztyn");
    expect(screen.getByTestId("end")).toHaveTextContent("Warszawa");
  });
});
