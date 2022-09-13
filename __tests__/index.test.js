import Home from "../pages/index";
import Form from '../components/form.component';
import Location from '../components/location.component';
import Screenshot from '../components/screenshot.component';
import Weather from '../components/weather.component';
import "@testing-library/jest-dom";
import { fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react";

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
  it("renders the Main Page", async () => {
    render(<Home />);

    // check if all components are rendered
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("author")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toHaveTextContent("Waiting for the Date and Time...");
  });

  it("Form Component", () => {
    const setDateTime = jest.fn()
    const loadingButton = false;
    const setLoadingButton = jest.fn();
    render(<Form setDateTime={setDateTime} loadingButton={loadingButton} setLoadingButton={setLoadingButton} />);

    // check if adds properly
    const dateInput = screen.getByTestId("date");
    const timeInput = screen.getByTestId("time");
    const viewButton = screen.getByTestId("view");

    // testing Date and Time input types
    // fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    // fireEvent.change(timeInput, { target: { value: '15:59' } });

    // fireEvent.click(viewButton);

    // expect(setDateTime).toHaveBeenCalled();
    // expect(setLoadingButton).toHaveBeenCalled();
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
    ];
    const setLoadingButton = jest.fn();
    
    render(<Location setSS={setSS} trafficData={trafficData} setGeolocation={setGeolocation} setLoadingButton={setLoadingButton} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toHaveTextContent("Putting data into a list...");
  })

  it("Screenshot Component - no initial data", async () => {
    render(<Home />)

    const dateInput = screen.getByTestId("date");
    const timeInput = screen.getByTestId("time");
    const viewButton = screen.getByTestId("view");

    // testing Date and Time input types
    // fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    // fireEvent.change(timeInput, { target: { value: '15:59' } });

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // fireEvent.click(viewButton);

    // expect(screen.getByText("Please select a location")).toBeInTheDocument();
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

    // testing Date and Time input types
    // fireEvent.change(dateInput, { target: { value: '2022-09-08' } });
    // fireEvent.change(timeInput, { target: { value: '15:59' } });

    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // fireEvent.click(viewButton);

    // expect(screen.getByTestId("weather")).toHaveTextContent("Weather ↓Waiting for locations to be generated");
  })

  it("Weather Component", async () => {
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
    const dailyForecast = "Light Shower";
    const fourDayForecast = [{
      date: "2022-09-08",
      forecast: "Pre-dawn light shower, after dawn raining"
    }]
    
    render( <Weather geolocation={geolocation} areaData={areaData} forecastData={forecastData} dailyForecast={dailyForecast} fourDayForecast={fourDayForecast} />);
    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(screen.getByTestId("tab-list")).toBeInTheDocument();
    expect(screen.getByTestId("forecast")).toBeInTheDocument();
    expect(screen.getByTestId("dailyForecast")).toBeInTheDocument();
    expect(screen.getByTestId("fourDayForecast")).toBeInTheDocument();
  })
});
