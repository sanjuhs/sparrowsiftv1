import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MonacoEditor from "@monaco-editor/react";
import {
  TreeNode,
  SelectedFile,
  addFileToTree,
  addDocumentationFile,
} from "../utils/types";
import { TreeView } from "../utils/TreeView";
import { getLanguageFromFileName } from "../utils/types";
import { downloadZip } from "../utils/fileHelpers";

interface Step1DocumentationProps {
  fileStructure: TreeNode | null;
  setFileStructure: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  selectedFile: SelectedFile | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<SelectedFile>>;
  documentation: string;
  setDocumentation: React.Dispatch<React.SetStateAction<string>>;
  migrationSteps: string;
  setMigrationSteps: React.Dispatch<React.SetStateAction<string>>;
  LLMcallFunction: string;
}

const Step1Documentation: React.FC<Step1DocumentationProps> = ({
  fileStructure,
  setFileStructure,
  selectedFile,
  setSelectedFile,
  documentation,
  setDocumentation,
  migrationSteps,
  setMigrationSteps,
  LLMcallFunction,
}) => {
  const handleFileSelect = (
    name: string,
    isFolder: boolean,
    content?: string,
    path?: string[]
  ) => {
    if (!isFolder && content !== undefined && path) {
      console.log("Selected file full path:", path);
      setSelectedFile({
        name,
        content,
        language: getLanguageFromFileName(name),
        path,
      });
    }
  };

  const generateDocumentation = async () => {
    if (!selectedFile) {
      setDocumentation("Please select a file first.");
      return;
    }

    setDocumentation("Generating documentation...");

    try {
      const LLMcall = new Function("messages", LLMcallFunction);

      // Get the path of the selected file
      const getFilePath = (
        node: TreeNode,
        targetName: string
      ): string[] | null => {
        if (node.name === targetName) {
          return [node.name];
        }
        if (node.children) {
          for (const child of node.children) {
            const path = getFilePath(child, targetName);
            if (path) {
              return [node.name, ...path];
            }
          }
        }
        return null;
      };

      const filePath = fileStructure
        ? getFilePath(fileStructure, selectedFile?.name || "")
        : null;

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates documentation for code files.",
        },
        {
          role: "user",
          content: `Generate documentation for the following file:
File path: ${filePath ? filePath.join("/") : "Unknown"}
File name: ${selectedFile?.name}
File content:
${selectedFile?.content}`,
        },
      ];

      const result = await LLMcall(messages);
      setDocumentation(result);

      console.log("Selected file path:", selectedFile.path); // Add this line

      // Create a new Markdown file with the documentation
      const docFileName = `${selectedFile.name.split(".")[0]}.md`;
      const newDocFile: TreeNode = {
        name: docFileName,
        isFolder: false,
        children: [],
        content: result,
      };

      // Create or update the documentation directory
      if (fileStructure) {
        const updatedFileStructure = addDocumentationFile(
          fileStructure,
          selectedFile.path,
          newDocFile
        );
        setFileStructure(updatedFileStructure);
      }

      // Optionally, you can select the new documentation file
      setSelectedFile({
        name: docFileName,
        content: result,
        language: "markdown",
        path: [...selectedFile.path.slice(0, -1), docFileName],
      });
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
    //     setTimeout(() => {
    //       setMigrationSteps(`Steps to migrate from ${sourceLanguage} to ${targetLanguage}:
    // 1. Analyze source code structure
    // 2. Identify language-specific constructs
    // 3. Map equivalent constructs in target language
    // 4. ...`);
    //     }, 2000);
  };

  const handleDownloadAll = () => {
    if (fileStructure) {
      downloadZip(fileStructure, "code_and_documentation.zip");
    }
  };

  const handleDownloadDocumentation = () => {
    if (fileStructure) {
      const docFolder = fileStructure.children.find(
        (child) => child.name === "documentation" && child.isFolder
      );
      if (docFolder) {
        downloadZip(docFolder, "documentation.zip");
      } else {
        alert("No documentation folder found.");
      }
    }
  };

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
              <TreeView
                node={fileStructure}
                onSelect={handleFileSelect}
                path={[]}
              />
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
                selectedFile?.content || "// Select a file to view its content"
              }
              options={{ readOnly: true }}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={generateDocumentation} className="mr-2">
            Generate Documentation
          </Button>
          <Button onClick={generateMigrationSteps} className="mr-2">
            Generate Migration Steps
          </Button>
          <Button onClick={handleDownloadAll} className="mr-2">
            Download Code & Documentation
          </Button>
          <Button onClick={handleDownloadDocumentation}>
            Download Documentation
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

export default Step1Documentation;
