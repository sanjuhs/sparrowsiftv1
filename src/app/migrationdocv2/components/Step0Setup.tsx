import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MonacoEditor from "@monaco-editor/react";

import { handleFileUpload } from "../utils/fileHelpers";
import { TreeNode } from "../utils/types";

interface Step0SetupProps {
  fileStructure: TreeNode | null;
  setFileStructure: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  uploadStatus: string;
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  LLMcallFunction: string;
  setLLMcallFunction: React.Dispatch<React.SetStateAction<string>>;
  sourceLanguage: string;
  setSourceLanguage: React.Dispatch<React.SetStateAction<string>>;
  targetLanguage: string;
  setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Step0Setup: React.FC<Step0SetupProps> = ({
  fileStructure,
  setFileStructure,
  uploadStatus,
  setUploadStatus,
  error,
  setError,
  LLMcallFunction,
  setLLMcallFunction,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
}) => {
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
                  //   onChange={handleFileUpload}
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      setFileStructure,
                      setUploadStatus,
                      setError
                    )
                  }
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

export default Step0Setup;
