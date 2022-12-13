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
    expect(screen.getByTestId("date")).toBeInTheDocument();
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

  test("activates 'Create' button after filling in all the fields", () => {
    // Arrange
    render(
      <BrowserRouter>
        <NewTrip />
      </BrowserRouter>
    );

    // Act
    // ... nothing
    userEvent.type(screen.getByTestId("date"), new Date().toJSON());
    userEvent.selectOptions(screen.getByTestId("type"), "car");
    userEvent.selectOptions(screen.getByTestId("preferences"), "sightseeing");
    userEvent.type(screen.getByPlaceholderText(/^start$/i), "Warszawa");
    userEvent.keyboard("{enter}");
    userEvent.type(screen.getByPlaceholderText(/^end$/i), "Olsztyn");
    userEvent.keyboard("{enter}");

    // Assert
    expect(screen.getByLabelText(/^Trip date$/)).toBeInTheDocument();
    expect(screen.getByTestId("date")).toHaveDisplayValue(
      new Date().toJSON().split("T")[0]
    );
    expect(screen.getByLabelText(/^Type$/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /^Car trip$/ }).selected).toBe(
      true
    );
    expect(screen.getByRole("option", { name: /^Bike ride$/ }).selected).toBe(
      false
    );
    expect(screen.getByLabelText(/^Preferences$/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /^Sightseeing$/ }).selected).toBe(
      true
    );
    expect(
      screen.getByRole("option", { name: /^Entertainment$/ }).selected
    ).toBe(false);
    expect(screen.getByPlaceholderText(/^start$/i)).toHaveDisplayValue(
      "Warszawa"
    );
    expect(screen.getByPlaceholderText(/^end$/i)).toHaveDisplayValue("Olsztyn");
    expect(screen.getByRole("button", { name: /^Create$/ })).toBeDisabled();
  });
});
