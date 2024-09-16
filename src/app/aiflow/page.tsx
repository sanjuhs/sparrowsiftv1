"use client";

// all next js imports
import Image from "next/image";
import Link from "next/link";

// debouncing
import debounce from "lodash.debounce";

// import axios
import axios from "axios";

// all clerk imports
// import { SignIn } from "@clerk/nextjs";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// all react imports
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ErrorInfo, ReactNode } from "react";

// for radix ui Icons
import { MixIcon, PersonIcon } from "@radix-ui/react-icons";

// Babel standalone
import * as Babel from "@babel/standalone";
import { transform } from "@babel/standalone";

//Monaco editor imports
import MonacoEditor from "@monaco-editor/react";

// all shadcn UI imports
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Textarea } from "@/components/ui/textarea";

// added interface
interface LivePreviewProps {
  code: string;
}

// ui components

import * as shadcn_Button from "@/components/ui/button";
import * as shadcn_Accordion from "@/components/ui/accordion";
import * as shadcn_Card from "@/components/ui/card";
import * as shadcn_Input from "@/components/ui/input";
import * as shadcn_Alert from "@/components/ui/alert";
import * as shadcn_AspectRatio from "@/components/ui/aspect-ratio";
import * as shadcn_Avatar from "@/components/ui/avatar";
import * as shadcn_Breadcrumb from "@/components/ui/breadcrumb";
import * as shadcn_Calender from "@/components/ui/calendar";
import * as embla_autplay from "embla-carousel-autoplay";
import * as shadcn_Chart from "@/components/ui/chart";
import * as recharts_comps from "recharts";
import { Tooltip as RechartsToolTip } from "recharts";
import * as shadcn_Checkbox from "@/components/ui/checkbox";
import * as shadcn_Collapsible from "@/components/ui/collapsible";
import * as shadcn_Command from "@/components/ui/command";
import * as shadcn_ContextMenu from "@/components/ui/context-menu";
import * as tanstackReactTable from "@tanstack/react-table";
import * as shadcn_Table from "@/components/ui/table";
import * as shadcn_Dialog from "@/components/ui/dialog";
import * as shadcn_Drawer from "@/components/ui/drawer";
import * as shadcn_DropdownMenu from "@/components/ui/dropdown-menu";
import * as reactHookForm from "react-hook-form";
import * as zod from "zod";
import * as zodResolver from "@hookform/resolvers/zod";
import * as shadcn_HoverCard from "@/components/ui/hover-card";
import * as shadcn_InputOtp from "@/components/ui/input-otp";
import * as shadcn_Label from "@/components/ui/label";
import * as shadcn_MenuBar from "@/components/ui/menubar";
import * as shadcn_Navigationmenu from "@/components/ui/navigation-menu";
import * as shadcn_Pagination from "@/components/ui/pagination";
import * as shadcn_Popover from "@/components/ui/popover";
import * as shadcn_Progress from "@/components/ui/progress";
import * as shadcn_RadioGroup from "@/components/ui/radio-group";
import * as shadcn_Resizeable from "@/components/ui/resizable";
import * as shadcn_ScrollArea from "@/components/ui/scroll-area";
import * as shadcn_Select from "@/components/ui/select";
import * as shadcn_Separator from "@/components/ui/separator";
import * as shadcn_Skeleton from "@/components/ui/skeleton";
import * as shadcn_Slider from "@/components/ui/slider";
import * as shadcn_Sonner from "@/components/ui/sonner";
import * as shadcn_Switch from "@/components/ui/switch";
import * as shadcn_Tabs from "@/components/ui/tabs";
import * as shadcn_Textarea from "@/components/ui/textarea";
import * as shadcn_UseToast from "@/components/ui/use-toast";
import * as shadcn_Toggle from "@/components/ui/toggle";
import * as shadcn_ToggleGroup from "@/components/ui/toggle-group";
import * as shadcn_Tooltip from "@/components/ui/tooltip";

// ui components
import * as LucideIcons from "lucide-react";
import * as RadixIcons from "@radix-ui/react-icons";

// Combine all icons
const AllIcons = {
  ...LucideIcons,
  ...RadixIcons,
};

// Create an object with all the UI components
const UIComponents = {
  ...shadcn_Button,
  ...shadcn_Accordion,
  ...shadcn_Card,
  ...shadcn_Input,
  ...shadcn_Alert,
  ...shadcn_AspectRatio,
  ...shadcn_Avatar,
  ...shadcn_Breadcrumb,
  ...shadcn_Calender,
  ...embla_autplay,
  ...shadcn_Chart,
  ...recharts_comps,
  ...shadcn_Checkbox,
  ...shadcn_Collapsible,
  ...shadcn_Command,
  ...shadcn_ContextMenu,
  ...tanstackReactTable,
  ...shadcn_Table,
  ...shadcn_Dialog,
  ...shadcn_Drawer,
  ...shadcn_DropdownMenu,
  ...reactHookForm,
  ...zod,
  ...zodResolver,
  ...shadcn_HoverCard,
  ...shadcn_InputOtp,
  ...shadcn_Label,
  ...shadcn_MenuBar,
  ...shadcn_Navigationmenu,
  ...shadcn_Pagination,
  ...shadcn_Popover,
  ...shadcn_Progress,
  ...shadcn_RadioGroup,
  ...shadcn_Resizeable,
  ...shadcn_ScrollArea,
  ...shadcn_Select,
  ...shadcn_Separator,
  ...shadcn_Skeleton,
  ...shadcn_Slider,
  ...shadcn_Sonner,
  ...shadcn_Switch,
  ...shadcn_Tabs,
  ...shadcn_Textarea,
  ...shadcn_UseToast,
  ...shadcn_Toggle,
  ...shadcn_ToggleGroup,
  ...shadcn_Tooltip,
  RechartsToolTip,
};
type UIComponentsType = typeof UIComponents;
type AllIconsType = typeof AllIcons;

// import the default values
import {
  TestReactComponent1,
  TestReactComponent02,
  TestReactComponent,
  TestReactInput,
  TestReactInput02,
  prefix,
  suffix,
  System_prompt_react_compo,
} from "./defaultDataState.js";

let local_api_url = "http://127.0.0.1:8000";
let prod_api_url = "https://creditapi.sanjayprasadhs.com";

let apiurl = prod_api_url;

// function to strip out the code
function extractCodeFromMarkdown(str: String) {
  // Remove the first line if it starts with "```" followed by any text
  const withoutFirstLine = str.replace(/^```\w*\n/, "");
  console.log("stage 1: ", withoutFirstLine);

  // Remove the last line if it's just "```"
  const withoutLastLine = withoutFirstLine.replace(/\n```$/, "");
  const withoutLastLine2 = withoutLastLine.replace(/\r?\n```\s*$/, "");
  console.log("stage 2: ", withoutLastLine2);

  // Trim any leading or trailing whitespace
  return withoutLastLine2.trim();
}

// input component
// const InputComponent = ({ setReactCode })  => {
const InputComponent: React.FC<{ setReactCode: (code: string) => void }> = ({
  setReactCode,
}) => {
  const [inputReq, setInputReq] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiurl}/geminiReactCompoChatFree`, {
        inputPrompt:
          inputReq +
          `
          make the results look beautiful with good padding, Rounded edges, Sharp colors/ contrasting and a nice combination of colors always !
          remember to always return the JSX directly without any quotes
          Also remember to not import or export any of the componenets as we are rendering it an environment that doesnt support import or export.
          `,
        systemPrompt: System_prompt_react_compo,
        // "You are a helpful AI assistant that generates React components.", // Adjust this as needed
      });
      let cleanedreply = extractCodeFromMarkdown(response.data.reply);
      console.log(cleanedreply);
      setReactCode(cleanedreply);
    } catch (error) {
      console.error("Error submitting request to AI:", error);
      // You might want to set an error state here and display it to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mb-2">
      <Textarea
        id="Card name"
        className="col-span-3"
        value={inputReq}
        onChange={(e) => setInputReq(e.target.value)}
        placeholder="Enter your request here..."
        rows={5}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Submitting..." : "**Submit Request to AI"}
      </Button>
      <p className="text-[10px] max-w-96">
        **There is a rate limit of 1 req per minute with my current plan, so
        please be patient/ reload app incase the req gets rejected/ waits too
        long{" "}
      </p>
    </div>
  );
};

// the live React component

const LivePreview: React.FC<LivePreviewProps> = memo(({ code }) => {
  const [DynamicComponent, setDynamicComponent] = useState<React.FC<{
    UI: typeof UIComponents;
    Icons: typeof AllIcons;
  }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const compileAndSetComponent = useCallback(
    debounce(async (code: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Starting compilation...");

        const output = transform(code, { presets: ["react"] })?.code;
        if (!output) throw new Error("Transformation failed");

        const cleanOutput = output.replace('"use strict";\n\n', "");
        const ComponentFunc = new Function(
          "React",
          `
        ${cleanOutput}
        return typeof DynamicMessage !== 'undefined' ? DynamicMessage : null;
      `
        );
        const DynamicMessage = ComponentFunc(React);

        setDynamicComponent(() => DynamicMessage);
      } catch (error) {
        console.error("Failed to compile component:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    compileAndSetComponent(code);

    return () => {
      compileAndSetComponent.cancel();
    };
  }, [code, compileAndSetComponent]);

  if (isLoading) {
    return <div>Still loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!DynamicComponent) {
    return <div>No component to render</div>;
  }

  const RenderComponent = () => {
    try {
      return <DynamicComponent UI={UIComponents} Icons={AllIcons} />;
    } catch (error) {
      console.error("Error rendering component:", error);
      return (
        <div className="text-red-500">
          Error rendering component:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      );
    }
  };

  return <RenderComponent />;
});

LivePreview.displayName = "LivePreview";

export default function Home() {
  const [reactCode, setReactCode] = useState(
    prefix + TestReactInput02 + suffix
  );
  let [inputReq, setInputReq] = useState("");

  const handleEditorDidMountold = (editor: any, monaco: any) => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
    });

    // Add type definitions for React
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
          declare module 'react' {
            export = React;
          }
          declare namespace React {
            function createElement(type: any, props?: any, ...children: any[]): any;
            function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
          }
          `,
      "file:///node_modules/@types/react/index.d.ts"
    );
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Set the language to TypeScript React
    monaco.editor.setModelLanguage(editor.getModel(), "typescript");

    // Configure the TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    // Add type definitions for React
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      declare module 'react' {
        export = React;
      }
      declare namespace React {
        function createElement(type: any, props?: any, ...children: any[]): any;
        function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
        interface FC<P = {}> {
          (props: P & { children?: React.ReactNode }): React.ReactElement | null;
        }
      }
      `,
      "file:///node_modules/@types/react/index.d.ts"
    );

    // You can add more type definitions here for other libraries or components you're using
  };

  // ---------------------------
  // for all error handling

  interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
  }

  class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Caught an error:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }

      return this.props.children;
    }
  }
  // ----------------- ended error handling ---------------

  return (
    <main className="bg-[#FEFAEF]">
      <div className="navbar1 bg-lime-100 p-1  hidden">
        {/* flex container */}
        <div className="mx-2 flex-1 flex items-center ">
          {/* Some_logo AI Flow */}
          <Image
            src="/ssui.png"
            alt="thesift Ui log with a sparrow sitting on blocks"
            width={16}
            height={16}
            className="rounded-lg mx-4 "
          />
          SSUI AI-flow-v1
        </div>
        <div className="text-xs">
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </div>

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
          <p className="text-[#CE4F3D] text-md font-bold">SSUI Ai flow Tool</p>
        </div>
      </nav>

      <div className="section1 flex">
        {/* put monaco editor here  */}

        <div className=" flex-2  p-2">
          <div className="p-2">
            <p> Put an Input request Here </p>
            <InputComponent setReactCode={setReactCode} />

            {/* <Input
              id="Card name"
              className="col-span-3"
              value={inputReq}
              onChange={(e) => setInputReq(e.target.value)}
            />
            <Button onClick={() => console.log("inputrequest pressed")}>
              Submit Request to AI{" "}
            </Button> */}
          </div>
          <div className="border-green-500 border-2 rounded-lg bg-green-100 ">
            <p className="ml-2"> Generated React Code Component </p>
            <MonacoEditor
              height="400px"
              width="450px"
              defaultLanguage="javascript"
              className="flex-1"
              // defaultValue={DefaultJsonString}
              value={reactCode}
              onChange={(value) => setReactCode(value || "")}
              // language="json"
              theme="vs-dark"
              options={{
                wordWrap: "on",
                minimap: { enabled: false },
                automaticLayout: true,
                formatOnType: true,
                formatOnPaste: true,
              }}
              onMount={handleEditorDidMount}
            />
          </div>
        </div>

        <div className="chat-part flex-1 p-4 ">
          <p className="mx-2">Live React Component Preview</p>
          <div className=" border rounded-md bg-white">
            <ErrorBoundary
              fallback={
                <div>
                  Something went wrong or you are changing the component
                </div>
              }
            >
              <LivePreview code={reactCode} />
            </ErrorBoundary>
          </div>
        </div>
      </div>

      {/* Seperator */}
      <hr className=" my-4 "></hr>

      <div className="testComponentsSection hidden">
        <p className="font-[800] ,text-xl">
          This is section to test all the Nextjs Components !{" "}
        </p>
        <div className="test-compos-1 flex">
          <div className="w-64 p-4 m-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. Its animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-64 m-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
          <div className="w-64 m-2">
            <Alert>
              {/* <Terminal className="h-4 w-4" /> */}
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components and dependencies to your app using the
                cli.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </main>
  );
}
