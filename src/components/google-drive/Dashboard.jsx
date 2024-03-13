import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../../hooks/useFolder";

export const Dashboard = () => {
  const { folder } = useFolder();
  return (
    <>
      <Navbar />
      <AddFolderButton currentFolder={folder} />
    </>
  );
};
