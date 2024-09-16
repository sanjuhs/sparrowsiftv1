"use client";
// // all next js imports
// import Image from "next/image";
// import Link from "next/link";

// // all clerk imports
// // import { SignIn } from "@clerk/nextjs";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import React, { useState, useEffect, useRef, useCallback, memo } from "react";
// import ReactDOM from "react-dom";

// // for radix ui Icons
// import { MixIcon } from "@radix-ui/react-icons";

// // Babel standalone
// import * as Babel from "@babel/standalone";
// import { transform } from "@babel/standalone";

// //Monaco editor imports
// import MonacoEditor from "@monaco-editor/react";

// // all shadcn UI imports
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// export default function BsaTest() {
//   let reactcodeString = `
//     export function deep(){
//     return <p>deep</p>
//     }
//     `;
//     const [DynamicComponent, setDynamicComponent] = useState(null);

//   var input = 'const getMessage = () => "Hello Sanajy World";';
//   var output = Babel.transform(input, { presets: ["react"] }).code;
//   new Function("React", "ReactDOM", output)(React, ReactDOM);

//   return (
//     <div>
//       <p>hellow worlddd</p>
//       <p>Yellow world </p>
//       {Function()}
//     </div>
//   );
// }

// export default function BsaTest() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const input = 'const getMessage = () => "Hello Sanjay World";';
//     try {
//       const output = transform(input, { presets: ["react"] }).code;
//       console.log(output);
//       const getMessage = new Function(`return (${output})`)()();
//       console.log(getMessage);
//       setMessage(getMessage);
//     } catch (error) {
//       console.error("Error transforming code:", error);
//       setMessage("Error occurred while transforming code");
//     }
//   }, []);

//   return (
//     <div>
//       <p>Hello world</p>
//       <p>Yellow world</p>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default function BsaTest() {
//   // Store the dynamically generated component in state
//   //   const [DynamicComponent, setDynamicComponent] = useState(null);
//   const [DynamicComponent, setDynamicComponent] = useState<React.FC | null>(
//     null
//   );

//   useEffect(() => {
//     let reactCodeString = `
//         export function Deep() {
//           return <p>deep</p>;
//         }
//       `;

//     try {
//       // Transpile the string code using Babel
//       const compiledCode = Babel.transform(reactCodeString, {
//         presets: ["react"],
//       }).code;

//       // Create and execute the new function, extracting the Deep component
//       const exports = {};
//       new Function("exports", "React", compiledCode)(exports, React);

//       // Set the dynamically created component to state
//       setDynamicComponent(() => exports.Deep);
//     } catch (error) {
//       console.error("Error compiling React component:", error);
//     }
//   }, []);

//   return (
//     <div>
//       <p>hellow worlddd</p>
//       <p>Yellow world </p>
//       {DynamicComponent && <DynamicComponent />}
//       {/* <DynamicComponent /> */}
//     </div>
//   );
// }

// ---------------working---------------------

// // working do not delete this
// export default function BsaTest() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const input = `
//     const getMessage = () => {
//       console.log("ayoma");
//       return <div>"Hello Sanjay World"</div>;
//       }
//       getMessage();`;
//     try {
//       //   const output = transform(input, { presets: ["react"] }).code;
//       const output = transform(input, { presets: ["react"] })?.code || ""; // Ensure output is not null or undefined

//       // Remove 'use strict'; if present
//       const cleanOutput = output.replace('"use strict";\n\n', "");
//       // Wrap the code in an IIFE (Immediately Invoked Function Expression)
//       const executableCode = `(function() { ${cleanOutput} })()`;
//       const result = eval(executableCode);
//       setMessage(result);
//     } catch (error) {
//       console.error("Error transforming or executing code:", error);
//       setMessage("Error occurred while transforming or executing code");
//     }
//   }, []);

//   return (
//     <div>
//       <p>Hello world</p>
//       <p>Yellow world</p>
//       <p>{message}</p>
//     </div>
//   );
// }

// ---------------working---------------------
// "use client";

// import React, { useState, useEffect } from "react";
// import { transform } from "@babel/standalone";

// export default function BsaTest() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const input = `
//     const getMessage = () => {
//     //const [apple ,setApple] =React.useState("app");
//     let appleval = "the value of an apple";
//       console.log("ayoma");
//       return <div className="bg-red-500" >"Hello Sanjay World"
//       <p>{appleval}</p>
//       </div>;
//     }
//     getMessage;`;
//     try {
//       const output = transform(input, { presets: ["react"] })?.code || "";
//       const cleanOutput = output.replace('"use strict";\n\n', "");

//       // Create a function that returns the getMessage function
//       const getMessageFunction = new Function(
//         "React",
//         `
//         ${cleanOutput}
//         return getMessage;
//       `
//       );

//       // Execute the function with React as an argument
//       const getMessage = getMessageFunction(React);

//       // Call getMessage and set the result
//       setMessage(getMessage());
//     } catch (error) {
//       console.error("Error transforming or executing code:", error);
//       setMessage("Error occurred while transforming or executing code");
//     }
//   }, []);

//   return (
//     <div>
//       <p>Hello world</p>
//       <p>Yellow world</p>
//       {message}
//     </div>
//   );
// }

// ("use client");

// -------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { transform } from "@babel/standalone";
// import { Button } from "@/components/ui/button";

// export default function BsaTest() {
//   //   const [DynamicComponent, setDynamicComponent] = useState(() => () => null);
//   //   const [DynamicComponent, setDynamicComponent] = useState<React.FC>(
//   //     () => () => null
//   //   );
//   const [DynamicComponent, setDynamicComponent] = useState<
//     React.FC<{ Button: React.ComponentType<any> }>
//   >(() => () => null);

//   useEffect(() => {
//     const input = `

//     function DynamicMessage({ Button }) {
//       const [apple, setApple] = React.useState("app");
//       let appleval = "the value of an apple";
//       console.log("ayoma");
//       return (
//         <div className="bg-red-200 max-w-3xl rounded-md p-4 m-2">
//           "Hello Sanjay World"
//           <p>{appleval}</p>
//           <p>Apple state: {apple}</p>
//           <Button onClick={() => setApple(prev => prev + '2')} className="m-2"> Good good</Button>
//           <button onClick={() => setApple(prev => prev + '1')} className="m-2">Update Apple Here !</button>
//         </div>
//       );
//     }`;

//     try {
//       const output = transform(input, { presets: ["react"] })?.code || "";
//       const cleanOutput = output.replace('"use strict";\n\n', "");

//       // Create a function that returns the DynamicMessage component
//       const getDynamicComponent = new Function(
//         "React",
//         `
//         ${cleanOutput}
//         return DynamicMessage;
//       `
//       );

//       // Execute the function with React as an argument to get the component
//       const DynamicMessage = getDynamicComponent(React);

//       // Set the dynamic component
//       setDynamicComponent(() => DynamicMessage);
//     } catch (error) {
//       console.error("Error transforming or executing code:", error);
//       //   setDynamicComponent(() => () => (
//       //     <div>Error occurred while transforming or executing code</div>
//       //   ));
//       setDynamicComponent(() => {
//         const ErrorComponent: React.FC<{
//           Button: React.ComponentType<any>;
//         }> = () => (
//           // const ErrorComponent = () => (
//           <div>Error occurred while transforming or executing code</div>
//         );
//         ErrorComponent.displayName = "ErrorComponent"; // Set display name
//         return ErrorComponent;
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <p>Hello world</p>
//       <p>Yellow world</p>
//       <DynamicComponent Button={Button} />

//       {/* <DynamicComponent /> */}
//     </div>
//   );
// }

// ------------- all working above -----------
// --------------------------------------------

import React, { useState, useEffect } from "react";
import { transform } from "@babel/standalone";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ------
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// import { type ChartConfig } from "@/components/ui/chart"
// import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  LabelList,
  YAxis,
  YAxisProps,
} from "recharts";
import {
  Area,
  AreaChart,
  Label,
  Pie,
  PieChart,
  Sector,
  ScatterChart,
} from "recharts";
import { Line, LineChart } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { RadialBar, RadialBarChart } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Monitor,
  TrendingUp,
  TrendingDown,
  Footprints,
  Waves,
  Check,
  ChevronsUpDown,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// cn import from utils here
import { cn } from "@/lib/utils";

// import * as UIComponents from "@/components/ui";
import * as LucideIcons from "lucide-react";
import * as RadixIcons from "@radix-ui/react-icons";

// Create an object with all the UI components
const UIComponents = {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
};

const AllComponents = {
  ...UIComponents,
  Image,
  useForm,
  zodResolver,
  z,
  Autoplay,
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  // SortingState,
  // ColumnFiltersState,
  getFilteredRowModel,
  // VisibilityState,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  LabelList,
  YAxis,
  Area,
  AreaChart,
  Label,
  Pie,
  PieChart,
  Sector,
  ScatterChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  cn,
};

type UIComponentsType = typeof UIComponents;

export default function BsaTest() {
  const [DynamicComponent, setDynamicComponent] = useState<
    React.FC<{ UI: UIComponentsType }>
  >(() => () => null);

  useEffect(() => {
    const input = `
    function DynamicMessage({ UI }) {
      const { Button, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } = UI;
      const [apple, setApple] = React.useState("app");
      let appleval = "the value of an apple"; 
      console.log("ayoma");
      return (
        <div className="bg-red-200 p-4">
          <h2>"Hello Sanjay World"</h2>
          <p>{appleval}</p>
          <p>Apple state: {apple}</p>
          <Button onClick={() => setApple(prev => prev + '1')}>Update Apple</Button>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <Input placeholder="Enter some text" />
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      ); 
    }`;

    try {
      const output = transform(input, { presets: ["react"] })?.code || "";
      const cleanOutput = output.replace('"use strict";\n\n', "");

      const getDynamicComponent = new Function(
        "React",
        `
        ${cleanOutput}
        return DynamicMessage;
      `
      );

      const DynamicMessage = getDynamicComponent(React);
      setDynamicComponent(() => DynamicMessage);
    } catch (error) {
      console.error("Error transforming or executing code:", error);
      setDynamicComponent(() => {
        const ErrorComponent: React.FC<{ UI: UIComponentsType }> = () => (
          <div>Error occurred while transforming or executing code</div>
        );
        ErrorComponent.displayName = "ErrorComponent";
        return ErrorComponent;
      });
    }
  }, []);

  return (
    <div>
      <p>Hello world</p>
      <p>Yellow world</p>
      <DynamicComponent UI={UIComponents} />
    </div>
  );
}
