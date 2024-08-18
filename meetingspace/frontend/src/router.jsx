// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPage";
import ModelDetails from "./pages/ModelDetails"; // Ensure the path and filename are correct

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "model-details", // Ensure this path is correct
        element: <ModelDetails />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
    ],
  },
]);

export default router;
