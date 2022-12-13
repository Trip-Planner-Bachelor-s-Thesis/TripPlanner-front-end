import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogRegisterContext from "../../contexts/log-register-context";
import NavigationBarBootstrap from "./NavigationBarBootstrap";

function renderNavigationBar(context) {
  return render(
    <BrowserRouter>
      <LogRegisterContext.Provider value={context}>
        <NavigationBarBootstrap />
      </LogRegisterContext.Provider>
    </BrowserRouter>
  );
}

describe("NavigationBarBootstrap component", () => {
  test("renders navigation bar correctly in case token is provided", () => {
    const contextValue = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
      firstLogin: false,
      login: (token) => {},
      logout: () => {},
      updateFirstLogin: () => {},
    };
    renderNavigationBar(contextValue);
    expect(
      screen.getByRole("link", { name: /^trip planner$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^all trips$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^my trips$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^create trip$/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /^login$/i })
    ).not.toBeInTheDocument();
  });

  test("renders navigation bar correctly in case token is not provided", () => {
    const contextValue = {
      token: "",
      firstLogin: false,
      login: (token) => {},
      logout: () => {},
      updateFirstLogin: () => {},
    };
    renderNavigationBar(contextValue);
    expect(
      screen.getByRole("link", { name: /^trip planner$/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^login$/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /^all trips$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /^my trips$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /^create trip$/i })
    ).not.toBeInTheDocument();
  });
});
