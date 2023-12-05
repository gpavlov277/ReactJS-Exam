import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});

  const loginSubmitHandler = async (values) => {
    const response = await authService.login(values.email, values.password);
    if (response.ok) {
      const result = await response.json();
      setAuth(result);
      // localStorage.setItem("accessToken", result.token);
      navigate("/");
    } else {
      const result = await response.json();
      setAuth(result);
    }
  };

  const logoutHandler = async () => {
    const token = auth.token;
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      setAuth({});
      // localStorage.removeItem("accessToken");
    }
  };
  const values = {
    loginSubmitHandler,
    logoutHandler,
    username: auth.username,
    isAuth: !!auth.email,
    authError: auth.message,
    token: auth.token,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";
export default AuthContext;
