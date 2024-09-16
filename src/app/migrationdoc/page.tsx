"use client";
import Image from "next/image";

import React, { useState, useCallback } from "react";
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
import Link from "next/link";

// ... (keep the existing TreeNode, SelectedFile, and TreeView components)

type SelectedFile = {
  name: string;
  content: string;
  language: string;
} | null;

type TreeNode = {
  name: string;
  isFolder: boolean;
  children: TreeNode[];
  content?: string;
};

const TreeView: React.FC<{
  node: TreeNode;
  onSelect: (name: string, isFolder: boolean, content?: string) => void;
  level?: number;
}> = ({ node, onSelect, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSelect(node.name, node.isFolder, node.content);
  };
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {node.isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
      </div>
      {isOpen &&
        node.children.map((child, index) => (
          <TreeView
            key={index}
            node={child}
            onSelect={onSelect}
            level={level + 1}
          />
        ))}
    </div>
  );
};

// ================================================================================

const MigrationPage = () => {
  const [fileStructure, setFileStructure] = useState<TreeNode | null>(null); // Update type to TreeNode | null
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null); // Ensure SelectedFile type is used
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null); // Update type to string | null
  // the inital LLM call functions
  //   const api_key_openai = "${process.env.NEXT_PUBLIC_OPENAI_API_KEY}";
  const api_key_openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  let a_variable_name = "helo";

  let initalLllmcallfunc2 = `
        return (async function(messages) {
          
          console.log("func is invoked");
          console.log(a_variable_name);
          // let api_key_openai = ""
          let api_key_openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
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
  
          if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
          }
  
          const data = await response.json();
          return data.choices[0].message.content;
        })(messages);
      `;
  const [LLMcallFunction, setLLMcallFunction] = useState(initalLllmcallfunc2);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [migrationSteps, setMigrationSteps] = useState("");

  // ... (keep the existing helper functions: getLanguageFromFileName, processFileStructure, addToFileStructure)
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

  const processFileStructure = (
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
    (name: string, isFolder: boolean, content?: string) => {
      if (!isFolder && content !== undefined) {
        setSelectedFile({
          name,
          content,
          language: getLanguageFromFileName(name),
        });
      }
    },
    []
  );

  const getContentFromfile = async () => {
    console.log("file structure");
  };

  const generateDocumentation = async () => {
    setDocumentation("Generating documentation...");

    try {
      // Create the LLMcall function using Function constructor
      const LLMcall = new Function("messages", LLMcallFunction);

      let filestrucstring = JSON.stringify(fileStructure, null, 2);
      console.log(filestrucstring);

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates documentation for code files.",
        },
        {
          role: "user",
          content:
            "Generate documentation for the following file structure:" +
            filestrucstring,
        },
      ];

      const result = await LLMcall(messages);
      setDocumentation(result);
    } catch (error) {
      console.error("Error generating documentation:", error);
      setDocumentation(
        `Error generating documentation: ${(error as Error).message}`
      );
    }
  };

  const generateMigrationSteps = async () => {
    // Placeholder for migration steps generation logic
    setMigrationSteps("Generating migration steps...");
    // You would call your LLM here to generate migration steps
    // For now, we'll just set a placeholder text
    setTimeout(() => {
      setMigrationSteps(`Steps to migrate from ${sourceLanguage} to ${targetLanguage}:
1. Analyze source code structure
2. Identify language-specific constructs
3. Map equivalent constructs in target language
4. ...`);
    }, 2000);
  };

  // put all the tab functions below

  const step0 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">Step 0: Setup</CardTitle>
          <CardDescription>
            Upload files and configure the migration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="file-upload">
              <AccordionTrigger>File Upload</AccordionTrigger>
              <AccordionContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="*/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-gray-500">
                      <p>Click to select files, a zip archive, or a folder</p>
                      <p className="text-sm">(Max file size: 50MB)</p>
                    </div>
                  </label>
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
            <AccordionItem value="migration-config">
              <AccordionTrigger>Migration Configuration</AccordionTrigger>
              <AccordionContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="sourceLanguage">Source Language</Label>
                  <Input
                    type="text"
                    id="sourceLanguage"
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    placeholder="e.g., JavaScript"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                  <Label htmlFor="targetLanguage">Target Language</Label>
                  <Input
                    type="text"
                    id="targetLanguage"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    placeholder="e.g., Python"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    );
  };

  const step1 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">
            Step 1: Documentation & Migration
          </CardTitle>
          <CardDescription>
            Generate documentation and migration steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Documentation Prompt Settings</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
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
          <div className="mt-4">
            <Button onClick={generateDocumentation} className="mr-2">
              Generate Documentation
            </Button>
            <Button onClick={generateMigrationSteps}>
              Generate Migration Steps
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
                options={{ readOnly: true }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Migration Steps</h3>
              <MonacoEditor
                height="200px"
                language="markdown"
                theme="vs-dark"
                value={migrationSteps}
                options={{ readOnly: true }}
              />
            </div>
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
            Step 2: Resolve Circular Dependencies
          </CardTitle>
          <CardDescription>
            We need to first resolve all circular dependencies and preferbaly
            rewrite the code to prepapre it for a smooth migration.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  };

  const step3 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">
            Step 3: One to One file migration
          </CardTitle>
          <CardDescription>
            Generate documentation and migration steps
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  };

  const step4 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#CE4F3D]">
            Step 4: Test cases Generation
          </CardTitle>
          <CardDescription>
            Generate documentation and migration steps
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-[#FEFAEF] min-h-screen">
      <nav className="bg-white shadow-md p-1">
        <div className="ml-4 mx-auto flex align-middle">
          <Link href="/" className="border rounded-lg mr-2">
            <Image
              src="/ssui.png"
              alt="thesift Ui log with a sparrow sitting on blocks"
              width={24}
              height={24}
              className="rounded-lg"
            />
          </Link>
          <p className="text-[#CE4F3D] text-md font-bold">
            Migration Tool T-1
            <span className="ml-2 text-xs font-[500] hidden">type-1</span>
          </p>
        </div>
      </nav>

      <div className="container mx-auto mt-4">
        <Tabs defaultValue="step0" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="step0">Step 0: Setup</TabsTrigger>
            <TabsTrigger value="step1">Step 1: Documentation</TabsTrigger>
            <TabsTrigger value="step2">Step 2: Dependencies</TabsTrigger>
            <TabsTrigger value="step3">Step 3: File migration</TabsTrigger>
            <TabsTrigger value="step4">Step 4: Test cases</TabsTrigger>
          </TabsList>

          <TabsContent value="step0">{step0()}</TabsContent>
          <TabsContent value="step1">{step1()}</TabsContent>
          <TabsContent value="step2">{step2()}</TabsContent>
          <TabsContent value="step3">{step3()}</TabsContent>
          <TabsContent value="step4">{step4()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MigrationPage;
