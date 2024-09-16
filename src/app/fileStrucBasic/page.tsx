"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useCallback, useRef } from "react";

import MonacoEditor from "@monaco-editor/react";
import JSZip, { file } from "jszip";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};
import { atom } from "jotai";

const RenderTree: React.FC<{
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  onAddFolder: (parentId: string) => void;
  onAddFile: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
  onEditName: (nodeId: string, newName: string) => void;
  isNewNode?: boolean;
}> = ({
  node,
  onNodeClick,
  onAddFolder,
  onAddFile,
  onDelete,
  onEditName,
  isNewNode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(node.name);
  const [isEditing, setIsEditing] = useState(isNewNode);

  const toggleOpen = () => {
    if (node.isFolder) {
      setIsOpen(!isOpen);
    }
    onNodeClick(node);
  };

  const handleEditName = () => {
    onEditName(node.id, editedName);
    setIsEditing(false);
  };

  return (
    <div className="ml-4 text-xs w-96">
      <div className="flex items-center">
        <div
          className="flex items-center cursor-pointer flex-grow"
          onClick={toggleOpen}
        >
          <span className="mr-2">
            {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
          </span>
          {isEditing ? (
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleEditName}
              onKeyPress={(e) => e.key === "Enter" && handleEditName()}
              autoFocus
            />
          ) : (
            <span>{node.name}</span>
          )}
        </div>
        <div className="flex items-center">
          <button onClick={() => setIsEditing(true)} className="mx-1">
            📝
          </button>
          <button onClick={() => onDelete(node.id)} className="mx-1">
            🗑️
          </button>
          {node.isFolder && (
            <>
              <button onClick={() => onAddFolder(node.id)} className="mx-1">
                ➕📁
              </button>
              <button onClick={() => onAddFile(node.id)} className="mx-1">
                ➕📄
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen &&
        node.children.map((child) => (
          <RenderTree
            key={child.id}
            node={child}
            onNodeClick={onNodeClick}
            onAddFolder={onAddFolder}
            onAddFile={onAddFile}
            onDelete={onDelete}
            onEditName={onEditName}
            // isNewNode={child.id === newFolder.id} // or newFile.id
          />
        ))}
    </div>
  );
};

let root1: TreeNode = {
  id: "001",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "002",
      name: "some_folder",
      isFolder: true,
      children: [
        {
          id: "004",
          name: "nested_folder1",
          isFolder: true,
          children: [
            {
              id: "005",
              name: "nested_folder2",
              isFolder: true,
              children: [
                {
                  id: "006",
                  name: "file_006",
                  isFolder: false,
                  children: [],
                  content: "dome contnt ",
                },
              ],
            },
          ],
        },
      ],
    },
    { id: "007", name: "another_folder", isFolder: true, children: [] },
    {
      id: "003",
      name: "some_random_file",
      isFolder: false,
      children: [],
      content: "some contetn",
    },
  ],
};

let someeojis = `🗑️ - rubbish/ delete , 📝 - edit name , ➕📁 add folder ,➕📄 add file   


also tell me how make the render tree work with the branches , please remove the ml-4 and make sure it works with branches like "└── " and "├── "

  

also please reduce the Size of the Emojis , also please make it so that when i hover over the emojis the background of the emoji changes to bg-gray-400 , 

`;

const Somepage = () => {
  const [fileStruc, setFileStruc] = useState<TreeNode>(root1);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [newItemName, setNewItemName] = useState("New Item");

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const updateTreeStructure = (
    nodeId: string,
    updateFn: (node: TreeNode) => TreeNode
  ): TreeNode => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        console.log("recursive-f-4");
        return updateFn(node);
      }
      return { ...node, children: node.children.map(updateNode) };
    };
    return updateNode(fileStruc);
  };

  const handleAddFolder = (parentId: string) => {
    const newFolder: TreeNode = {
      id: Date.now().toString(),
      name: "New Folder",
      isFolder: true,
      children: [],
    };
    setFileStruc((prevStruc) =>
      updateTreeStructure(parentId, (node) => ({
        ...node,
        children: [...node.children, newFolder],
      }))
    );
    setSelectedNode(newFolder);
  };

  const handleAddFile = (parentId: string) => {
    const newFile: TreeNode = {
      id: Date.now().toString(),
      name: "New File",
      isFolder: false,
      children: [],
      content: "",
    };
    setFileStruc((prevStruc) =>
      updateTreeStructure(parentId, (node) => ({
        ...node,
        children: [...node.children, newFile],
      }))
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

  const getUniqueFileName = (
    parentNode: TreeNode,
    baseName: string
  ): string => {
    let newName = baseName;
    let counter = 1;
    while (parentNode.children.some((child) => child.name === newName)) {
      const nameWithoutExtension = baseName.replace(/\.[^/.]+$/, "");
      const extension = baseName.split(".").pop();
      newName = `${nameWithoutExtension}_${counter}.${extension}`;
      counter++;
    }
    return newName;
  };

  const handleGenDoc = () => {
    console.log("f-1");
    if (selectedNode) {
      const newDocFile: TreeNode = {
        id: Date.now().toString(),
        name: `${selectedNode.name}_doc.md`,
        isFolder: false,
        children: [],
        content: "summary doc",
      };
      console.log("f-2");
      setFileStruc((prevStruc) => {
        const parentNode = findParentNode(prevStruc, selectedNode.id);

        if (parentNode) {
          // If we found a parent, update its children
          return updateTreeStructure(parentNode.id, (node) => ({
            ...node,
            children: [...node.children, newDocFile],
          }));
        } else {
          // If no parent found (i.e., selectedNode is root), add to root level
          return {
            ...prevStruc,
            children: [...prevStruc.children, newDocFile],
          };
        }
      });
      console.log("f-3");
    }
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="mr-4 ">
          <p className="font-bold">Tree Structure here</p>
          <Card className="p-4">
            <RenderTree
              node={fileStruc}
              onNodeClick={handleNodeClick}
              onAddFolder={handleAddFolder}
              onAddFile={handleAddFile}
              onDelete={handleDelete}
              onEditName={handleEditName}
            />
          </Card>
        </div>
        <div>
          <Card className="card2 w-96 p-4 mt-4">
            <p>Selected Node: {selectedNode ? selectedNode.name : "None"}</p>
            <Button onClick={handleGenDoc}>GenDoc</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Somepage;
