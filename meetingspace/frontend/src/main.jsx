import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css"; 
// import "./3dIndex.css"; //uncomment for 3d css
// import ThreeDApp from "./3dApp"; //uncomment for 3d homepage

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
    // <ThreeDApp/>
    

 
);