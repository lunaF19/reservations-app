import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppReservations from "./Reservations/AppReservations";
import { AuthProvider } from "./auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppReservations />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
