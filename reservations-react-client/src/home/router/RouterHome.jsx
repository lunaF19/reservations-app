import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { PageContact, PageSuites, PageHome, PageSuite} from "../pages";
import { NavBarUI } from '../../UI/'
export const RouterHome = () => {
  return (
    <>
    <NavBarUI />
      <Routes> 
        <Route path="/suites" element={<PageSuites />} />
        <Route path="/suite/:id" element={<PageSuite />} />
        <Route path="/contact" element={<PageContact />} />
        <Route path="/" element={<PageHome />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};
