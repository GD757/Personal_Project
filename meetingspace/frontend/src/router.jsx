// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPage";
import MatterportViewer from "./pages/MatterportViewer"; // Ensure the path and filename are correct
import { confirmUser } from "./Utilities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: confirmUser,
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
        path: "matterportviewer", // Ensure this path is correct
        element: <MatterportViewer />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
    ],
  },
]);

export default router;
