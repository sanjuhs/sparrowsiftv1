// useFolderStructure.ts
import { useState } from "react";
import JSZip from "jszip";
import { v4 as uuidv4 } from "uuid";

type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const useFolderStructure = (initialTree: TreeNode) => {
  const [fileStruc, setFileStruc] = useState<TreeNode>(initialTree);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetTree = {
    id: "001",
    name: "root",
    isFolder: true,
    children: [],
  };

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const resetFileStructure = () => {
    setFileStruc(resetTree);
    setSelectedNode(null);
    setUploadStatus("");
    setError(null);
  };

  const updateTreeStructure = (
    nodeId: string,
    updateFn: (node: TreeNode) => TreeNode
  ): TreeNode => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return updateFn(node);
      }
      return { ...node, children: node.children.map(updateNode) };
    };
    return updateNode(fileStruc);
  };

  const getUniqueName = (parentNode: TreeNode, baseName: string): string => {
    let newName = baseName;
    let counter = 1;
    while (parentNode.children.some((child) => child.name === newName)) {
      const nameWithoutExtension = baseName.replace(/\.[^/.]+$/, "");
      newName = `${nameWithoutExtension}_${counter}`;
      counter++;
    }
    return newName;
  };

  const getUniqueName_for_md_files = (
    parentNode: TreeNode,
    baseName: string
  ): string => {
    let newName = baseName;
    let counter = 1;
    const extension = baseName.split(".").pop();
    const nameWithoutExtension = baseName.replace(/\.[^/.]+$/, "");

    while (parentNode.children.some((child) => child.name === newName)) {
      newName = `${nameWithoutExtension}_${counter}`;
      if (extension) {
        newName += `.${extension}`;
      }
      counter++;
    }
    return newName;
  };

  const handleAddFolder = (parentId: string) => {
    const newFolder: TreeNode = {
      id: uuidv4(),
      name: "New Folder",
      isFolder: true,
      children: [],
    };
    setFileStruc((prevStruc) =>
      updateTreeStructure(parentId, (node) => {
        const uniqueName = getUniqueName(node, newFolder.name);
        newFolder.name = uniqueName;
        return {
          ...node,
          children: [...node.children, newFolder],
        };
      })
    );
    setSelectedNode(newFolder);
  };

  const handleAddFile = (parentId: string) => {
    const newFile: TreeNode = {
      id: uuidv4(),
      name: "New File",
      isFolder: false,
      children: [],
      content: "",
    };
    setFileStruc((prevStruc) =>
      updateTreeStructure(parentId, (node) => {
        const uniqueName = getUniqueName(node, newFile.name);
        newFile.name = uniqueName;
        return {
          ...node,
          children: [...node.children, newFile],
        };
      })
    );
    setSelectedNode(newFile);
  };

  const handleDelete = (nodeId: string) => {
    setFileStruc((prevStruc) => {
      const deleteNode = (node: TreeNode): TreeNode => ({
        ...node,
        children: node.children
          .filter((child) => child.id !== nodeId)
          .map(deleteNode),
      });
      return deleteNode(prevStruc);
    });
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleEditName = (nodeId: string, newName: string) => {
    setFileStruc((prevStruc) =>
      updateTreeStructure(nodeId, (node) => ({ ...node, name: newName }))
    );
  };

  const findParentNode = (
    node: TreeNode,
    targetId: string
  ): TreeNode | null => {
    if (node.children.some((child) => child.id === targetId)) {
      return node;
    }
    for (const child of node.children) {
      const result = findParentNode(child, targetId);
      if (result) return result;
    }
    return null;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploadStatus("Uploading files...");
    setError(null);

    try {
      const newFileStructure = await processFiles(files);
      setFileStruc(newFileStructure);
      setUploadStatus("Files uploaded successfully!");
    } catch (err) {
      setError("Error uploading files. Please try again.");
      console.error(err);
    }
  };

  const processFiles = async (files: FileList): Promise<TreeNode> => {
    const newFileStructure: TreeNode = { ...initialTree };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = file.webkitRelativePath || file.name;
      const pathParts = path.split("/");

      if (file.name.endsWith(".zip")) {
        console.log("unzip flag 1");
        const zipContent = await processZipFile(file);
        zipContent.forEach((file) => {
          let pathPartsOfzip = file.name.split("/");
          addToFileStructure(newFileStructure, file, pathPartsOfzip);
        });
      } else {
        console.log("unzip flag 2");
        const content = await readFileContent(file);
        addToFileStructure(
          newFileStructure,
          { name: file.name, content },
          pathParts
        );
      }
    }

    return newFileStructure;
  };

  const processZipFile = async (
    file: File
  ): Promise<{ name: string; content: string }[]> => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    const fileContents: { name: string; content: string }[] = [];

    for (const [filename, zipEntry] of Object.entries(zipContent.files)) {
      if (!zipEntry.dir) {
        const content = await zipEntry.async("string");
        fileContents.push({ name: filename, content });
      }
    }
    console.log("unzipped xontent is ", fileContents);

    return fileContents;
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const addToFileStructure = (
    node: TreeNode,
    file: { name: string; content: string },
    pathParts: string[]
  ) => {
    console.log(file.name, pathParts);
    let thepathpartname = pathParts.length - 1;
    if (pathParts.length - 1 === 0) {
      console.log("if loop triggered", pathParts, pathParts[thepathpartname]);
      node.children.push({
        id: uuidv4(),
        name: pathParts[thepathpartname],
        isFolder: false,
        children: [],
        content: file.content,
      });
    } else if (pathParts.length - 1 > 0) {
      console.log("els eloop triggered");
      const folderName = pathParts[0];
      let folderNode = node.children.find(
        (child) => child.isFolder && child.name === folderName
      );

      if (!folderNode) {
        console.log("making  anew folder ?");
        folderNode = {
          id: uuidv4(),
          name: folderName,
          isFolder: true,
          children: [],
        };
        node.children.push(folderNode);
      }

      addToFileStructure(folderNode, file, pathParts.slice(1));
    }
  };

  const handleGenDoc = () => {
    if (selectedNode) {
      const newDocFile: TreeNode = {
        id: uuidv4(),
        name: `${selectedNode.name}_doc.md`,
        isFolder: false,
        children: [],
        content: "summary doc",
      };
      setFileStruc((prevStruc) => {
        const parentNode = findParentNode(prevStruc, selectedNode.id);
        if (parentNode) {
          const uniqueName = getUniqueName_for_md_files(
            parentNode,
            newDocFile.name
          );
          newDocFile.name = uniqueName;
          return updateTreeStructure(parentNode.id, (node) => ({
            ...node,
            children: [...node.children, newDocFile],
          }));
        } else {
          const uniqueName = getUniqueName_for_md_files(
            prevStruc,
            newDocFile.name
          );
          newDocFile.name = uniqueName;
          return {
            ...prevStruc,
            children: [...prevStruc.children, newDocFile],
          };
        }
      });
    }
  };

  return {
    fileStruc,
    selectedNode,
    handleNodeClick,
    handleAddFolder,
    handleAddFile,
    handleDelete,
    handleEditName,
    handleGenDoc,
    selectedNodeId: selectedNode?.id || null,
    handleFileUpload,
    uploadStatus,
    error,
    resetFileStructure,
  };
};

export default useFolderStructure;
