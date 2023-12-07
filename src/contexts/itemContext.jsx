import { createContext, useState } from "react";
import * as itemService from "../services/itemsService";
import { useNavigate } from "react-router-dom";
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [createError, setCreateError] = useState({});

  const token = JSON.parse(localStorage.getItem("auth")).token;
  const userId = JSON.parse(localStorage.getItem("auth"))._id;

  const navigate = useNavigate();
  const onCreateSubmit = async (values) => {
    setIsLoading(true);
    values = { ...values, token, userId };
    await itemService
      .create(values)
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          if (result.message === "Invalid token!") {
            navigate("/login");
          }
          setCreateError(result);
          setIsLoading(false);
        } else {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setCreateError(err);
        setIsLoading(false);
      });
  };

  const values = {
    onCreateSubmit,
    data,
    setData,
    setCreateError,
    createError,
    isLoading,
  };
  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
ItemContext.displayName = "ItemContext";

export default ItemContext;
