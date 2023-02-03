import React from "react";
import { NavBarUI }  from "../UI/"

export const PublicRoutes = ({ children }) => {
  return (
    <>
    <NavBarUI />
        Rutas Publicas
      {children}
    </>
  );
};
