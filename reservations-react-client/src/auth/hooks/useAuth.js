import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../UI/utils/notify"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { URL_API } from "../../config";

import { AuthContext } from "../context";

import { authFB, errorsFB } from "../../api/firebase/"

export const useAuthLogin = () => {

    const navigate = useNavigate();
    const { onLogin, onLogOut, onCompleteInfo } = useContext(AuthContext)

    const [passwordError, setPasswordError] = useState("")
    const [resAuth, setResAuth] = useState({ user: "", access_token: "", error: "", message: "" })

    const notifyRef = useRef(null)

    const getDataUser = async (headers) => {
        return await fetch(`${URL_API}/users`, {
            method: "get",
            headers: headers
        }).then(res => res.json().then(({ result }) => {
            if (result?.data[0]) {
                return result?.data[0]
            } else return {}
        })).catch(err => {
            return {}
        })
    }

    // Para hacer register FireBase
    const authRegister = async ({ email, password }) => {
        try {
            const res = await createUserWithEmailAndPassword(authFB, email, password)
            const access_token = res.user.accessToken
            const userCredentials = res.user
            const { localId } = userCredentials.reloadUserInfo

            const user = { role_id: "BASIC", username: email, email: email, userId: localId, role_id: "AD", logged: true }

            localStorage.setItem('token', access_token)
            localStorage.setItem('token-init-data', new Date().getTime())

            onLogin(user)
            setResAuth(prev => ({ ...prev, access_token, user, role_id: "BASIC" }))
            navigate("/dashboard/profileUser")
            notify.info("Recuerda actualizar tu información para poder realizar alguna reservación.")

        } catch (err) {
            console.error(err)
            localStorage.clear()
            // message
            const { code } = err
            setResAuth(prev => ({ ...prev, error: code, message: errorsFB[code] }))
        }
    }
    
    // Para hacer login FireBase
    const authLogin = async ({ email, password }) => {
        notify.promiseStar(notifyRef, "Wait....")
        try {
            setResAuth(prev => ({ ...prev, error: 0, message: "" }))

            const res = await signInWithEmailAndPassword(authFB, email, password)

            const access_token = res.user.accessToken
            const userCredentials = res.user
            const { localId } = userCredentials.reloadUserInfo

            // Se obtiene la data del usuario de la base de datos
            const userDb = await getDataUser({ access_token, uid: localId })

            const user = {
                role_id: "BASIC",
                ...userDb,
                username: email,
                email: email,
                userId: localId,
                logged: true,
                completeInfo: Boolean(userDb?.id)
            }

            localStorage.setItem('token', access_token)
            localStorage.setItem('token-init-data', new Date().getTime())

            if (!userDb?.id) {
                navigate("/dashboard/profileUser")
                notify.info("Recuerda actualizar tu información para poder realizar alguna reservación.")
            } else onCompleteInfo(user)
            
            onLogin(user)

            setResAuth(prev => ({ ...prev, access_token, user, role_id: "AD" }))
            notify.promiseEnd.success(notifyRef, `Welcome ${email.split("@")[0]}`)
            //notify.success("Welcome " + email.split("@")[0])

        } catch (err) {
            console.error(err)
            localStorage.clear()
            //message
            const { code } = err
            setResAuth(prev => ({ ...prev, error: code, message: errorsFB[code] }))
            notify.promiseEnd.error(notifyRef, `Error! ${errorsFB[code]}`)
            //notify.error("Error! " + errorsFB[code])
        }
    }

    // Para hacer login FireBase Google
    const authGoogleLogin = async () => {
        notify.promiseStar(notifyRef, "Wait....")
        try {
            setResAuth(prev => ({ ...prev, error: 0, message: "" }))
            const provider = new GoogleAuthProvider();

            const resSingInWithPopupGoogle = await signInWithPopup(authFB, provider)

            const credential = GoogleAuthProvider.credentialFromResult(resSingInWithPopupGoogle);
            const access_token = credential.accessToken;
            const { reloadUserInfo } = resSingInWithPopupGoogle.user
            const { displayName, email, localId } = reloadUserInfo

            // Se obtiene la data del usuario de la base de datos
            const userDb = await getDataUser({ access_token, uid: localId })

            const user = {
                role_id: "BASIC",
                ...userDb,
                username: email,
                displayName: displayName,
                userId: localId,
                logged: true,
                completeInfo: Boolean(userDb?.id)
            }

            const userLS = JSON.stringify(user)

            localStorage.setItem('token', access_token)
            localStorage.setItem('token-init-data', new Date().getTime())
            localStorage.setItem('user', userLS)

            if (!userDb?.id) {
                navigate("/dashboard/profileUser")
                notify.info("Recuerda actualizar tu información para poder realizar alguna reservación.")
            } else onCompleteInfo(user)

            onLogin(user)
            setResAuth(prev => ({ ...prev, access_token, user, role_id: "AD" }))
            notify.promiseEnd.success(notifyRef, `Welcome ${displayName}`)

        } catch (err) {
            console.error(err)
            localStorage.clear()
            //message
            const { code } = err
            setResAuth(prev => ({ ...prev, error: code, message: errorsFB[code] }))
            notify.promiseEnd.error(notifyRef, `Error! ${errorsFB[code]}`)
        }
    }

    const authLogOut = () => {
        localStorage.clear()
        onLogOut();
        navigate('/home')
    }

    const isValidPassword = password => {

        if (password === "") {
            setPasswordError("")
            return true
        }

        if (password.includes(" ")) {
            setPasswordError("La contraseña no debe incluir espacios.")
            return false
        }

        if (password.length < 8) {
            setPasswordError("La contraseña debe ser de almenos 8 caracteres.")
            return false
        }

        setPasswordError("")
        return true
    }


    return {
        ...resAuth,

        authLogin,
        authGoogleLogin,
        authRegister,
        authLogOut,
        isValidPassword,
        passwordError,
    }
}