import React, { useEffect, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { authFB } from "../../api/firebase"

import { AuthContext } from "./AuthContext";
import { authRducer } from "./authReducer";

import { types } from "../types/types";

const initialState = {
  logged: false,
};

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || initialState;
};

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authRducer, {}, init);

  const getDisplayName = user => {
    if (user.name && user.lastname1 && user.lastname2) {
      user.displayName = `${user.name.trim()} ${user.lastname1.trim()} ${user.lastname2.trim()}`
    }
  }

  const onLogin = (user) => {
    if (user) {
      getDisplayName(user)
      const action = { type: types.login, payload: { user } };
      localStorage.setItem('user', JSON.stringify(user))
      authDispatch(action);
    }
  };

  const onLogOut = () => {
    const action = { type: types.logout };
    authDispatch(action);
    localStorage.clear();
    // localStorage.removeItem("user");
  };

  const onCompleteInfo = (user) => {
    if (user) {
      getDisplayName(user)
      const action = { type: types.changeInfo, payload: { user } };
      const userState = authDispatch(action);
      console.log({userState})
      localStorage.setItem('user', JSON.stringify({...user,...authState}))
    }
  }

  useEffect(() => {
    onAuthStateChanged(authFB, (user) => {
      if (user) {
        // isValid
      } else {
        onLogOut()
      }
    });

  }, [])

  return (
    <AuthContext.Provider
      value={
        {
          ...authState,
          onLogin,
          onLogOut,
          onCompleteInfo
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
