import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

export const Dashboard = () => {
  const { folderId } = useParams();
  const location = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    location.state?.folder
  );
  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center px-3 my-2">
        <FolderBreadcrumbs currentFolder={folder} />
        <AddFileButton currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
      </div>
      {childFolders && childFolders.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFolders.map((childFolder) => (
            <div
              key={childFolder.id}
              style={{ maxWidth: "250px" }}
              className="p-2"
            >
              <Folder folder={childFolder} />
            </div>
          ))}
        </div>
      )}

      {childFolders.length > 0 && childFiles.length > 0 && <hr />}

      {childFiles && childFiles.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFiles.map((childFile) => (
            <div
              key={childFile.id}
              style={{ maxWidth: "250px" }}
              className="p-2"
            >
              <File file={childFile} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
