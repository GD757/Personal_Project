// src/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPage";
import MatterportViewer from "./pages/MatterportViewer"; // Ensure the path and filename are correct
import { confirmUser } from "./Utilities";
import RoomPage from "./pages/RoomPage";
import RoomDetail from "./components/RoomDetail";
import ThreeDApp from "./pages/3dApp.jsx";

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
        path: "matterportviewer",
        element: <MatterportViewer />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "room",
        element: <RoomPage/>
      },
      {
        path:"rooms/:id",
        element: <RoomDetail/>,
      },
      {
        path: "*",
        element: <Navigate to ="/"/>, 
      },
      {
        path: '3d-app',
        element: <ThreeDApp />,
      },
    ],
  },
]);

export default router;
