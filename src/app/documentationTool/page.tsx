"use client";
import Image from "next/image";
import Link from "next/link";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonacoEditor from "@monaco-editor/react";
import JSZip, { file } from "jszip";
import { Textarea } from "@/components/ui/textarea";

import { CustomNav_v1 } from "@/components/custom/custom_nav";

interface ExtendedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  webkitdirectory?: string;
  directory?: string;
}

const FileInput: React.FC<ExtendedInputProps> = (props) => (
  <input {...props} type="file" />
);

type SelectedFile = {
  name: string;
  content: string;
  language: string;
  node: TreeNode;
} | null;

type TreeNode = {
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const TreeView: React.FC<{
  node: TreeNode;
  onSelect: (
    name: string,
    isFolder: boolean,
    node: TreeNode,
    content?: string
  ) => void;
  level?: number;
  lastChild?: boolean;
  parentPath?: string;
}> = ({ node, onSelect, level = 0, lastChild = false, parentPath = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSelect(fullPath, node.isFolder, node, node.content);
  };

  const getCompactPath = (
    currentNode: TreeNode,
    currentPath: string
  ): [string, TreeNode[]] => {
    if (
      currentNode.isFolder &&
      currentNode.children.length === 1 &&
      currentNode.children[0].isFolder
    ) {
      const childNode = currentNode.children[0];
      const newPath = currentPath
        ? `${currentPath}/${currentNode.name}`
        : currentNode.name;
      return getCompactPath(childNode, newPath);
    }
    return [currentPath, currentNode.children];
  };

  const [compactPath, compactChildren] = getCompactPath(node, "");
  const fullPath = parentPath
    ? `${parentPath}/${compactPath || node.name}`
    : compactPath || node.name;
  const displayName = compactPath || node.name;

  return (
    <div className="tree-node" style={{ marginLeft: `${level * 20}px` }}>
      <div className="tree-content" onClick={handleToggle}>
        <span className="tree-branch">
          {level > 0 && (
            <>
              {[...Array(level - 1)].map((_, i) => (
                <span key={i} className="branch-line">
                  │{" "}
                </span>
              ))}
              <span className="branch-line">{lastChild ? "└── " : "├── "}</span>
            </>
          )}
        </span>
        <span className="tree-icon">
          {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"}
        </span>
        <span className="tree-label">{displayName}</span>
      </div>
      {isOpen &&
        compactChildren.map((child, index) => (
          <TreeView
            key={index}
            node={child}
            onSelect={onSelect}
            level={level + 1}
            lastChild={index === compactChildren.length - 1}
            parentPath={fullPath}
          />
        ))}
    </div>
  );
};

//  - - - - - Constants here  - - - - - - -

const api_key_openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
let initalLllmcallfunc2 = `
        return (async function(messages) {
          
          // let api_key_openai = " please add your API key here! , for now I will use my personal key"
          const api_key_openai = "${process.env.NEXT_PUBLIC_OPENAI_API_KEY}";

          console.log("called the function here");

  
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + api_key_openai
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: messages
            })
          });

          console.log("response is " ,response)
  
          if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
          }
  
          const data = await response.json();
          console.log("content is ",data.choices[0].message.content)
          return data.choices[0].message.content;
          
        })(messages);
      `;

// ============================== Actual page ==================================================

const DocumentationToolPage = () => {
  // constants and other data

  // all file related States
  const [fileStructure, setFileStructure] = useState<TreeNode | null>(null); // Update type to TreeNode | null
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null); // Ensure SelectedFile type is used
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null); // Update type to string | null

  // setup LLM state
  const [LLMcallFunction, setLLMcallFunction] = useState(initalLllmcallfunc2);

  // this is for initial information of the Repository that the User provides // optional
  const [intialRepoInfo, setInitialRepoInfo] = useState("");
  const [documentationPrompt, setDocumentationPrompt] = useState(
    "You are a helpful assistant that generates documentation for code files."
  );
  // step 2 Documentation based Variables
  const [documentation, setDocumentation] = useState("");
  const [dependencyJSON, setDependencyJSON] = useState("{}");

  // these helper functions are related to Files and Manipulation
  // things to add include som other things

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

  // file system based functions:
  const addToFileStructure = (
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
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
          for (const [relativePath, zipEntry] of Object.entries(
            contents.files
          )) {
            if (!zipEntry.dir) {
              const content = await zipEntry.async("string");
              addToFileStructure(
                root,
                relativePath.split("/").filter(Boolean),
                false,
                content
              );
            } else {
              addToFileStructure(
                root,
                relativePath.split("/").filter(Boolean),
                true
              );
            }
          }
        } else {
          // Handle individual files or folder
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const path = file.webkitRelativePath || file.name;
            const content = await file.text();
            addToFileStructure(
              root,
              path.split("/").filter(Boolean),
              false,
              content
            );
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

  const handleFileSelect = useCallback(
    (name: string, isFolder: boolean, node: TreeNode, content?: string) => {
      if (!isFolder && content !== undefined) {
        setSelectedFile({
          name,
          content,
          language: getLanguageFromFileName(name),
          node,
        });
      }
    },
    []
  );

  async function generateDocumentation(
    node: TreeNode,
    path: string = ""
  ): Promise<void> {
    if (!node.isFolder) {
      // Generate documentation for a file
      // lets implement the generate documentation function later for now
      //   const docContent = await generateFileDocumentation(
      //     node.content || "",
      //     node.name
      //   );
      const docFileName = `${path}/${node.name}.md`;
      //   await saveDocumentation(docFileName, docContent);
    } else {
      // Process folder
      const childDocs: string[] = [];
      for (const child of node.children) {
        await generateDocumentation(child, `${path}/${node.name}`);
        if (child.isFolder) {
          const summary = await getFolderSummary(
            `${path}/${node.name}/${child.name}`
          );
          childDocs.push(summary);
        }
      }

      if (node.children.length > 1) {
        const folderSummary = await generateFolderSummary(
          node,
          childDocs,
          path
        );
        const summaryFileName = `${path}/${node.name}/README.md`;
        // await saveDocumentation(summaryFileName, folderSummary);
      }
    }
  }

  async function generateFileDocumentation(
    content: string,
    fileName: string,
    node: TreeNode
    //   path: string = ""
  ): Promise<string> {
    //   Promise<void>
    // Use LLM to generate documentation for a single file
    console.log("generating file documentation on ", fileName);
    console.log(" the content is :", content);
    console.log(LLMcallFunction);
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates documentation for code files.",
      },
      {
        role: "user",
        content: `Generate documentation for the following file named ${fileName}:\n\n${content}`,
      },
    ];
    console.log("messages are ", messages);
    const LLMcall = new Function("messages", LLMcallFunction);
    const docContent = await LLMcall(messages);
    console.log("flag-000", fileStructure);
    // let new_name = node
    await saveDocumentation(
      `${node.name}`,
      docContent,
      fileStructure || { name: "root", isFolder: true, children: [] }
    ); //  index.html

    return docContent;
  }

  // ----- this for folder summary files
  async function generateFolderSummary(
    node: TreeNode,
    childDocs: string[],
    path: string
  ): Promise<string> {
    const treeStructure = generateTreeStructure(node);
    const childDocsContent = childDocs.join("\n\n");

    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates summaries for folders containing multiple files and subfolders.",
      },
      {
        role: "user",
        content: `Generate a summary for the folder ${node.name} based on the following information:
  
  Tree structure:
  ${treeStructure}
  
  Child documentation summaries:
  ${childDocsContent}
  
  Please provide an overall summary of this folder's contents and purpose.`,
      },
    ];
    const LLMcall = new Function("messages", LLMcallFunction);

    const summary = await LLMcall(messages);
    return summary;
  }

  function generateTreeStructure(node: TreeNode, prefix: string = ""): string {
    let result = `${prefix}${node.name}\n`;
    if (node.isFolder) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const isLast = i === node.children.length - 1;
        const newPrefix = prefix + (isLast ? "└── " : "├── ");
        const childPrefix = prefix + (isLast ? "    " : "│   ");
        result += generateTreeStructure(child, newPrefix);
      }
    }
    return result;
  }

  function deepCopyTreeNode(node: TreeNode): TreeNode {
    const copy: TreeNode = {
      name: node.name,
      isFolder: node.isFolder,
      children: [],
      content: node.content,
    };

    for (const child of node.children) {
      copy.children.push(deepCopyTreeNode(child));
    }

    return copy;
  }

  const saveDocumentation = async (
    fileName: string,
    content: string,
    node: TreeNode
  ): Promise<void> => {
    const pathParts = fileName.split("/");
    console.log(" flag-001 ", pathParts);
    console.log(" flag-003.1 ", node);

    // let current_state = fileStructure;
    // current_state;
    let node2 = deepCopyTreeNode(node);
    // let currentNode = deepCopyTreeNode(node);
    let currentNode = node2;
    console.log(" flag-003.2 ", node);
    // Navigate through the tree structure
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      const childNode = currentNode.children.find(
        (child) => child.name === part
      );
      if (childNode && childNode.isFolder) {
        console.log(" flag-003");
        currentNode = childNode;
      } else {
        // If the path doesn't exist, create it
        console.log("Making a new node sir");
        const newNode: TreeNode = { name: part, isFolder: true, children: [] };
        currentNode.children.push(newNode);
        currentNode = newNode;
      }
    }
    console.log(" flag-003.3 ", node);

    // Add or update the documentation file
    const docFileName = `${pathParts[pathParts.length - 1]}_doc.md`;
    const existingDocFile = currentNode.children.find(
      (child) => child.name === docFileName
    );
    console.log(" flag-003,5 ", node);

    if (existingDocFile) {
      existingDocFile.content = content;
    } else {
      currentNode.children.push({
        name: docFileName,
        isFolder: false,
        children: [],
        content: content,
      });
    }
    console.log(" flag-004 ", node);

    // Update the file structure state
    setFileStructure({ ...node2 });
  };

  const saveDocumentation02 = async (
    fileName: string,
    content: string,
    node: TreeNode
  ): Promise<void> => {
    const pathParts = fileName.split("/");
    console.log(" flag-001 ", pathParts);
    console.log(" flag-003.1 ", node);

    let currentNode = node;

    // Navigate through the tree structure to find the parent directory
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      const childNode = currentNode.children.find(
        (child) => child.name === part
      );
      if (childNode && childNode.isFolder) {
        currentNode = childNode;
      } else {
        // If the path doesn't exist, create it
        console.log("Making a new node");
        const newNode: TreeNode = { name: part, isFolder: true, children: [] };
        currentNode.children.push(newNode);
        currentNode = newNode;
      }
    }

    // Generate the documentation file name
    const originalFileName = pathParts[pathParts.length - 1];
    const docFileName = `${originalFileName}_doc.md`;

    // Add or update the documentation file in the same directory as the original file
    const existingDocFile = currentNode.children.find(
      (child) => child.name === docFileName
    );

    if (existingDocFile) {
      existingDocFile.content = content;
    } else {
      currentNode.children.push({
        name: docFileName,
        isFolder: false,
        children: [],
        content: content,
      });
    }

    console.log(" flag-004 ", node);

    // Update the file structure state
    setFileStructure({ ...node });
  };

  //
  async function getFolderSummary(folderPath: string): Promise<string> {
    // Read the folder's README.md file and return its content
    // This is a placeholder - you'll need to implement file reading logic based on your setup
    return `Summary of ${folderPath}`;
  }

  const downloadZippedFiles = async () => {
    if (!fileStructure) {
      alert("No files to download. Please upload files first.");
      return;
    }

    const zip = new JSZip();

    const addFilesToZip = (node: TreeNode, currentPath: string = "") => {
      if (node.isFolder) {
        node.children.forEach((child) => {
          addFilesToZip(child, `${currentPath}${node.name}/`);
        });
      } else {
        zip.file(`${currentPath}${node.name}`, node.content || "");
      }
    };

    addFilesToZip(fileStructure);

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "uploaded_files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // put all the tab functions below

  const step1 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">Step 0: Setup</CardTitle>
          <CardDescription>
            Upload files and configure the migration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg">
              <div className="p-4 ">
                <h3 className="text-lg font-semibold mb-2">File Structure</h3>
                {fileStructure ? (
                  <TreeView node={fileStructure} onSelect={handleFileSelect} />
                ) : (
                  <p>Upload files to view the structure</p>
                )}
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="file-upload">
                <AccordionTrigger>File Upload</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 ">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="*/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload2"
                        multiple
                      />
                      <label htmlFor="file-upload2" className="cursor-pointer">
                        <div className="text-gray-500">
                          <p>Click to select files, a zip archive</p>
                          <p className="text-sm">(Max file size: 50MB)</p>
                        </div>
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileInput
                        type="file"
                        accept="*/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="folder-upload"
                        multiple
                        webkitdirectory=""
                        directory=""
                      />

                      <label htmlFor="folder-upload" className="cursor-pointer">
                        <div className="text-gray-500">
                          <p>Click to upload a Folder/Directory</p>
                          <p className="text-sm">(Max file size: 50MB)</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {uploadStatus && (
                    <p className="mt-2 text-center">{uploadStatus}</p>
                  )}
                  {error && (
                    <p className="mt-2 text-center text-red-500">{error}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="llm-function">
                <AccordionTrigger>LLM Call Function</AccordionTrigger>
                <AccordionContent>
                  <MonacoEditor
                    height="300px"
                    language="javascript"
                    theme="vs-dark"
                    value={LLMcallFunction}
                    onChange={(value) => setLLMcallFunction(value || "")}
                  />
                  <Button className="mt-2">Update LLM Call Function</Button>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="initialRepoInfo-config">
                <AccordionTrigger>Initial Info on Repo</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full">
                    {/* <Label htmlFor="sourceLanguage">
                      Intial Info on prompt
                    </Label> */}
                    <div className="p-2">
                      <Textarea
                        id="intialRepoInfo"
                        value={intialRepoInfo}
                        onChange={(e) => setInitialRepoInfo(e.target.value)}
                        placeholder=".. please add the info of the Repo in this location"
                        className="p-4 w-full  h-32"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="migration-config">
                <AccordionTrigger> Documentation Prompt</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full">
                    <div className="p-2">
                      <Textarea
                        id="intialRepoInfo"
                        value={documentationPrompt}
                        onChange={(e) => setDocumentationPrompt(e.target.value)}
                        // placeholder=".. please add the info of the Repo in this location"
                        className="p-4 w-full  h-32"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    );
  };

  const step2 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">
            Step 2: Documentation
          </CardTitle>
          <CardDescription>
            Generate documentation with custom prompts and uses and use
            dependency graphs to analyze the code repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Documentation Prompt Settings</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">File Structure</h3>
              {fileStructure ? (
                <TreeView node={fileStructure} onSelect={handleFileSelect} />
              ) : (
                <p>Upload files to view the structure</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Selected File</h3>
              <MonacoEditor
                height="200px"
                language={selectedFile?.language || "plaintext"}
                theme="vs-dark"
                value={
                  selectedFile?.content ||
                  "// Select a file to view its content"
                }
                options={{ readOnly: true }}
              />
            </div>
          </div>

          <div className="my-2 text-xs">
            <Button
              onClick={async () => {
                let singlefile_documentation = await generateFileDocumentation(
                  selectedFile?.content || "",
                  selectedFile?.name || "",
                  selectedFile?.node as TreeNode
                );
                setDocumentation(singlefile_documentation);
              }}
              className="mr-2 text-xs"
            >
              Generate Documentation !
            </Button>
            <Button
              className="mr-2"
              onClick={() =>
                fileStructure && generateDocumentation(fileStructure)
              }
            >
              <div className="text-[8px]">
                Generate Full Documentation Recursively
              </div>
            </Button>
            <Button onClick={downloadZippedFiles} className="mr-2">
              Download Zipped Files
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <MonacoEditor
                height="200px"
                language="markdown"
                theme="vs-dark"
                value={documentation}
                // options={{ readOnly: true }}
              />
            </div>
            <div>MD formatted DOcumentation</div>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Dependency JSON</h3>
              <MonacoEditor
                height="200px"
                language="json"
                theme="vs-dark"
                value={dependencyJSON}
                options={{ readOnly: true }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-[#FEFAEF] min-h-screen">
      {CustomNav_v1()}

      <div className="container mx-auto mt-4">
        <Tabs defaultValue="step1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="step1">Step 1: Setup</TabsTrigger>
            <TabsTrigger value="step2">Step 2: Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="step1">{step1()}</TabsContent>
          <TabsContent value="step2">{step2()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentationToolPage;
