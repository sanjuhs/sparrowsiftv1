export interface SelectedFile {
  name: string;
  content: string;
  language: string;
  path: string[];
}

export type TreeNode = {
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "py":
      return "python";
    case "java":
      return "java";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
};

export const addFileToTree = (
  tree: TreeNode,
  path: string[],
  newFile: TreeNode
): TreeNode => {
  if (path.length === 0) {
    return {
      ...tree,
      children: [...tree.children, newFile],
    };
  }

  const [currentDir, ...restPath] = path;
  return {
    ...tree,
    children: tree.children.map((child) =>
      child.name === currentDir && child.isFolder
        ? addFileToTree(child, restPath, newFile)
        : child
    ),
  };
};

export const addDocumentationFile = (
  tree: TreeNode,
  path: string[],
  newFile: TreeNode
): TreeNode => {
  console.log("Path received in addDocumentationFile:", path);

  let docFolder = tree.children.find(
    (child) => child.name === "documentation" && child.isFolder
  );

  if (!docFolder) {
    docFolder = {
      name: "documentation",
      isFolder: true,
      children: [],
    };
    tree.children.push(docFolder);
  }

  // Remove the file name from the path
  const directoryPath = path.slice(0, -1);

  docFolder.children = addFileToMirroredStructure(
    docFolder.children,
    directoryPath,
    newFile
  );

  return {
    ...tree,
    children: tree.children.map((child) =>
      child.name === "documentation" ? docFolder : child
    ),
  };
};

const addFileToMirroredStructure = (
  children: TreeNode[],
  path: string[],
  newFile: TreeNode
): TreeNode[] => {
  console.log("Current path in addFileToMirroredStructure:", path); // Add this line

  if (path.length === 0) {
    return [...children, newFile];
  }

  const [currentDir, ...restPath] = path;
  let currentFolder = children.find(
    (child) => child.name === currentDir && child.isFolder
  );

  if (!currentFolder) {
    currentFolder = { name: currentDir, isFolder: true, children: [] };
    children.push(currentFolder);
  }

  currentFolder.children = addFileToMirroredStructure(
    currentFolder.children,
    restPath,
    newFile
  );

  return children.map((child) =>
    child.name === currentDir && child.isFolder ? currentFolder : child
  );
};
