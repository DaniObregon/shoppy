import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DesktopSubNav } from "../../../client/src/components/main-page/DesktopSubNav";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

// Mock para `useNavigate`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe("DesktopSubNav component", () => {
  let store;
  const initialState = { userInfo: { role_id: null } };
  const userRole1State = { userInfo: { role_id: 1 } };
  const userRole2State = { userInfo: { role_id: 2 } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the desktop sub nav bar with at least one link", () => {
    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopSubNav label="Sample Label" path="/sample-path" />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const navGroups = screen.getAllByRole("group");
    expect(navGroups.length).toBeGreaterThan(0);
  });

  test("should navigate to the correct path when a link is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopSubNav label="Sample Label" path="/sample-path" />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const link = screen.getByRole("group");
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledTimes(1); // Verifica que `navigate` fue llamado
  });

  test("should not navigate if path is not provided", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopSubNav label="Sample Label" />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const link = screen.getByRole("group");
    fireEvent.click(link);
    expect(navigate).not.toHaveBeenCalled(); // Verifica que `navigate` no fue llamado
  });

  test("should render subLabel when provided", () => {
    render(
      <ChakraProvider>
        <Router>
          <DesktopSubNav
            label="Sample Label"
            path="/sample-path"
            subLabel="Sample SubLabel"
          />
        </Router>
      </ChakraProvider>
    );

    const subLabelText = screen.getByText("Sample SubLabel");
    expect(subLabelText).toBeInTheDocument(); // Verifica que `subLabel` se renderiza
  });

  test("should not render subLabel if not provided", () => {
    render(
      <ChakraProvider>
        <Router>
          <DesktopSubNav label="Sample Label" path="/sample-path" />
        </Router>
      </ChakraProvider>
    );

    const subLabelText = screen.queryByText("Sample SubLabel");
    expect(subLabelText).not.toBeInTheDocument(); // Verifica que `subLabel` no se renderiza si no está presente
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <Router>
          <DesktopSubNav label="Sample Label" path="/sample-path" />
        </Router>
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
