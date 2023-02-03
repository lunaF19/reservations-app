import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom"

import { NavBarUI } from "../UI"

import { AuthContext, PageProfileUser, PageReservationsUser } from "../auth"
import { PageManteSuites } from "../admin/pages/PageManteSuites";
import { PageManteSuitesCategories } from "../admin/pages/PageManteSuitesCategories";
import { PageManteCatalogMedia } from "../admin/pages/PageManteCatalogMedia";

export const PrivateRoutes = ({ children }) => {
  const { logged: isLogged = false, role_id = "BASIC", } = useContext(AuthContext);

  return (
    <>
      {isLogged ? (
        <>
          <NavBarUI />
          <Routes>
            <Route path="/profileUser" element={<PageProfileUser />} />
            <Route path="/reservationsUser" element={<PageReservationsUser />} />
            {
              role_id === "ADM"&& (
                <>
                <Route path="/adm/suites" element={<PageManteSuites />} />
                  <Route path="/adm/suites_categories" element={<PageManteSuitesCategories />} />
                  <Route path="/adm/catalog_media" element={<PageManteCatalogMedia />} />
                </>
              )
            }
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </>

      ) : (
        <Navigate to={"/home"} />
      )}
    </>
  );
};


/**
 * 
 *  return (
    <>
      <Routes>
        <Route path="/login" element={<PageAuthLogin />} />
        <Route path="/register" element={<PageAuthRegister />} />
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
 */