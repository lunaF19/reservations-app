import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import {  PrivateRoutes } from "./"; // PublicRoutes
import { RouterAuth } from "../auth"
import { RouterHome } from "../home"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        
        <Route
          path="/auth/*" 
          element={
          <RouterAuth>
                Router de Authentificación
          </RouterAuth>}
        />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoutes>
                Router de Dashboard (Solo disponible cuando el usuarios esta loggeado)
          </PrivateRoutes> 
          }
        />

        <Route path="/home/*" element={
            <RouterHome>
                Router de Home
            </RouterHome>
            } />

        <Route path="/*" element={
            <Navigate to={"/home"} />
        } />
      </Routes>
    </>
  );
};
