import { render, screen } from "@testing-library/react";
import DropdownList from "./DropdownList";

describe("DropdownList component", () => {
  test("renders list of dropdowns correctly", () => {
    // Arrange
    render(<DropdownList />);

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
  });
});
