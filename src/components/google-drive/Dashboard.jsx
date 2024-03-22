import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";

export const Dashboard = () => {
  const { folder, childFolders } = useFolder("xm0vaBMRa2ybcGIRuOO4");
  console.log("Dashboard.jsx: " + childFolders);
  return (
    <>
      <Navbar />
      <AddFolderButton currentFolder={folder} />
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
    </>
  );
};
