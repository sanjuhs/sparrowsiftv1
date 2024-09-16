"use client";

// import React, { useEffect, useRef } from "react";
// import { transform } from "@babel/standalone";

// function DynamicIframe({ componentCode }: { componentCode: string }) {
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return;

//     try {
//       // Transform JSX to JavaScript
//       const transformedCode = transform(componentCode, {
//         presets: ["react"],
//         plugins: [
//           // Custom plugin to handle @/ imports
//           function myCustomPlugin() {
//             return {
//               visitor: {
//                 ImportDeclaration(path: any) {
//                   if (path.node.source.value.startsWith("@/")) {
//                     path.node.source.value = path.node.source.value.replace(
//                       "@/",
//                       "/"
//                     );
//                   }
//                 },
//               },
//             };
//           },
//         ],
//       }).code;

//       // Create a script to inject into the iframe
//       const scriptContent = `
//         import React from 'react';
//         import ReactDOM from 'react-dom/client';
//         ${transformedCode}
//         const root = ReactDOM.createRoot(document.getElementById('root'));
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
//           <link href="/app/globals.css" rel="stylesheet">
//           <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
//           <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
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
//       iframeDoc.write(
//         `<h1>Error rendering component: ${
//           error instanceof Error ? error.message : String(error)
//         }</h1>`
//       );
//       iframeDoc.close();
//     }
//   }, [componentCode]);

//   return <iframe ref={iframeRef} className="w-full h-64 border rounded" />;
// }

// export default DynamicIframe;

// -------------------------------------------------------------------------------------------------

// // components/custom/DynamicIframe.tsx
// "use client";
// import React, { useEffect, useRef } from "react";
// import { transform } from "@babel/standalone";

// function DynamicIframe({ componentCode }: { componentCode: string }) {
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return;

//     try {
//       // Transform JSX to JavaScript
//       const transformedCode = transform(componentCode, {
//         presets: ["react"],
//         plugins: [
//           // Custom plugin to handle @/ imports
//           function myCustomPlugin() {
//             return {
//               visitor: {
//                 ImportDeclaration(path: any) {
//                   if (path.node.source.value.startsWith("@/")) {
//                     path.node.source.value = path.node.source.value.replace(
//                       "@/",
//                       "/"
//                     );
//                   }
//                 },
//               },
//             };
//           },
//         ],
//       }).code;

//       // Create a script to inject into the iframe
//       const scriptContent = `
//         const MyComponent = (() => {
//           ${transformedCode}
//           return MyComponent;
//         })();

//         const root = ReactDOM.createRoot(document.getElementById('root'));
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
//           <link href="/app/globals.css" rel="stylesheet">
//           <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
//           <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
//           <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
//         </head>
//         <body>
//           <div id="root"></div>
//           <script>
//             ${scriptContent}
//           </script>
//         </body>
//         </html>
//       `);
//       iframeDoc.close();
//     } catch (error) {
//       console.error("Error rendering component:", error);
//       iframeDoc.open();
//       iframeDoc.write(
//         `<h1>Error rendering component: ${
//           error instanceof Error ? error.message : String(error)
//         }</h1>`
//       );
//       iframeDoc.close();
//     }
//   }, [componentCode]);

//   return <iframe ref={iframeRef} className="w-full h-64 border rounded" />;
// }

// export default DynamicIframe;

// -------------------------------------------------------------------------------------------------

// // components/custom/DynamicIframe.tsx
// "use client";
// import React, { useEffect, useRef, useState } from "react";

// function DynamicIframe({ componentCode }: { componentCode: string }) {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [iframeKey, setIframeKey] = useState(0);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     // Create a blob URL for the iframe content
//     const blob = new Blob(
//       [
//         `
//       import React from 'react';
//       import ReactDOM from 'react-dom/client';
//       import { Button } from '/components/ui/button';
//       ${componentCode}

//       ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MyComponent));
//     `,
//       ],
//       { type: "text/html" }
//     );

//     const url = URL.createObjectURL(blob);

//     // Set the iframe src to the blob URL
//     iframe.src = url;

//     // Clean up the blob URL when the component unmounts or updates
//     return () => URL.revokeObjectURL(url);
//   }, [componentCode]);

//   // Force iframe refresh when componentCode changes
//   useEffect(() => {
//     setIframeKey((prev) => prev + 1);
//   }, [componentCode]);

//   return (
//     <iframe
//       ref={iframeRef}
//       key={iframeKey}
//       className="w-full h-64 border rounded"
//       sandbox="allow-scripts"
//     />
//   );
// }

// export default DynamicIframe;

// -------------------------------------------------------------------------------------------------

// // components/custom/DynamicIframe.tsx
// "use client";
// import React, { useEffect, useRef, useState } from "react";

// function DynamicIframe({ componentCode }: { componentCode: string }) {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const handleIframeLoad = () => {
//       console.log("Iframe loaded");
//       const iframeDoc =
//         iframe.contentDocument || iframe.contentWindow?.document;
//       if (!iframeDoc) {
//         console.error("Could not access iframe document");
//         setError("Could not access iframe document");
//         return;
//       }

//       // Log the content of the iframe for debugging
//       console.log("Iframe content:", iframeDoc.body.innerHTML);
//     };

//     iframe.addEventListener("load", handleIframeLoad);
//     // import { Button } from 'https://esm.sh/@/components/ui/button';

//     // Create a blob URL for the iframe content

//     const blob = new Blob(
//       [
//         `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Dynamic Iframe</title>
//         <script type="module">
//           import React from 'https://esm.sh/react@18';
//           import ReactDOM from 'https://esm.sh/react-dom@18/client';

//           ${componentCode}

//           try {
//             ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MyComponent));
//           } catch (error) {
//             console.error("Error rendering component:", error);
//             document.body.innerHTML = '<h1>Error rendering component: ' + error.message + '</h1>';
//           }
//         </script>
//       </head>
//       <body>
//         <div id="root"></div>
//       </body>
//       </html>
//     `,
//       ],
//       { type: "text/html" }
//     );

//     const url = URL.createObjectURL(blob);

//     // Set the iframe src to the blob URL
//     iframe.src = url;

//     // Clean up
//     return () => {
//       URL.revokeObjectURL(url);
//       iframe.removeEventListener("load", handleIframeLoad);
//     };
//   }, [componentCode]);

//   return (
//     <div>
//       <iframe
//         ref={iframeRef}
//         className="w-full h-64 border rounded"
//         sandbox="allow-scripts"
//       />
//       {error && <div className="text-red-500 mt-2">Error: {error}</div>}
//     </div>
//   );
// }

// export default DynamicIframe;

// -------------------------------------------------------------------------------------------------

// components/custom/DynamicIframe.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

function DynamicIframe({ componentCode }: { componentCode: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "error") {
        setError(event.data.message);
      } else if (event.data.type === "log") {
        console.log("Iframe log:", event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);

    // Create a blob URL for the iframe content
    const blob = new Blob(
      [
        `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dynamic Iframe</title>
        <script type="module">
          import React from 'https://esm.sh/react@18';
          import ReactDOM from 'https://esm.sh/react-dom@18/client';
          import { Button } from 'https://esm.sh/@shadcn/ui@0.1.0/dist/components/ui/button.mjs';

          window.parent.postMessage({ type: 'log', message: 'Script started' }, '*');

          const componentCode = ${JSON.stringify(componentCode)};
          
          try {
            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            const AsyncComponent = new AsyncFunction('React', 'Button', \`return (\${componentCode}\)\`);
            
            AsyncComponent(React, Button).then(MyComponent => {
              ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MyComponent));
              window.parent.postMessage({ type: 'log', message: 'Component rendered' }, '*');
            });
          } catch (error) {
            window.parent.postMessage({ type: 'error', message: error.message }, '*');
          }
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>
    `,
      ],
      { type: "text/html" }
    );

    const url = URL.createObjectURL(blob);

    // Set the iframe src to the blob URL
    iframe.src = url;

    // Clean up
    return () => {
      URL.revokeObjectURL(url);
      window.removeEventListener("message", handleMessage);
    };
  }, [componentCode]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        className="w-full h-64 border rounded"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      />
      {error && <div className="text-red-500 mt-2">Error: {error}</div>}
    </div>
  );
}

export default DynamicIframe;
