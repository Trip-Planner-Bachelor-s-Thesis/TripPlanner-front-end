import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Map from "./Map";

describe("Map component", () => {
  test("renders start and end fields correctly", () => {
    // Arrange
    render(<Map userWaypointsInput={[]} />);

    // Act
    // ... nothing

    // Assert
    expect(screen.getByPlaceholderText(/^start$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^end$/i)).toBeInTheDocument();
  });
}); 
