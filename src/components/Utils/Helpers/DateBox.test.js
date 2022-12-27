import { render, screen } from "@testing-library/react";
import DateBox from "./DateBox";

describe("DateBox component", () => {
  test("renders its content correctly", () => {
    // Arrange
    render(<DateBox date="2022-11-30T00:00:00.000Z" />);

    // Act
    // ... nothing

    // Assert
    expect(screen.getByTestId("month")).toHaveTextContent("November");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
    expect(screen.getByTestId("day")).toHaveTextContent("30");
  });
});
