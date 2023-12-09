import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ItemContext from "../../contexts/itemContext";
import OverlayLoader from "../loader/OverlayLoader";
import AuthContext from "../../contexts/authContext";

export default function DeleteModal({ setShowModal, showModal, item }) {
  const { onDeleteSubmit, deleteError, setDeleteError } = useContext(ItemContext);

  const onHideClickHandler = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setDeleteError({});
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={onHideClickHandler} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want ot delete this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will delete this post permanetly. You cannot undo this action.</Modal.Body>
        <Modal.Body className="d-flex justify-content-center">
          <p className="form-error">{deleteError.message}</p>
        </Modal.Body>
        <div></div>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideClickHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={() => onDeleteSubmit(item._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
