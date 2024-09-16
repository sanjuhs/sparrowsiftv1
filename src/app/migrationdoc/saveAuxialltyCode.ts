// --------------------------------------
// --------------------------------------

// I used the belwo code for generating Documentation using th eval function , this should be useful later on

// let initalllmcallfunc = `
// window.LLMcall = async function(messages) {
// let api_key_openai = the_key
// console.log("func is invoked");

// // Replace with actual API call
// const response = await fetch('https://api.openai.com/v1/chat/completions', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + api_key_openai
//   },
//   body: JSON.stringify({
//     model: "gpt-3.5-turbo",
//     messages: messages
//   })
// });

//   if (!response.ok) {
//   throw new Error(\`HTTP error! status: \${response.status}\`);
// }

// const data = await response.json();
// return data.choices[0].message.content;
// }
// `;

//   const generateDocumentation = async () => {
//     setDocumentation("Generating documentation...");

//     try {
//       // Evaluate the LLMcallFunction string in the current scope
//       eval(LLMcallFunction);
//       // Now LLMcall should be available as a function
//       if (typeof LLMcall !== "function") {
//         throw new Error(
//           "LLMcall is not a function. Please check your LLMcallFunction definition."
//         );
//       }

//       let filestrucstring = String(JSON.stringify(fileStructure, null, 2));
//       console.log(filestrucstring);

//       // Prepare the messages for the LLM call
//       const messages = [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that generates documentation for code files.",
//         },
//         {
//           role: "user",
//           content:
//             "Generate documentation for the following file structure:" +
//             filestrucstring,
//         },
//         // {
//         //   role: "user",
//         //   content: "capital of france pls",
//         // },
//       ];

//       // Call the LLM function
//       const result = await LLMcall(messages);

//       // Set the documentation with the result from the LLM
//       setDocumentation(result);
//     } catch (error) {
//       console.error("Error generating documentation:", error);
//       setDocumentation(
//         `Error generating documentation: ${(error as Error).message}`
//       );
//     }
//   };

// --------------------------------------
// --------------------------------------

//   const generateDocumentation = async () => {
//     setDocumentation("Generating documentation...");

//     try {
//       // Create the LLMcall function using Function constructor
//       const LLMcall = new Function("messages", LLMcallFunction);

//       let filestrucstring = JSON.stringify(fileStructure, null, 2);
//       console.log(filestrucstring);

//       const messages = [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that generates documentation for code files.",
//         },
//         {
//           role: "user",
//           content:
//             "Generate documentation for the following file structure:" +
//             filestrucstring,
//         },
//       ];

//       const result = await LLMcall(messages);
//       setDocumentation(result);
//     } catch (error) {
//       console.error("Error generating documentation:", error);
//       setDocumentation(
//         `Error generating documentation: ${(error as Error).message}`
//       );
//     }
//   };

// --------------------------------------
// --------------------------------------

// import Link from "next/link";
// import Image from "next/image";
// import React, { useState, useCallback, useRef } from "react";

// import MonacoEditor from "@monaco-editor/react";
// import JSZip, { file } from "jszip";

// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// type SelectedFile = {
//   name: string;
//   content: string;
//   language: string;
//   node: TreeNode;
// } | null;

// type TreeNode = {
//   name: string;
//   isFolder: boolean;
//   children: TreeNode[];
//   content?: string;
// };

// const TreeView: React.FC<{
//   node: TreeNode;
//   onSelect: (
//     name: string,
//     isFolder: boolean,
//     node: TreeNode,
//     content?: string
//   ) => void;
//   level?: number;
//   lastChild?: boolean;
//   parentPath?: string;
// }> = ({ node, onSelect, level = 0, lastChild = false, parentPath = "" }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//     onSelect(fullPath, node.isFolder, node, node.content);
//   };

//   const getCompactPath = (
//     currentNode: TreeNode,
//     currentPath: string
//   ): [string, TreeNode[]] => {
//     if (
//       currentNode.isFolder &&
//       currentNode.children.length === 1 &&
//       currentNode.children[0].isFolder
//     ) {
//       const childNode = currentNode.children[0];
//       const newPath = currentPath
//         ? `${currentPath}/${currentNode.name}`
//         : currentNode.name;
//       return getCompactPath(childNode, newPath);
//     }
//     return [currentPath, currentNode.children];
//   };

//   const [compactPath, compactChildren] = getCompactPath(node, "");
//   const fullPath = parentPath
//     ? `${parentPath}/${compactPath || node.name}`
//     : compactPath || node.name;
//   const displayName = compactPath || node.name;

//   return (
//     <div className="tree-node" style={{ marginLeft: `${level * 20}px` }}>
//       <div className="tree-content" onClick={handleToggle}>
//         <span className="tree-branch">
//           {level > 0 && (
//             <>
//               {[...Array(level - 1)].map((_, i) => (
//                 <span key={i} className="branch-line">
//                   │{" "}
//                 </span>
//               ))}
//               <span className="branch-line">{lastChild ? "└── " : "├── "}</span>
//             </>
//           )}
//         </span>
//         <span className="tree-icon">
//           {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
//         </span>
//         <span className="tree-label">{displayName}</span>
//       </div>
//       {isOpen &&
//         compactChildren.map((child, index) => (
//           <TreeView
//             key={index}
//             node={child}
//             onSelect={onSelect}
//             level={level + 1}
//             lastChild={index === compactChildren.length - 1}
//             parentPath={fullPath}
//           />
//         ))}
//     </div>
//   );
// };

// const Somepage = () => {
//   //   console.log("welcome to some page");
//   let root1: TreeNode = { name: "root", isFolder: true, children: [] };

//   const [filestuc, setFileStruc] = useState<TreeNode | null>(root1);
//   const [folderName, setFolderName] = useState("default_folder_name");
//   const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

//   const handleClick = (foldername: string) => {
//     console.log("clciked something ");
//     filestuc?.children.push({ name: foldername, isFolder: true, children: [] });
//   };

//   const display_File_Struc_In_Console = () => {
//     console.log("file struture is ");
//     console.log(filestuc);
//   };

//   return (
//     <div className="p-4">
//       Hello world
//       <Card className=" card1 w-96 p-4">
//         <Input
//           className="m-2"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//         />
//         <p>
//           {" "}
//           you can add a path as well below and we will create that path if need
//         </p>
//         <Button onClick={() => handleClick(folderName)}>
//           press me to add a folder of the name of above input
//         </Button>
//       </Card>
//       <Card className="card2 w-96 p-4">
//         <Input className="m-2" />
//         <Button>press me to add a file name</Button>
//       </Card>
//       <Button className="m-4" onClick={display_File_Struc_In_Console}>
//         Cick me to display file structure
//       </Button>
//       <Card className=" p-4 w-96">
//         <p> Here we display the whole file structure </p>
//       </Card>
//     </div>
//   );
// };

// export default Somepage;

// --------------------------------------
// --------------------------------------

"use client";

// import Link from "next/link";
// import Image from "next/image";
// import React, { useState, useCallback, useRef } from "react";

// import MonacoEditor from "@monaco-editor/react";
// import JSZip, { file } from "jszip";

// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// type TreeNode = {
//   id: string;
//   name: string;
//   isFolder: boolean;
//   children: TreeNode[];
//   content?: string;
// };
// import { atom } from "jotai";

// const RenderTree: React.FC<{
//   node: TreeNode;
//   onNodeClick: (node: TreeNode) => void;
//   onAddFolder: (parentId: string) => void;
//   onAddFile: (parentId: string) => void;
//   onDelete: (nodeId: string) => void;
//   onEditName: (nodeId: string, newName: string) => void;
//   isNewNode?: boolean;
// }> = ({
//   node,
//   onNodeClick,
//   onAddFolder,
//   onAddFile,
//   onDelete,
//   onEditName,
//   isNewNode,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [editedName, setEditedName] = useState(node.name);
//   const [isEditing, setIsEditing] = useState(isNewNode);

//   const toggleOpen = () => {
//     if (node.isFolder) {
//       setIsOpen(!isOpen);
//     }
//     onNodeClick(node);
//   };

//   const handleEditName = () => {
//     onEditName(node.id, editedName);
//     setIsEditing(false);
//   };

//   return (
//     <div className="ml-4 text-xs w-96">
//       <div className="flex items-center">
//         <div
//           className="flex items-center cursor-pointer flex-grow"
//           onClick={toggleOpen}
//         >
//           <span className="mr-2">
//             {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
//           </span>
//           {isEditing ? (
//             <input
//               value={editedName}
//               onChange={(e) => setEditedName(e.target.value)}
//               onBlur={handleEditName}
//               onKeyPress={(e) => e.key === "Enter" && handleEditName()}
//               autoFocus
//             />
//           ) : (
//             <span>{node.name}</span>
//           )}
//         </div>
//         <div className="flex items-center">
//           <button onClick={() => setIsEditing(true)} className="mx-1">
//             📝
//           </button>
//           <button onClick={() => onDelete(node.id)} className="mx-1">
//             🗑️
//           </button>
//           {node.isFolder && (
//             <>
//               <button onClick={() => onAddFolder(node.id)} className="mx-1">
//                 ➕📁
//               </button>
//               <button onClick={() => onAddFile(node.id)} className="mx-1">
//                 ➕📄
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//       {isOpen &&
//         node.children.map((child) => (
//           <RenderTree
//             key={child.id}
//             node={child}
//             onNodeClick={onNodeClick}
//             onAddFolder={onAddFolder}
//             onAddFile={onAddFile}
//             onDelete={onDelete}
//             onEditName={onEditName}
//           />
//         ))}
//     </div>
//   );
// };

// let root1: TreeNode = {
//   id: "001",
//   name: "root",
//   isFolder: true,
//   children: [
//     {
//       id: "002",
//       name: "some_folder",
//       isFolder: true,
//       children: [
//         {
//           id: "004",
//           name: "nested_folder1",
//           isFolder: true,
//           children: [
//             {
//               id: "005",
//               name: "nested_folder2",
//               isFolder: true,
//               children: [
//                 {
//                   id: "006",
//                   name: "file_006",
//                   isFolder: false,
//                   children: [],
//                   content: "dome contnt ",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     { id: "007", name: "another_folder", isFolder: true, children: [] },
//     {
//       id: "003",
//       name: "some_random_file",
//       isFolder: false,
//       children: [],
//       content: "some contetn",
//     },
//   ],
// };

// let someeojis = `🗑️ - rubbish/ delete , 📝 - edit name , ➕📁 add folder ,➕📄 add file

// also tell me how make the render tree work with the branches , please remove the ml-4 and make sure it works with branches like "└── " and "├── "

// also please reduce the Size of the Emojis , also please make it so that when i hover over the emojis the background of the emoji changes to bg-gray-400 ,

// `;

// const Somepage = () => {
//   const [fileStruc, setFileStruc] = useState<TreeNode>(root1);
//   const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
//   const [newItemName, setNewItemName] = useState("New Item");

//   const handleNodeClick = (node: TreeNode) => {
//     setSelectedNode(node);
//   };

//   const updateTreeStructure = (
//     nodeId: string,
//     updateFn: (node: TreeNode) => TreeNode
//   ): TreeNode => {
//     const updateNode = (node: TreeNode): TreeNode => {
//       if (node.id === nodeId) {
//         return updateFn(node);
//       }
//       return { ...node, children: node.children.map(updateNode) };
//     };
//     return updateNode(fileStruc);
//   };

//   // const getUniqueName = (parent: TreeNode, baseName: string): string => {
//   //   let newName = baseName;
//   //   let counter = 1;
//   //   while (parent.children.some((child) => child.name === newName)) {
//   //     const nameWithoutExtension = baseName.replace(/\.[^/.]+$/, "");
//   //     const extension = baseName.split(".").pop();
//   //     newName = `${nameWithoutExtension}_${counter}${
//   //       extension ? `.${extension}` : ""
//   //     }`;
//   //     counter++;
//   //   }
//   //   return newName;
//   // };

//   const getUniqueName = (
//     parent: TreeNode,
//     baseName: string,
//     isFolder: boolean
//   ): string => {
//     let newName = baseName;
//     let counter = 1;
//     while (parent.children.some((child) => child.name === newName)) {
//       newName = isFolder
//         ? `${baseName}_${counter}`
//         : `${baseName.replace(/\.[^/.]+$/, "")}_${counter}.${baseName
//             .split(".")
//             .pop()}`;
//       counter++;
//     }
//     return newName;
//   };

//   // const getUniqueName = (parent: TreeNode, baseName: string): string => {
//   //   let newName = baseName;
//   //   let counter = 1;
//   //   while (parent.children.some((child) => child.name === newName)) {
//   //     newName = `${baseName}_${counter}`;
//   //     counter++;
//   //   }
//   //   return newName;
//   // };

//   // const handleAddFolder = (parentId: string) => {
//   //   const parentNode = findNodeById(fileStruc, parentId);
//   //   if (!parentNode) return;

//   //   const uniqueName = getUniqueName(parentNode, "New Folder");
//   //   const newFolder: TreeNode = {
//   //     id: Date.now().toString(),
//   //     name: uniqueName,
//   //     isFolder: true,
//   //     children: [],
//   //   };
//   //   setFileStruc((prevStruc) =>
//   //     updateTreeStructure(parentId, (node) => ({
//   //       ...node,
//   //       children: [...node.children, newFolder],
//   //     }))
//   //   );
//   //   setSelectedNode(newFolder);
//   // };

//   // const handleAddFolder = (parentId: string) => {
//   //   const parentNode = findNodeById(fileStruc, parentId);
//   //   if (!parentNode) return;

//   //   const uniqueName = getUniqueName(parentNode, "New Folder");
//   //   const newFolder: TreeNode = {
//   //     id: Date.now().toString(),
//   //     name: uniqueName,
//   //     isFolder: true,
//   //     children: [],
//   //   };
//   //   setFileStruc((prevStruc) =>
//   //     updateTreeStructure(parentId, (node) => ({
//   //       ...node,
//   //       children: [...node.children, newFolder],
//   //     }))
//   //   );
//   //   setSelectedNode(newFolder);
//   // };

//   const handleAddFolder = (parentId: string) => {
//     const parentNode = findNodeById(fileStruc, parentId);
//     if (!parentNode) return;

//     const uniqueName = getUniqueName(parentNode, "New Folder", true);
//     const newFolder: TreeNode = {
//       id: Date.now().toString(),
//       name: uniqueName,
//       isFolder: true,
//       children: [],
//     };
//     setFileStruc((prevStruc) =>
//       updateTreeStructure(parentId, (node) => ({
//         ...node,
//         children: [...node.children, newFolder],
//       }))
//     );
//     setSelectedNode(newFolder);
//   };

//   const handleAddFile = (parentId: string) => {
//     const parentNode = findNodeById(fileStruc, parentId);
//     if (!parentNode) return;

//     const uniqueName = getUniqueName(parentNode, "New File.txt", false);
//     const newFile: TreeNode = {
//       id: Date.now().toString(),
//       name: uniqueName,
//       isFolder: false,
//       children: [],
//       content: "",
//     };
//     setFileStruc((prevStruc) =>
//       updateTreeStructure(parentId, (node) => ({
//         ...node,
//         children: [...node.children, newFile],
//       }))
//     );
//     setSelectedNode(newFile);
//   };

//   const handleDelete = (nodeId: string) => {
//     setFileStruc((prevStruc) => {
//       const deleteNode = (node: TreeNode): TreeNode => ({
//         ...node,
//         children: node.children
//           .filter((child) => child.id !== nodeId)
//           .map(deleteNode),
//       });
//       return deleteNode(prevStruc);
//     });
//     if (selectedNode?.id === nodeId) {
//       setSelectedNode(null);
//     }
//   };

//   const handleEditName = (nodeId: string, newName: string) => {
//     setFileStruc((prevStruc) =>
//       updateTreeStructure(nodeId, (node) => ({ ...node, name: newName }))
//     );
//   };

//   const findNodeById = (node: TreeNode, id: string): TreeNode | null => {
//     if (node.id === id) return node;
//     for (const child of node.children) {
//       const result = findNodeById(child, id);
//       if (result) return result;
//     }
//     return null;
//   };

//   const handleGenDoc = () => {
//     if (selectedNode) {
//       const parentNode = findParentNode(fileStruc, selectedNode.id);
//       if (!parentNode) return;

//       const uniqueName = getUniqueName(
//         parentNode,
//         `${selectedNode.name}_doc.md`,
//         false
//       );
//       const newDocFile: TreeNode = {
//         id: Date.now().toString(),
//         name: uniqueName,
//         isFolder: false,
//         children: [],
//         content: "summary doc",
//       };

//       setFileStruc((prevStruc) => {
//         return updateTreeStructure(parentNode.id, (node) => ({
//           ...node,
//           children: [...node.children, newDocFile],
//         }));
//       });
//     }
//   };

//   const findParentNode = (
//     node: TreeNode,
//     targetId: string
//   ): TreeNode | null => {
//     if (node.children.some((child) => child.id === targetId)) {
//       return node;
//     }
//     for (const child of node.children) {
//       const result = findParentNode(child, targetId);
//       if (result) return result;
//     }
//     return null;
//   };

//   return (
//     <div className="p-4">
//       <div className="flex">
//         <div className="mr-4 ">
//           <p className="font-bold">Tree Structure here</p>
//           <Card className="p-4">
//             <RenderTree
//               node={fileStruc}
//               onNodeClick={handleNodeClick}
//               onAddFolder={handleAddFolder}
//               onAddFile={handleAddFile}
//               onDelete={handleDelete}
//               onEditName={handleEditName}
//             />
//           </Card>
//         </div>
//         <div>
//           <Card className="card2 w-96 p-4 mt-4">
//             <p>Selected Node: {selectedNode ? selectedNode.name : "None"}</p>
//             <Button onClick={handleGenDoc}>GenDoc</Button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Somepage;
