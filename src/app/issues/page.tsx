"use client";
// page.tsx
import { CustomNav_v1 } from "@/components/custom/custom_nav";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import the Markdown file
import issuesContent from "./issues.md";

const Issues = () => {
  return (
    <>
      {/* <CustomNav_v1 title="Issues" /> */}
      <div className="container mx-auto px-4">
        {CustomNav_v1("Issues")}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside my-2" {...props} />
                ),
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                input: ({ node, ...props }) => (
                  <input
                    type="checkbox"
                    checked={props.checked}
                    readOnly
                    className="mr-2"
                  />
                ),
              }}
            >
              {issuesContent}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Issues;
