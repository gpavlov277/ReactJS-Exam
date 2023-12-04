import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = async (values) => {
    const response = await authService.login(values.email, values.password);
    if (response.ok) {
      const result = await response.json();
      setAuth(result);
      navigate("/");
    } else {
      const result = await response.json();
      setAuth(result);
    }
  };

  const values = {
    loginSubmitHandler,
    username: auth.username,
    isAuth: !!auth.email,
    authError: auth.message,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";
export default AuthContext;
