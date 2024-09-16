import React, { useState } from "react";
import { TreeNode } from "./types";

interface TreeViewProps {
  node: TreeNode;
  onSelect: (
    name: string,
    isFolder: boolean,
    content?: string,
    path?: string[]
  ) => void;
  path?: string[];
}

export const TreeView: React.FC<TreeViewProps> = ({
  node,
  onSelect,
  path = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSelect(node.name, node.isFolder, node.content, [...path, node.name]);
  };

  return (
    <div style={{ marginLeft: `20px` }}>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
      </div>
      {isOpen &&
        node.children.map((child, index) => (
          <TreeView
            key={index}
            node={child}
            onSelect={onSelect}
            path={[...path, node.name]}
          />
        ))}
    </div>
  );
};
