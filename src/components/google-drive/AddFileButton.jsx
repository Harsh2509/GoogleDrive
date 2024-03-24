import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { fileStorage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    fileStorage.addFile(filePath, file, currentUser, currentFolder);
  }
  return (
    <label className="btn btn-outline-success btn-sm mx-3 m-0">
      <FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
      />
    </label>
  );
}
