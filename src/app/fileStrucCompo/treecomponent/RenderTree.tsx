// RenderTree.tsx
import React, { useState } from "react";
import useFolderStructure from "./useFolderStructure";

type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const RenderTree: React.FC<{
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  onAddFolder: (parentId: string) => void;
  onAddFile: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
  onEditName: (nodeId: string, newName: string) => void;
  isNewNode?: boolean;
  selectedNodeId: string | null;
}> = ({
  node,
  onNodeClick,
  onAddFolder,
  onAddFile,
  onDelete,
  onEditName,
  isNewNode,
  selectedNodeId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const isSelected = selectedNodeId === node.id;

  return (
    <div className="text-xs w-full">
      <div
        className={`flex items-center rounded-md ${
          isSelected ? "bg-slate-200" : ""
        }`}
      >
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
              onKeyDown={(e) => e.key === "Enter" && handleEditName()}
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
                +📁
                {/* ➕ */}
              </button>
              <button onClick={() => onAddFile(node.id)} className="mx-1">
                +📄
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen &&
        node.children.map((child) => (
          <div key={child.id} className="flex">
            {"└"}
            <RenderTree
              key={child.id}
              node={child}
              onNodeClick={onNodeClick}
              onAddFolder={onAddFolder}
              onAddFile={onAddFile}
              onDelete={onDelete}
              onEditName={onEditName}
              selectedNodeId={selectedNodeId}
            />
          </div>
        ))}
    </div>
  );
};

const RendertreeStandAlone: React.FC<{ currentTree: TreeNode }> = ({
  currentTree,
}) => {
  const {
    // fileStruc,
    selectedNode,
    handleNodeClick,
    handleAddFolder,
    handleAddFile,
    handleDelete,
    handleEditName,
    handleGenDoc,
    selectedNodeId,
  } = useFolderStructure(currentTree);

  return (
    <div>
      <RenderTree
        node={currentTree}
        onNodeClick={handleNodeClick}
        onAddFolder={handleAddFolder}
        onAddFile={handleAddFile}
        onDelete={handleDelete}
        onEditName={handleEditName}
        selectedNodeId={selectedNodeId}
      />
    </div>
  );
};

export default RenderTree;

export { RenderTree, RendertreeStandAlone, type TreeNode };
