import Home from "../pages/index";
import Form from '../components/form.component';
import Location from '../components/location.component';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


describe("Main Page", () => {
  it("renders the Main Page", () => {
    render(<Home />);

    // check if all components are rendered
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("weather")).toBeInTheDocument();
  });

  it("Form Component", () => {
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

  it("Location Component", async () => {
    const setSS = jest.fn()
    const trafficData = [
      {
        camera_id: "1701",
        image: "https://images.data.gov.sg/api/traffic-images/2022/09/42826677-8e05-4763-90b1-67b850330db3.jpg",
        location: {
          latitude: 1.27414394350065,
          longitude: 103.851316802547
        },
      },
      {
        camera_id: "1702",
        image: "https://images.data.gov.sg/api/traffic-images/2022/09/42826677-8e05-4763-90b1-67b850330db3.jpg",
        location: {
          latitude: 1.27414394350065,
          longitude: 103.851316802547
        },
      }
    ]
    const setGeolocation = jest.fn()
    render(<Location setSS={setSS} trafficData={trafficData} setGeolocation={setGeolocation} />);

    await waitFor(() => {
      expect(screen.getByTestId("location-footer")).toHaveTextContent("Loading...");
    });

  })
});
