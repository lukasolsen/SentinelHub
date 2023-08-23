import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Navbar from "./components/Navbar.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Report from "./pages/Report.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/database",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="dark:bg-slate-950 bg-slate-100 w-screen h-screen">
    <Navbar />
    <RouterProvider router={router} />
  </div>
);
