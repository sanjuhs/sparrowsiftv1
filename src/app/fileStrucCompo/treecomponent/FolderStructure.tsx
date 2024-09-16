// FolderStructure.tsx
import React from "react";
import useFolderStructure from "./useFolderStructure";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RenderTree from "./RenderTree";

type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const FolderStructure: React.FC<{ initialTree: TreeNode }> = ({
  initialTree,
}) => {
  const {
    fileStruc,
    selectedNode,
    handleNodeClick,
    handleAddFolder,
    handleAddFile,
    handleDelete,
    handleEditName,
    handleGenDoc,
    selectedNodeId,
  } = useFolderStructure(initialTree);

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
              selectedNodeId={selectedNodeId}
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

export default FolderStructure;

export { RenderTree, FolderStructure };
