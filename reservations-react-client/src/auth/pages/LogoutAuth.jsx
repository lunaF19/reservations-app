import React, { useContext } from "react"
import { AuthContex } from "../context"

const LogoutAuth = () => {
    
    const { onLogOut } = useContext(AuthContex)
    onLogOut()

    return (
        <>
            <h1> Cerrando Session... Por Favor Espere</h1>
        </>
    )
}

export default LogoutAuth