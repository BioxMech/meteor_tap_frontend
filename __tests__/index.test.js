import Home from "../pages/index";
import Form from '../components/form.component';
import Location from '../components/location.component';
import Screenshot from '../components/screenshot.component';
import Weather from '../components/weather.component';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe("Main Page", () => {
  it("renders the Main Page", () => {
    render(<Home />);

    // check if all components are rendered
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("weather")).toBeInTheDocument();
    expect(screen.getByTestId("screenshot")).toBeInTheDocument();
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
    const setGeolocation = jest.fn()
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
    
    render(<Location setSS={setSS} trafficData={trafficData} setGeolocation={setGeolocation} />);

    expect(screen.getByTestId("list")).toBeInTheDocument();
    expect(screen.getByTestId("location-footer")).toBeInTheDocument();
    expect(screen.getByTestId("location-footer")).toHaveTextContent("Loading...");
    
    // await waitFor(() => {
    //   expect(screen.getByText("STRAITS BOULEVARD")).toBeInTheDocument();
    // });
  })

  it("Screenshot Component - no initial data", async () => {
    render(<Home />)

    const dateInput = screen.getByTestId("date");
    const timeInput = screen.getByTestId("time");
    const viewButton = screen.getByTestId("view");

    fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    fireEvent.change(timeInput, { target: { value: '15:59' } });

    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  })

  it("Screenshot Component", () => {
    const dateTime = "2022-09-08T15:59:00Z";
    const ss = "https://images.data.gov.sg/api/traffic-images/2022/09/42826677-8e05-4763-90b1-67b850330db3.jpg";
    render( <Screenshot dateTime={dateTime} ss={ss} />);

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByTestId("ss-image")).toBeInTheDocument();
    expect(screen.getByTestId("ss-image").src).toContain(ss);
  })

  it("Weather Component - no initial data", async () => {
    render(<Home />)

    const dateInput = screen.getByTestId("date");
    const timeInput = screen.getByTestId("time");
    const viewButton = screen.getByTestId("view");

    fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    fireEvent.change(timeInput, { target: { value: '15:59' } });

    fireEvent.click(viewButton);

    expect(screen.getByTestId("weather")).toHaveTextContent("");
  })

  it("Weather Component", () => {
    const geolocation = {
      lat: 1.27414394350065,
      lon: 103.851316802547
    }
    const areaData = [
      {
        label_location: {
          latitude: 1.27414394350065,
          longitude: 103.851316802547
        }
      }
    ]
    const forecastData = [
      {
        area: "Bedok",
        forecast: "Light shower"
      }
    ]
    
    render( <Weather geolocation={geolocation} areaData={areaData} forecastData={forecastData} />);

    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(screen.getByTestId("weather-details")).toHaveTextContent("Area: BedokForecast: Light shower");
  })
});
