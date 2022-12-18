import { render, screen } from "@testing-library/react";
import TripInformationSingle from "./TripInformationSingle";

describe("TripInformationSingle component", () => {
  test("renders its content correctly", () => {
    // Arrange
    const trip = {
      date: "2022-11-30T00:00:00.000Z",
      preferences: "entertainment",
      type: "car",
    };
    render(<TripInformationSingle tripData={trip} />);

    // Act
    // ... nothing

    // Assert
    expect(screen.getByLabelText(/^Trip date$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Type$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Preferences$/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: "Trip date"})).toBeDisabled();
    expect(screen.getByRole("textbox", {name: "Type"})).toBeDisabled();
    expect(screen.getByRole("textbox", {name: "Preferences"})).toBeDisabled();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
  });
});
