"use client";
// page.tsx
import { CustomNav_v1 } from "@/components/custom/custom_nav";

import React, { useState, useCallback, useRef } from "react";
import FolderStructure from "./treecomponent/FolderStructure";
import { RendertreeStandAlone, TreeNode } from "./treecomponent/RenderTree";
import MonacoEditor from "@monaco-editor/react";
import JSZip, { file } from "jszip";
import useFolderStructure from "./treecomponent/useFolderStructure";

import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialTree = {
  id: "001",
  name: "root",
  isFolder: true,
  children: [],
};

interface ExtendedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  webkitdirectory?: string;
  directory?: string;
}

const FileInput: React.FC<ExtendedInputProps> = (props) => (
  <input {...props} type="file" />
);

const DocumentationToolv1 = () => {
  // all file related States
  const {
    fileStruc,
    handleFileUpload,
    uploadStatus,
    error,
    resetFileStructure,
  } = useFolderStructure(initialTree);

  // Add this line to force re-render when fileStruc changes
  const [, forceUpdate] = React.useState({});

  // Modify handleFileUpload to force a re-render
  const handleFileUploadWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await handleFileUpload(event);
    forceUpdate({});
  };

  const handleReset = () => {
    resetFileStructure();
    forceUpdate({});
  };

  const handleShowFileStrucState = () => {
    console.log(fileStruc);
  };

  const step1 = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Step 0: Setup</CardTitle>
          <CardDescription>
            Upload files and configure the migration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg">
              <div className="p-4 ">
                <h3 className="text-lg font-semibold mb-2">File Structure</h3>
                {fileStruc.children.length > 0 ? (
                  <RendertreeStandAlone
                    key={JSON.stringify(fileStruc)}
                    currentTree={fileStruc}
                  />
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
                        onChange={handleFileUploadWrapper}
                        className="hidden"
                        id="file-upload2"
                        multiple
                      />
                      <label htmlFor="file-upload2" className="cursor-pointer">
                        <div className="text-gray-500">
                          <p>Click to select files, or a zip archive</p>
                          <p className="text-sm">(Max file size: 50MB)</p>
                        </div>
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileInput
                        type="file"
                        accept="*/*"
                        onChange={handleFileUploadWrapper}
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
                    <>
                      <p className="mt-2 text-center">{uploadStatus}</p>
                      <Button onClick={handleReset} className="mt-4">
                        {" "}
                        reload{" "}
                      </Button>
                    </>
                  )}
                  {error && (
                    <p className="mt-2 text-center text-red-500">{error}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-[#FEFAEF]">
      {CustomNav_v1()}
      <div className="container mx-auto mt-4 ">
        <Tabs defaultValue="step1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="step1">Step 1: Setup</TabsTrigger>
            <TabsTrigger value="step2">Step 2: Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="step1">{step1()}</TabsContent>
          <TabsContent value="step2">
            <div> some tab content </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className=" p-4">
        <Button onClick={handleShowFileStrucState}>Show flestruc state</Button>
      </div>
      <div className="p-4">
        <FolderStructure initialTree={initialTree} />
        <RendertreeStandAlone currentTree={initialTree} />
      </div>
    </div>
  );
};

export default DocumentationToolv1;
