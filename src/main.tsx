/// <reference types="vite-plugin-pages/client-react" />
import routes from "~react-pages";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global CSS
import "./index.css";

const isProduction = process.env.NODE_ENV === "production";
const basename = isProduction ? "/microbamba" : "";
const router = createBrowserRouter(routes, { basename });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
