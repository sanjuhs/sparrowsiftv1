"use client";
// page.tsx
import Image from "next/image";
import Link from "next/link";
import { CustomNav_v1 } from "@/components/custom/custom_nav";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ToolList = () => {
  return (
    <>
      {CustomNav_v1("Tool List")}
      <div className="container mx-auto px-4">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tool List</CardTitle>
            <Link href="/aiflow">
              Opensource UI flow
              <p className="text-xs text-gray-500">
                {" "}
                This tool uses Shadcn Ui , Nextjs and React to render components
                on screen ,{" "}
              </p>
            </Link>
            <Link href="/documentationTool">
              Documentation Tool v1
              <p className="text-xs text-gray-500">
                {" "}
                This tool is used to get documentation recursively through all
                the files and folders of the repository{" "}
              </p>
            </Link>
            <Link href="/fileStrucCompo">
              Documentation tool with file structure v2
              <p className="text-xs text-gray-500">
                {" "}
                This tool is used to get documentation recursively through all
                the files and folders of the repository{" "}
              </p>
            </Link>
            <Link href="/migrationDoc">
              Migration Tool v1
              <p className="text-xs text-gray-500">
                {" "}
                This tool is used for a full migration to convert one code base
                to another{" "}
              </p>
            </Link>
            <Link href="/migrationdocv2">
              Migration Tool v2
              <p className="text-xs text-gray-500">
                {" "}
                This tool is used for a full migration to convert one code base
                into it to another, with multiple updates, compared to the
                previous code
              </p>
            </Link>
          </CardHeader>
          <p className="text-xs text-gray-500 p-2">
            * all tools are still WIP (work in porgress)
          </p>
        </Card>
      </div>
    </>
  );
};

export default ToolList;
