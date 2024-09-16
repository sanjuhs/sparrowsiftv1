import JSZip from "jszip";
import { TreeNode } from "./types";
import { saveAs } from "file-saver";

const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "js":
      return "javascript";
    case "java":
      return "java";
    case "pl":
      return "perl";
    case "pm":
      return "perl";
    case "scala":
      return "scala";
    case "ts":
      return "typescript";
    case "py":
      return "python";
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

export const processFileStructure = (
  path: string,
  isFolder: boolean,
  content?: string
): TreeNode => {
  const parts = path.split("/").filter(Boolean);
  const name = parts.pop() || "";
  return {
    name,
    isFolder,
    children: [],
    content,
  };
};

export const addToFileStructure = (
  node: TreeNode,
  path: string[],
  isFolder: boolean,
  content?: string
) => {
  if (path.length === 0) return;

  const childName = path[0];
  let child = node.children.find((c) => c.name === childName);

  if (!child) {
    child = {
      name: childName,
      isFolder: path.length > 1 || isFolder,
      children: [],
      content,
    };
    node.children.push(child);
  }

  if (path.length > 1) {
    addToFileStructure(child, path.slice(1), isFolder, content);
  } else if (content !== undefined) {
    child.content = content;
  }
};

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setFileStructure: React.Dispatch<React.SetStateAction<TreeNode | null>>,
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    setUploadStatus("Processing...");
    setError(null);
    const root: TreeNode = { name: "root", isFolder: true, children: [] };

    try {
      if (files[0].name.endsWith(".zip")) {
        // Handle zip file
        const zip = new JSZip();
        const contents = await zip.loadAsync(files[0]);
        for (const [relativePath, zipEntry] of Object.entries(contents.files)) {
          if (!zipEntry.dir) {
            const content = await zipEntry.async("string");
            const pathParts = relativePath.split("/").filter(Boolean);
            addToFileStructure(root, pathParts, false, content);
          } else {
            const pathParts = relativePath.split("/").filter(Boolean);
            addToFileStructure(root, pathParts, true);
          }
        }
      } else {
        // Handle individual files or folder
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const path = file.webkitRelativePath || file.name;
          const content = await file.text();
          const pathParts = path.split("/").filter(Boolean);
          addToFileStructure(root, pathParts, false, content);
        }
      }

      setFileStructure(root);
      setUploadStatus("Upload complete!");
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while processing the files. Please try again."
      );
      setUploadStatus("");
    }
  }
};

export const downloadZip = async (node: TreeNode, zipName: string) => {
  const zip = new JSZip();

  const addToZip = (currentNode: TreeNode, currentPath: string) => {
    if (currentNode.isFolder) {
      currentNode.children.forEach((child) =>
        addToZip(child, `${currentPath}${currentNode.name}/`)
      );
    } else {
      zip.file(`${currentPath}${currentNode.name}`, currentNode.content || "");
    }
  };

  addToZip(node, "");

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipName);
};
