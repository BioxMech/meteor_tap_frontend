import Home from "../pages/index";
import Form from '../components/form.component';
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";

describe("Main Page", () => {
  it("renders the Main Page", () => {
    render(<Home />);

    // check if all components are rendered
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("weather")).toBeInTheDocument();
  });

  it("Check if dataTime is in correct format", () => {
    const setDateTime = jest.fn()
    render(<Form setDateTime={setDateTime} />);

    // check if adds properly
    const dateInput = screen.getByTestId("date");
    const timeInput = screen.getByTestId("time");
    const viewButton = screen.getByTestId("view");

    fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    fireEvent.change(timeInput, { target: { value: '15:59' } });

    fireEvent.click(viewButton);

    expect(setDateTime).toHaveBeenCalled();
  })
});
