import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Main Page", () => {
  it("renders the Main Page", () => {
    render(<Home />);

    // check if all components are rendered
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("weather")).toBeInTheDocument();
  });
});
