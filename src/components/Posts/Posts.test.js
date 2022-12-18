import { render, screen } from "@testing-library/react";
import mockFetch from "../../mocks/mockFetch";
import { BrowserRouter } from "react-router-dom";
import Posts from "./Posts";

describe("Posts component", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders its content correctly", async () => {
    // Arrange
    render(
      <BrowserRouter>
        <Posts />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    const dateInformation = await screen.findByTestId("date");
    const contentInformation = await screen.findByTestId("content");
    const authorInformation = await screen.findByTestId("author");
    expect(dateInformation).toHaveTextContent("4 December 2022");
    expect(contentInformation).toHaveTextContent(
      `There are many variations of passages of Lorem Ipsum available`
    );
    expect(authorInformation).toHaveTextContent("johnsmith96");

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Create post$/ })
    ).toBeInTheDocument();
  });
});