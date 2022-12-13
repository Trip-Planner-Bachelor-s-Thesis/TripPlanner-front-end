import { render, screen } from "@testing-library/react";
import mockFetch from "../../mocks/mockFetch";
import { BrowserRouter } from "react-router-dom";
import AllTrips from "./AllTrips";

describe("AllTrips component", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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
    const startDateLabel = await screen.findByLabelText(/^Start date$/);
    const endDateLabel = await screen.findByLabelText(/^End date$/);
    expect(startDateLabel).toBeInTheDocument();
    expect(endDateLabel).toBeInTheDocument();
    expect(screen.getByLabelText(/^Trip type$/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /^Car trip$/ }).selected).toBe(
      false
    );
    expect(screen.getByRole("option", { name: /^Bike ride$/ }).selected).toBe(
      false
    );
    expect(screen.getByLabelText(/^Trip preferences$/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Filter$/ })).toBeEnabled();
    expect(screen.getByRole("button", { name: /^Reset$/ })).toBeEnabled();
    expect(screen.getByTestId("month")).toHaveTextContent("November");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
    expect(screen.getByTestId("day")).toHaveTextContent("30");
    expect(screen.getByTestId("type")).toHaveTextContent("Car trip");
    expect(screen.getByTestId("preferences")).toHaveTextContent("Entertainment");
    expect(screen.getByTestId("start")).toHaveTextContent("Olsztyn");
    expect(screen.getByTestId("end")).toHaveTextContent("Warszawa");
    expect(screen.getByRole("link", {name: "Show details"})).toBeInTheDocument();
  });
});