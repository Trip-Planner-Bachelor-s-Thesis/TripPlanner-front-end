import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LogRegisterForm from "./LogRegisterForm";

describe("LogRegisterForm component", () => {
  test("renders login form correctly", () => {
    // Arrange
    render(
      <BrowserRouter>
        <LogRegisterForm />
      </BrowserRouter>
    );

    // Act
    // ... nothing

    // Assert
    expect(screen.getByRole("heading")).toHaveTextContent(/^Login$/);
    expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Login$/ })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Don't have an account yet\?$/ })
    ).toBeInTheDocument();
  });

  test("renders sing up form correctly", () => {
    // Arrange
    render(
      <BrowserRouter>
        <LogRegisterForm />
      </BrowserRouter>
    );

    // Act
    userEvent.click(
      screen.getByRole("button", { name: /^Don't have an account yet\?$/ })
    );

    // Assert
    expect(screen.getByRole("heading")).toHaveTextContent(/^Sign up$/);
    expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Create$/ })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Login with existing account$/ })
    ).toBeInTheDocument();
  });
});
