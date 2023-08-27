import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Navbar from "./components/Navbar.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import { ThemeProvider, createTheme } from "@mui/material";
import AddReport from "./pages/AddReport.tsx";
import Report from "./pages/Report.tsx";
import Requests from "./pages/Requests.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-report",
    element: <AddReport />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/report/:id",
    element: <Report />,
  },
  {
    path: "/database",
    element: <Requests />,
  },
]);

const theme = () =>
  createTheme({
    palette: {
      mode: "dark", //let's use the same dark/light mode as the global theme
      //TODO: make background be transparent
      primary: {
        main: "rgb(63 131 248)", //add in a custom color for the toolbar alert background stuff
      },
      info: {
        main: "rgb(255,122,100)", //add in a custom color for the toolbar alert background stuff
      },
    },
    typography: {
      button: {
        textTransform: "none", //customize typography styles for all buttons in table by default
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {},
        },
      },
      MuiSwitch: {
        styleOverrides: {
          thumb: {
            color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
          },
        },
      },
    },
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <div className="dark:bg-background bg-slate-100 overscroll-auto h-screen">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  </ThemeProvider>
);