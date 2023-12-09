import { createContext, useState } from "react";
import * as itemService from "../services/itemsService";
import { useNavigate } from "react-router-dom";
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [createError, setCreateError] = useState({});
  const [editError, setEditError] = useState({});
  const [deleteError, setDeleteError] = useState({});

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
          navigate("/");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setCreateError(err);
        setIsLoading(false);
      });
  };

  const onEditSubmit = async (values, themeId) => {
    setIsLoading(true);
    values = { ...values, token, userId, themeId };

    await itemService
      .edit(themeId, values)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Please login to continue!");
        }
        res.json();
      })
      .then((result) => {
        setEditError(result);
        setIsLoading(false);
        navigate(`/item/${themeId}`);
      })
      .catch((err) => {
        setIsLoading(false);
        setEditError(err);
      });
  };

  const onDeleteSubmit = async (itemId) => {
    setIsLoading(true);
    await itemService
      .deleteItem(itemId, token)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        res.json();
        navigate(`/`);
        setIsLoading(false);
      })
      .catch((err) => {
        setDeleteError(err);
        setIsLoading(false);
      });
  };
  const values = {
    onCreateSubmit,
    onEditSubmit,
    data,
    setData,
    createError,
    isLoading,
    editError,
    deleteError,
    setEditError,
    setCreateError,
    setDeleteError,
    onDeleteSubmit,
  };
  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
ItemContext.displayName = "ItemContext";

export default ItemContext;
