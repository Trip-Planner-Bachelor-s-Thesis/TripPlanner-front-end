import { render, screen } from "@testing-library/react";
import TripInformationChat from "./TripInformationChat";

describe("TripInformationChat component", () => {
  test("renders its content correctly", () => {
    // Arrange
    const trip = {
      date: "2022-11-30T00:00:00.000Z",
      preferences: ["Entertainment"],
      creator: { userName: "admin", userRating: 3.5 },
      type: "car",
    };
    render(<TripInformationChat tripData={trip} />);

    // Act
    // ... nothing

    // Assert
    expect(screen.getByTestId("trip-date")).toHaveTextContent(
      "Trip date: 30.11.2022"
    );
    expect(screen.getByTestId("trip-type")).toHaveTextContent(
      "Trip type: Car trip"
    );
  });
});
