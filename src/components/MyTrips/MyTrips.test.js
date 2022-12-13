import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import mockFetch from "../../mocks/mockFetch";
import MyTrips from "./MyTrips";

describe("MyTrips component", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders my trips page correctly", async () => {
    // Arrange
    render(
      <BrowserRouter>
        <MyTrips />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    const createdFutureButton = await screen.findByRole("tab", {
      name: /^Created future trips$/,
    });
    const joinedFutureButton = await screen.findByRole("tab", {
      name: /^Joined future trips$/,
    });
    const createdPastButton = await screen.findByRole("tab", {
      name: /^Created past trips$/,
    });
    const joinedPastButton = await screen.findByRole("tab", {
      name: /^Joined past trips$/,
    });
    expect(createdFutureButton).toBeInTheDocument();
    expect(joinedFutureButton).toBeInTheDocument();
    expect(createdPastButton).toBeInTheDocument();
    expect(joinedPastButton).toBeInTheDocument();
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
