import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./components/Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import AddReport from "./pages/AddReports/AddReport.tsx";
import Report from "./pages/Report/Report.tsx";
import Browse from "./pages/Browse/Browse.tsx";
import { TThemeProvider } from "./context/TThemeProvider.tsx";
import NotFound from "./pages/UtilityPages/404.tsx";
import { DataProvider } from "./context/DataContext.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Search from "./pages/Browse/sub-pages/Search.tsx";

export const MUITheme = () =>
  createTheme({
    palette: {
      mode: "light", //let's use the same dark/light mode as the global theme
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
  <ThemeProvider theme={MUITheme}>
    <DataProvider>
      <TThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<App />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/add-report" element={<AddReport />} />
              <Route path="/report/:id" element={<Report />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/search" element={<Search />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TThemeProvider>
    </DataProvider>
  </ThemeProvider>
);
