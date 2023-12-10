import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});
  const [err, setErr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loginSubmitHandler = async (values) => {
    const response = await authService.login(values.email, values.password);
    setIsLoading(true);

    if (response.ok) {
      const result = await response.json();
      setAuth(result);
      setIsLoading(false);

      navigate("/");
    } else {
      const result = await response.json();
      setErr(result);
      setIsLoading(false);
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
      navigate("/");
    }
  };

  const registerSubmitHandler = async (values) => {
    const response = await authService.register(
      values.email,
      values.username,
      values.password,
      values.rePass
    );
    setIsLoading(true);
    if (response.ok) {
      const result = await response.json();
      setAuth(result);

      navigate("/");
      setIsLoading(false);
    } else {
      const result = await response.json();
      setErr(result);
      setIsLoading(false);
    }
  };
  const values = {
    loginSubmitHandler,
    logoutHandler,
    registerSubmitHandler,
    username: auth.username,
    isAuth: !!auth.email,
    authError: err.message,
    token: auth.token,
    setErr,
    isLoading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";
export default AuthContext;
