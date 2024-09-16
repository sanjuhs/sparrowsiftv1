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

import { TreeNode, SelectedFile } from "./utils/types";

import Step0Setup from "./components/Step0Setup";
import Step1Documentation from "./components/Step1Documentation";
import Step2Dependencies from "./components/Step2Dependencies";
import Step3FileMigration from "./components/Step3FileMigration";
import Step4TestCases from "./components/Step4TestCases";

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
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null); // Ensure SelectedFile type is used
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null); // Update type to string | null
  // the inital LLM call functions
  //   const api_key_openai = "${process.env.NEXT_PUBLIC_OPENAI_API_KEY}";
  const api_key_openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  let a_variable_name = "helo";

  let initalLllmcallfunc2 = `
        return (async function(messages) {
          
          console.log("func is invoked");

          // console.log(a_variable_name);
          let api_key_openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
          //
          // let messages2 =[{"role":"user" , "content":"what is the cpital fo frnace"}]

  
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

          <TabsContent value="step0">
            <Step0Setup
              fileStructure={fileStructure}
              setFileStructure={setFileStructure}
              uploadStatus={uploadStatus}
              setUploadStatus={setUploadStatus}
              error={error}
              setError={setError}
              LLMcallFunction={LLMcallFunction}
              setLLMcallFunction={setLLMcallFunction}
              sourceLanguage={sourceLanguage}
              setSourceLanguage={setSourceLanguage}
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
            />
          </TabsContent>
          <TabsContent value="step1">
            {/* <Step1Documentation /> */}
            <Step1Documentation
              fileStructure={fileStructure}
              selectedFile={selectedFile}
              setFileStructure={setFileStructure}
              // setSelectedFile={setSelectedFile}
              setSelectedFile={
                setSelectedFile as React.Dispatch<
                  React.SetStateAction<SelectedFile>
                >
              }
              documentation={documentation}
              setDocumentation={setDocumentation}
              migrationSteps={migrationSteps}
              setMigrationSteps={setMigrationSteps}
              LLMcallFunction={LLMcallFunction}
            />
          </TabsContent>
          <TabsContent value="step2">
            <Step2Dependencies />
          </TabsContent>
          <TabsContent value="step3">
            <Step3FileMigration />
          </TabsContent>
          <TabsContent value="step4">
            <Step4TestCases />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MigrationPage;
