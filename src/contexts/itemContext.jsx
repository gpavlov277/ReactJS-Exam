import { createContext, useState } from "react";
import * as itemService from "../services/itemsService";
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState("false");
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const userId = JSON.parse(localStorage.getItem("auth"))._id;

  const onCreateSubmit = async (values) => {
    values = { ...values, token, userId };
    console.log(values);
    await itemService
      .create(values)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const values = {
    onCreateSubmit,
  };
  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
ItemContext.displayName = "ItemContext";

export default ItemContext;
