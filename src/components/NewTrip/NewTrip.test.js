import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NewTrip from "./NewTrip";

describe("NewTrip component", () => {
  test("renders create trip page correctly", () => {
    // Arrange
    render(
      <BrowserRouter>
        <NewTrip />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    expect(screen.getByLabelText(/^Trip date$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Type$/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /^Car trip$/ }).selected).toBe(
      false
    );
    expect(screen.getByRole("option", { name: /^Bike ride$/ }).selected).toBe(
      false
    );
    expect(screen.getByLabelText(/^Preferences$/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Create$/ })).toBeDisabled();
    expect(screen.getByPlaceholderText(/^start$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^end$/i)).toBeInTheDocument();
  });
});
