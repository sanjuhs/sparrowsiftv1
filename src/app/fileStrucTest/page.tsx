"use client";

// this whole component requires React Strict mode disabled
// const nextConfig = {
//   reactStrictMode: false,
// };
// update teh above in next.config.mjs

import React, { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const TreeView: React.FC<{
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
  onDelete: (node: TreeNode) => void;
  level?: number;
  lastChild?: boolean;
  parentPath?: string;
}> = ({
  node,
  onSelect,
  onDelete,
  level = 0,
  lastChild = false,
  parentPath = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSelect(node);
  };

  const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

  return (
    <div className="tree-node" style={{ marginLeft: `${level * 20}px` }}>
      <div className="tree-content flex items-center">
        <span className="tree-branch mr-2">
          {level > 0 && (
            <>
              {[...Array(level - 1)].map((_, i) => (
                <span key={`branch-${node.id}-${i}`} className="branch-line">
                  │{" "}
                </span>
              ))}
              <span className="branch-line">{lastChild ? "└── " : "├── "}</span>
            </>
          )}
        </span>
        <span className="tree-icon mr-2" onClick={handleToggle}>
          {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
        </span>
        <span className="tree-label mr-2" onClick={handleToggle}>
          {node.name}
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node);
          }}
        >
          Delete
        </Button>
      </div>
      {isOpen &&
        node.children.map((child, index) => (
          <TreeView
            key={child.id}
            node={child}
            onSelect={onSelect}
            onDelete={onDelete}
            level={level + 1}
            lastChild={index === node.children.length - 1}
            parentPath={fullPath}
          />
        ))}
    </div>
  );
};

const FileStructureCRUD: React.FC = () => {
  const [root, setRoot] = useState<TreeNode>({
    id: "root",
    name: "root",
    isFolder: true,
    children: [],
  });
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [isFolder, setIsFolder] = useState(true);
  const addItemRef = useRef<(() => void) | null>(null);

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddItem =
    //   = () => {
    useCallback(() => {
      if (!newItemName) return;

      const newNode: TreeNode = {
        id: generateUniqueId(),
        name: newItemName,
        isFolder: isFolder,
        children: [],
        content: isFolder ? undefined : "some_file_content",
      };
      console.log("tre node gen now! ");

      setRoot((prevRoot) => {
        const updatedRoot = { ...prevRoot };
        let currentNode = updatedRoot;

        if (selectedNode) {
          const path = getNodePath(updatedRoot, selectedNode);
          for (const nodeName of path) {
            currentNode =
              currentNode.children.find((child) => child.name === nodeName) ||
              currentNode;
          }
        }

        if (currentNode.isFolder) {
          // currentNode.children.push(newNode);
          currentNode.children = [...currentNode.children, newNode];
        }

        return updatedRoot;
      });

      console.log(" < -------------- > ");
      console.log(root);
      setNewItemName("");
    }, [newItemName, isFolder, selectedNode, generateUniqueId]);

  // Use useRef to store the latest handleAddItem function
  React.useEffect(() => {
    addItemRef.current = handleAddItem;
  }, [handleAddItem]);

  // Wrap the handleAddItem call in useCallback to ensure stable reference
  const handleAddItemClick = useCallback(() => {
    if (addItemRef.current) {
      addItemRef.current();
    }
  }, []);

  const handleDelete = (nodeToDelete: TreeNode) => {
    setRoot((prevRoot) => {
      const updatedRoot = { ...prevRoot };
      const parentNode = findParentNode(updatedRoot, nodeToDelete);

      if (parentNode) {
        parentNode.children = parentNode.children.filter(
          (child) => child.id !== nodeToDelete.id
        );
      }

      return updatedRoot;
    });

    if (selectedNode?.id === nodeToDelete.id) {
      setSelectedNode(null);
    }
  };

  const handleUpdateContent = (content: string) => {
    if (selectedNode && !selectedNode.isFolder) {
      setRoot((prevRoot) => {
        const updatedRoot = { ...prevRoot };
        const nodeToUpdate = findNode(updatedRoot, selectedNode);
        if (nodeToUpdate) {
          nodeToUpdate.content = content;
        }
        return updatedRoot;
      });
    }
  };

  const findNode = (root: TreeNode, target: TreeNode): TreeNode | null => {
    if (root.id === target.id) return root;
    for (const child of root.children) {
      const found = findNode(child, target);
      if (found) return found;
    }
    return null;
  };

  const findParentNode = (
    root: TreeNode,
    target: TreeNode
  ): TreeNode | null => {
    for (const child of root.children) {
      if (child.id === target.id) return root;
      const found = findParentNode(child, target);
      if (found) return found;
    }
    return null;
  };

  const getNodePath = (root: TreeNode, target: TreeNode): string[] => {
    if (root.id === target.id) return [root.name];
    for (const child of root.children) {
      const path = getNodePath(child, target);
      if (path.length > 0) return [root.name, ...path];
    }
    return [];
  };

  return (
    <div className="p-4 flex">
      <Card className="w-1/2 p-4 mr-4">
        <CardHeader>
          <CardTitle>File Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <TreeView
            node={root}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
      <Card className="w-1/2 p-4">
        <CardHeader>
          <CardTitle>File/Folder Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="New item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="mb-2"
            />
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isFolder}
                onChange={(e) => setIsFolder(e.target.checked)}
                className="mr-2"
              />
              <span>Is Folder</span>
            </div>
            <Button onClick={handleAddItemClick}>Add Item</Button>
          </div>
          {selectedNode && !selectedNode.isFolder && (
            <div>
              <h3 className="mb-2">Edit File Content</h3>
              <Textarea
                value={selectedNode.content || ""}
                onChange={(e) => handleUpdateContent(e.target.value)}
                rows={10}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileStructureCRUD;
