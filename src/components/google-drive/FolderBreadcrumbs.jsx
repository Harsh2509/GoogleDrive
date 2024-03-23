import { Breadcrumb } from "react-bootstrap";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Link } from "react-router-dom";

export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb className="flex-grow-1" listProps={{ className: "m-0" }}>
      {path.map((folder, index) => (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          linkAs={Link}
          style={{ maxWidth: "150px" }}
          key={folder.id}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : `/`,
              state: { folder: { ...folder, path: path.slice(0, index) } },
            },
          }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
