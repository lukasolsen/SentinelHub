import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./components/Layout.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import AddReport from "./pages/AddReports/AddReport.tsx";
import Report from "./pages/Report/Report.tsx";
import Browse from "./pages/Browse/Browse.tsx";
import { TThemeProvider } from "./context/TThemeProvider.tsx";
import NotFound from "./pages/UtilityPages/404.tsx";
import { DataProvider, useData } from "./context/DataContext.tsx";
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
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { state } = useData();
  const isAuthenticated = !!state.user;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>; // Render the protected route
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={MUITheme}>
    <DataProvider>
      <TThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<App />} />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/profile/:id"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/add-report"
                element={<ProtectedRoute element={<AddReport />} />}
              />

              <Route
                path="/browse"
                element={<ProtectedRoute element={<Browse />} />}
              />
              <Route
                path="/search"
                element={<ProtectedRoute element={<Search />} />}
              />
              <Route
                path="/report/:id"
                element={<ProtectedRoute element={<Report />} />}
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TThemeProvider>
    </DataProvider>
  </ThemeProvider>
);
