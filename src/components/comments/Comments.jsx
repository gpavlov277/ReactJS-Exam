import "./Comments.css";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";
import DeleteModal from "../delete-modal/DeleteModal";

import * as commentService from "../../services/commentService";
import ItemContext from "../../contexts/itemContext";
import Loader from "../loader/Loader";

export default function Comments({ item }) {
  const { onAddComment, addCommentError, setAddCommentError, isLoading } = useContext(ItemContext);

  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    commentService
      .getAll()
      .then((result) => setComments(result))
      .catch((err) => console.log(err));
  }, [isLoading]);

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
      postText: newComment,
      themeId: item._id,
    };
    onAddComment(data);
    setNewComment("");
  };

  const onChange = (e) => {
    const newCommentValue = e.target.value;
    setAddCommentError({});
    setNewComment(newCommentValue);
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
                <i className="fa fa-sort-up fa-2x hit-voting"></i>
                <span className="m-1">
                  {item?.subscribers?.length}
                  <span>❤️</span>
                </span>
                <i className="fa fa-sort-down fa-2x hit-voting"></i>
              </div>
              <div className="d-flex flex-column ml-4">
                <div className="d-flex flex-row post-title">
                  <h5 className="m-0">{item?.userId?.username}</h5>
                </div>

                <div className="d-flex flex-row align-items-center align-content-center post-title">
                  <span className="bdge m-2">{item?.heading}</span>
                  <span className="mr-2 dot"></span>
                  <span className="m-2">{item?.created_at}</span>

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
                      placeholder="Add comment"
                      onChange={onChange}
                      value={newComment}
                    />

                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{ maxHeight: "45px", alignSelf: "center" }}
                    >
                      {isLoading ? <Loader /> : "Add"}
                    </button>
                  </div>
                  <p className="form-error mb-2 text-center">{addCommentError?.message}</p>
                </form>
              </div>
              {currComments.map((c) => (
                <div className="commented-section mt-2" key={c._id}>
                  <div className="d-flex flex-row align-items-center commented-user">
                    <h5 className="m-2">{c.userId.username}</h5>
                    <span className="mr-2 dot"></span>
                    <span className="m-2">{c.created_at}</span>

                    {isPostAuthor(loggedUserId, c?.userId?._id) && (
                      <NavDropdown title="✏️" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/profile-settings"}>
                          Edit
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/profile-settings"}>
                          Delete
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
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
          </div>
        </div>
      </div>
    </>
  );
}
