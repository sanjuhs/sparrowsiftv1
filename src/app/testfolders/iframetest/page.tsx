"use client";
// import React, { useState } from "react";
// import DynamicIframe from "./DynamicIframe";

// const MyComponent = () => (
//   <div>
//     <h1>Hello, Dynamic Iframe with Next.js Component!</h1>
//   </div>
// );

// export default function Home() {

//   const [componentCode, setComponentCode] = useState(`
//     const MyComponent = () => React.createElement('div', null, React.createElement('h1', null, 'Hello, Dynamic Iframe with Next.js Component!'));
//     const root = createRoot(document.getElementById('root'));
//     root.render(React.createElement(MyComponent));
//   `);

//   return (
//     <div>
//       <h1>Dynamic Iframe Example</h1>
//       <textarea
//         value={componentCode}
//         onChange={(e) => setComponentCode(e.target.value)}
//         rows="10"
//         cols="50"
//       />
//       <DynamicIframe componentCode={componentCode} />
//     </div>
//   );
// }

// -------------------

// pages/index.js
// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";

// const DynamicIframe = dynamic(() => import("./DynamicIframe"), {
//   ssr: false,
// });

// export default function Home() {
//   // import { Button } from "@/components/ui/button"

//   const [componentCode, setComponentCode] = useState(`

//     export default function MyComponent() {
//       return (
//         <div>
//           <h1>Hello, Dynamic Iframe with Shadcn UI!</h1>
//           <Button>Click me</Button>
//         </div>
//       );
//     }
//   `);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Dynamic Iframe Example with Shadcn UI
//       </h1>
//       <div className="flex">
//         <div className="w-1/2 pr-2">
//           <textarea
//             value={componentCode}
//             onChange={(e) => setComponentCode(e.target.value)}
//             className="w-full h-64 p-2 border rounded"
//           />
//         </div>
//         <div className="w-1/2 pl-2">
//           <DynamicIframe componentCode={componentCode} />
//         </div>
//       </div>
//     </div>
//   );
// }

// -------------------

// pages/index.tsx
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const DynamicIframe = dynamic(
  () => import("../../../components/custom/DynamicIframe"),
  { ssr: false }
);

export default function Home() {
  const [componentCode, setComponentCode] = useState(`
    import { Button } from "/components/ui/button"

    export default function MyComponent() {
      return (
        <div>
          <h1>Hello, Dynamic Iframe with Shadcn UI!</h1>
          <Button>Click me</Button>
        </div>
      );
    }
  `);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Dynamic Iframe Example with Shadcn UI
      </h1>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <textarea
            value={componentCode}
            onChange={(e) => setComponentCode(e.target.value)}
            className="w-full h-64 p-2 border rounded"
          />
        </div>
        <div className="w-1/2 pl-2">
          <DynamicIframe componentCode={componentCode} />
        </div>
      </div>
    </div>
  );
}

// -------------------

// import DynamicIframe from "@/components/custom/DynamicIframe";

// export default function Home() {
//   const [componentCode, setComponentCode] = useState(`
//     export default function MyComponent() {
//       return (
//         <div>
//           <h1>Hello, Dynamic Iframe with Shadcn UI!</h1>
//           <Button>Click me</Button>
//         </div>
//       );
//     }
//   `);

//   return (
//     <div>
//       <textarea
//         value={componentCode}
//         onChange={(e) => setComponentCode(e.target.value)}
//       />
//       <DynamicIframe componentCode={componentCode} />
//     </div>
//   );
// }
