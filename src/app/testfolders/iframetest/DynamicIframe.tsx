"use client";
// import React, { useEffect, useRef } from "react";

// function DynamicIframe({ componentCode }) {
//   const iframeRef = useRef(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//     // Create a script to inject into the iframe
//     const scriptContent = `
//       const React = window.React;
//       const ReactDOM = window.ReactDOM;
//       const { createRoot } = ReactDOM;
//       ${componentCode}
//     `;

//     // Write the initial HTML structure
//     iframeDoc.open();
//     iframeDoc.write(`
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Dynamic Iframe</title>
//       </head>
//       <body>
//         <div id="root"></div>
//         <script src="https://unpkg.com/react/umd/react.development.js"></script>
//         <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
//         <script>
//           ${scriptContent}
//         </script>
//       </body>
//       </html>
//     `);
//     iframeDoc.close();
//   }, [componentCode]);

//   return <iframe ref={iframeRef} className="h-full w-full" />;
// }

// export default DynamicIframe;

// -------------------

// components/DynamicIframe.js
// ("use client");
// import React, { useEffect, useRef } from "react";
// import { transform } from "@babel/standalone";

// function DynamicIframe({ componentCode }) {
//   const iframeRef = useRef(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

//     try {
//       // Transform JSX to JavaScript
//       const transformedCode = transform(componentCode, {
//         presets: ["react"],
//       }).code;

//       // Create a script to inject into the iframe
//       const scriptContent = `
//         import React from 'react';
//         import { createRoot } from 'react-dom/client';
//         import { Button } from '@/components/ui/button';
//         ${transformedCode}
//         const root = createRoot(document.getElementById('root'));
//         root.render(React.createElement(MyComponent));
//       `;

//       // Write the initial HTML structure
//       iframeDoc.open();
//       iframeDoc.write(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Dynamic Iframe</title>
//           <link href="/styles/globals.css" rel="stylesheet">
//         </head>
//         <body>
//           <div id="root"></div>
//           <script type="module">
//             ${scriptContent}
//           </script>
//         </body>
//         </html>
//       `);
//       iframeDoc.close();
//     } catch (error) {
//       console.error("Error rendering component:", error);
//       iframeDoc.open();
//       iframeDoc.write(`<h1>Error rendering component: ${error.message}</h1>`);
//       iframeDoc.close();
//     }
//   }, [componentCode]);

//   return <iframe ref={iframeRef} className="w-full h-64 border rounded" />;
// }

// export default DynamicIframe;

// -------------------

"use client";
import React, { useEffect, useRef } from "react";
import { transform } from "@babel/standalone";

function DynamicIframe({ componentCode }: { componentCode: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    try {
      // Transform JSX to JavaScript
      const transformedCode = transform(componentCode, {
        presets: ["react"],
        plugins: [
          // Custom plugin to handle @/ imports
          function myCustomPlugin() {
            return {
              visitor: {
                ImportDeclaration(path: any) {
                  if (path.node.source.value.startsWith("@/")) {
                    path.node.source.value = path.node.source.value.replace(
                      "@/",
                      "/"
                    );
                  }
                },
              },
            };
          },
        ],
      }).code;

      // Create a script to inject into the iframe
      const scriptContent = `
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        ${transformedCode}
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(MyComponent));
      `;

      // Write the initial HTML structure
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dynamic Iframe</title>
          <link href="/globals.css" rel="stylesheet">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="module">
            ${scriptContent}
          </script>
        </body>
        </html>
      `);
      iframeDoc.close();
    } catch (error) {
      console.error("Error rendering component:", error);
      iframeDoc.open();
      iframeDoc.write(
        `<h1>Error rendering component: ${
          error instanceof Error ? error.message : String(error)
        }</h1>`
      );
      iframeDoc.close();
    }
  }, [componentCode]);

  return <iframe ref={iframeRef} className="w-full h-64 border rounded" />;
}

export default DynamicIframe;
