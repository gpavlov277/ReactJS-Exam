import { createContext, useState } from "react";
import * as itemService from "../services/itemsService";
import { useNavigate } from "react-router-dom";
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [data, setData] = useState({});
  const [createError, setCreateError] = useState({});
  const [editError, setEditError] = useState({});
  const [deleteError, setDeleteError] = useState({});
  const [addCommentError, setAddCommentError] = useState({});

  const [likeCommentLoader, setLikeCommentLoader] = useState(false);

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

  const onAddComment = async (data) => {
    setIsLoading(true);
    data = { ...data, token, userId };
    await itemService
      .addComment(data)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        res.json();
        setIsLoading(false);
      })
      .catch((err) => {
        setAddCommentError(err);
        setIsLoading(false);
      });
  };

  const onDeleteComment = async (postId, themeId) => {
    setIsLoadingComment(true);
    const data = { postId, token, userId, themeId };
    try {
      await itemService
        .deleteComment(data)
        .then((res) => {
          if (!res.ok) {
          }
          setIsLoadingComment(false);
          res.json();
        })
        .then((result) => {
          // TODO
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingComment(false);
        });
    } catch (error) {
      console.log(err);
    }
  };

  const onEditComment = async (formData) => {
    setIsLoadingComment(true);
    const { value, themeId, postId } = formData;
    const data = {
      postText: value,
      themeId,
      postId,
      token,
      userId,
    };

    await itemService
      .editComment(data)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errr");
        }
        res.json();
      })
      .then((result) => {
        console.log(result);
        setIsLoadingComment(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingComment(false);
      });
  };

  const onLikeItem = async (themeId) => {
    setLikeCommentLoader(true);
    const data = {
      themeId,
      userId,
      token,
    };
    await itemService
      .likeItem(data)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        res.json();
        setLikeCommentLoader(false);
      })
      .then((result) => {
        setLikeCommentLoader(false);
      })
      .catch((err) => console.log(err));
  };
  const onDislikeItem = async (themeId) => {
    setLikeCommentLoader(true);
    const data = {
      themeId,
      userId,
      token,
    };
    await itemService
      .dislikeItem(data)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        res.json();
        setLikeCommentLoader(false);
      })
      .then((result) => {
        setLikeCommentLoader(false);
      })
      .catch((err) => console.log(err));
  };
  const values = {
    onCreateSubmit,
    onEditSubmit,
    onEditComment,
    onLikeItem,
    onDislikeItem,

    data,
    setData,
    createError,
    isLoading,
    isLoadingComment,
    editError,
    deleteError,
    addCommentError,
    setEditError,
    setCreateError,
    setDeleteError,
    setAddCommentError,
    onDeleteSubmit,
    onAddComment,
    onDeleteComment,

    setLikeCommentLoader,
    likeCommentLoader,
  };
  return <ItemContext.Provider value={values}>{children}</ItemContext.Provider>;
};
ItemContext.displayName = "ItemContext";

export default ItemContext;
