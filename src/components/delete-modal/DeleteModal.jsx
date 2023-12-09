import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteModal({ setShowModal, showModal }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const onHideClickHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <Modal show={showModal} onHide={onHideClickHandler} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want ot delete this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will delete this post permanetly. You cannot undo this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideClickHandler}>
            Close
          </Button>
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
