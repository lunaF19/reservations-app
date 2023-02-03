import React from "react";
import { NavLink } from 'react-router-dom'


export const ItemsRoutesXRoles = ( { title, route }) => {
    return (
        <>
            <NavLink
                className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                }
                to={route}
            >
                {title}
            </NavLink>
        </>
    )
}

