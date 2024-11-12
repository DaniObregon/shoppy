import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNavItem } from "../../../client/src/components/MobileNavItem";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("MobileNavItem component", () => {
  const label = "Sample Label";
  const children = [{ label: "Child 1", path: "/child1" }, { label: "Child 2" }];
  const onClick = jest.fn();
  const onToggle = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render MobileNavItem with correct label", () => {
    render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} />
        </Router>
      </ChakraProvider>
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("should trigger onClick when label is clicked", () => {
    render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} onClick={onClick} />
        </Router>
      </ChakraProvider>
    );

    const labelElement = screen.getByText(label);
    fireEvent.click(labelElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should render children when provided and toggle open state", () => {
    render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} children={children} isOpen={true} onToggle={onToggle} />
        </Router>
      </ChakraProvider>
    );

    children.forEach((child) => {
      expect(screen.getByText(child.label)).toBeInTheDocument();
    });
  });

  test("should toggle icon rotation based on isOpen prop", () => {
    const { rerender } = render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} children={children} isOpen={false} />
        </Router>
      </ChakraProvider>
    );

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveAttribute("aria-expanded", "false");

    rerender(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} children={children} isOpen={true} />
        </Router>
      </ChakraProvider>
    );

    expect(icon).toHaveAttribute("aria-expanded", "true");
  });

  test("should trigger onToggle when icon is clicked", () => {
    render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} children={children} onToggle={onToggle} />
        </Router>
      </ChakraProvider>
    );

    const icon = screen.getByRole("img", { hidden: true });
    fireEvent.click(icon);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <Router>
          <MobileNavItem label={label} children={children} />
        </Router>
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
