import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const AddFolderButton = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    await database.addFolder({
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      createdAt: new Date(),
    });
    setName("");
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal onHide={closeModal} show={open}>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={closeModal} className="me-5">
              Close
            </Button>
            <Button variant="success" type="submit">
              Create Folder
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddFolderButton;
