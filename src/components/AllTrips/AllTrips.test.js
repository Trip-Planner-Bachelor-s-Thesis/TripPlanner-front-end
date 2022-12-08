import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AllTrips from "./AllTrips";

describe("AllTrips component", () => {
  test("renders all trips page correctly", async () => {
    // Arrange
    render(
      <BrowserRouter>
        <AllTrips />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    const startDateElement = await screen.findByLabelText(/^Start date$/);
    expect(startDateElement).toBeInTheDocument();
    // expect(screen.getByLabelText(/^End date$/)).toBeInTheDocument();
    // expect(screen.getByLabelText(/^Trip type$/)).toBeInTheDocument();
    // expect(screen.getByRole("option", { name: /^Car trip$/ }).selected).toBe(
    //   false
    // );
    // expect(screen.getByRole("option", { name: /^Bike ride$/ }).selected).toBe(
    //   false
    // );
    // expect(screen.getByLabelText(/^Trip preferences$/)).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /^Filter$/ })).toBeEnabled();
    // expect(screen.getByRole("button", { name: /^Reset$/ })).toBeEnabled();
  });
});
