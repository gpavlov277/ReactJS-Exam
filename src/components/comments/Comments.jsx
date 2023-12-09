import "./Comments.css";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";
import DeleteModal from "../delete-modal/DeleteModal";

import * as commentService from "../../services/commentService";
import ItemContext from "../../contexts/itemContext";
import Loader from "../loader/Loader";

import moment from "moment/moment";

export default function Comments({ item }) {
  const isAuth = JSON.parse(localStorage.getItem("auth")).token;
  const {
    onAddComment,
    onDeleteComment,
    onEditComment,
    onLikeItem,
    onDislikeItem,

    addCommentError,
    setAddCommentError,
    isLoading,
    isLoadingComment,
  } = useContext(ItemContext);

  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [hideAdd, setHideAdd] = useState(false);
  const [formSettings, setFormSettings] = useState({
    placeholder: "Add Comment",
    value: "",
    postId: "",
    themeId: item._id,
  });

  useEffect(() => {
    commentService
      .getAll()
      .then((result) => setComments(result))
      .catch((err) => console.log(err));
  }, [isLoading, isLoadingComment]);

  const loggedUserId = JSON.parse(localStorage.getItem("auth"))._id;
  const loggedUserImage = JSON.parse(localStorage.getItem("auth"))?.userImg;

  const currComments = comments.filter((x) => x?.themeId?._id === item._id);

  const isItemAuthor = loggedUserId === item?.userId?._id;

  const isPostAuthor = (loggedUserId, commentUserId) => {
    return loggedUserId === commentUserId;
  };

  const onClickShowModal = () => {
    setShowModal(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      postText: formSettings.value,
      themeId: item._id,
    };
    onAddComment(data);
    setFormSettings((state) => ({ ...state, value: "" }));
  };

  const onEditSubmit = () => {
    toggleAdd();
    onEditComment(formSettings);
  };

  const onChange = (e) => {
    const newCommentValue = e.target.value;
    setAddCommentError({});
    setFormSettings((state) => ({ ...state, value: newCommentValue }));
  };

  const commentDeleteModalHandler = (commentId) => {
    onDeleteComment(commentId, item._id);
  };

  const toggleEdit = (c) => {
    setFormSettings((state) => ({
      ...state,
      value: c.text,
      postId: c._id,
      placeholder: "Edit Comment",
    }));
    setHideAdd(true);
    console.log(formSettings);
  };
  const toggleAdd = () => {
    setFormSettings((state) => ({ ...state, value: "", placeholder: "Add Comment" }));
    setHideAdd(false);
  };

  const onItemLikeHandler = () => {
    onLikeItem(item._id);
  };
  const onItemDislikeHandler = () => {
    onDislikeItem(item._id);
  };
  return (
    <>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} item={item} />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="d-flex flex-column col-md-12">
            <div className="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
              <div className="profile-image">
                <img
                  className="rounded-circle"
                  src={item?.userId?.userImg}
                  width="70"
                  height="70"
                />
              </div>
              <div className="d-flex flex-column-reverse flex-grow-0 align-items-center votings ml-1">
                <i className="fa fa-sort-up fa-2x hit-voting" onClick={onItemLikeHandler}></i>
                <span className="m-1">
                  {item?.subscribers?.length}
                  <span>❤️</span>
                </span>
                <i className="fa fa-sort-down fa-2x hit-voting" onClick={onItemDislikeHandler}></i>
              </div>
              <div className="d-flex flex-column ml-4">
                <div className="d-flex flex-row post-title">
                  <h5 className="m-0">{item?.userId?.username}</h5>
                </div>

                <div className="d-flex flex-row align-items-center align-content-center post-title">
                  <span className="bdge m-2">{item?.heading}</span>
                  <span className="mr-2 dot"></span>
                  <span className="m-2">{moment(item?.created_at).fromNow()}</span>

                  {isItemAuthor && (
                    <NavDropdown title="✏️" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to={`/edit/item/${item._id}`}>
                        Edit
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={onClickShowModal}>Delete</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </div>
              </div>
            </div>

            {isAuth && (
              <div className="coment-bottom bg-white p-2 px-4">
                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                  <div className="profile-image d-flex align-items-center">
                    <img className="rounded-circle" src={loggedUserImage} width="50" height="50" />
                  </div>

                  <form onSubmit={onSubmitHandler}>
                    <div className="d-flex justify-content-center">
                      <input
                        type="text"
                        name="postText"
                        className="btn"
                        placeholder={formSettings.placeholder}
                        onChange={onChange}
                        value={formSettings.value}
                      />

                      {hideAdd ? (
                        <>
                          <button
                            className="btn btn-success m-1"
                            type="button"
                            style={{ maxHeight: "45px", alignSelf: "center" }}
                            onClick={onEditSubmit}
                          >
                            {isLoading ? <Loader /> : "Edit"}
                          </button>

                          <button
                            className="btn btn-dark m-1"
                            type="button"
                            style={{ maxHeight: "45px", alignSelf: "center" }}
                            onClick={() => toggleAdd()}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-primary"
                          type="submit"
                          style={{ maxHeight: "45px", alignSelf: "center" }}
                        >
                          {isLoading ? <Loader /> : "Add"}
                        </button>
                      )}
                    </div>
                    <p className="form-error mb-2 text-center">{addCommentError?.message}</p>
                  </form>
                </div>
                {currComments.map((c) => (
                  <div className="commented-section mt-2" key={c._id}>
                    <div className="d-flex flex-row align-items-center commented-user">
                      <h5 className="m-2">{c.userId.username}</h5>
                      <span className="mr-2 dot"></span>
                      <span className="m-2">{moment(c.created_at).fromNow()}</span>
                      <>
                        {isPostAuthor(loggedUserId, c?.userId?._id) && (
                          <NavDropdown title="✏️" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => toggleEdit(c)}>Edit</NavDropdown.Item>
                            <NavDropdown
                              title="Delete"
                              style={{ padding: "16px" }}
                              id="basic-nav-dropdown"
                            >
                              <NavDropdown.Item onClick={() => commentDeleteModalHandler(c._id)}>
                                Yes
                              </NavDropdown.Item>
                              <NavDropdown.Item>No</NavDropdown.Item>
                            </NavDropdown>
                          </NavDropdown>
                        )}
                      </>
                    </div>
                    <div className="comment-text-sm">
                      <span>{c.text}</span>
                    </div>

                    <div className="reply-section">
                      <div className="d-flex flex-row align-items-center voting-icons">
                        <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                        <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                        <span className="m-2">{c.likes.length}</span>
                        <span className="dot m-2"></span>
                        <h6 className="ml-2 mb-0">Likes</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
