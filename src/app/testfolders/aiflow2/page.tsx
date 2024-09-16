"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const components: Record<string, React.FC<any>> = {
  // const components = {
  Div: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  // Div: ({ children, className }) => <div className={className}>{children}</div>,
  H1: ({ children, className }) => <h1 className={className}>{children}</h1>,
  P: ({ children, className }) => <p className={className}>{children}</p>,
  Button: ({ children, variant, size, ...props }) => (
    <Button variant={variant} size={size} {...props}>
      {children}
    </Button>
  ),
  Input: (props) => <Input {...props} />,
  Label: ({ children, ...props }) => <Label {...props}>{children}</Label>,
  Alert: ({ children, variant, ...props }) => (
    <Alert variant={variant} {...props}>
      {children}
    </Alert>
  ),
  AlertTitle: ({ children, ...props }) => (
    <AlertTitle {...props}>{children}</AlertTitle>
  ),
  AlertDescription: ({ children, ...props }) => (
    <AlertDescription {...props}>{children}</AlertDescription>
  ),
};

const LiveEditor = () => {
  const [code, setCode] = useState(`
// React Hooks Example
const [count, setCount] = useState(0);
const [message, setMessage] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setMessage(\`You've clicked \${count} times!\`);
  }, 1000);

  return () => clearTimeout(timer);
}, [count]);

const incrementCount = () => setCount(prev => prev + 1);

// JSX section
{
  type: 'Div',
  props: { className: 'space-y-4' },
  children: [
    {
      type: 'H1',
      props: { className: 'text-2xl font-bold' },
      children: 'Hooks Example'
    },
    {
      type: 'P',
      props: { className: 'text-lg' },
      children: \`Count: \${count}\`
    },
    {
      type: 'P',
      props: { className: 'text-md italic' },
      children: message
    },
    {
      type: 'Button',
      props: { 
        variant: 'default',
        onClick: incrementCount
      },
      children: 'Increment'
    }
  ]
}
  `);
  // const [output, setOutput] = useState(null);
  const [output, setOutput] = useState<React.ReactNode>(null); // Change type to React.ReactNode

  const renderComponent = (config: any) => {
    // const renderComponent = (config: { type: string; props?: any; children?: any }) => { // Specify type for config

    if (typeof config === "string") return config;
    if (typeof config === "function") return config();

    // const Component = components[config.type];
    const Component = components[config.type as keyof typeof components]; // Cast config.type to keyof components
    if (!Component) throw new Error(`Unknown component type: ${config.type}`);

    const children = Array.isArray(config.children)
      ? config.children.map(renderComponent)
      : renderComponent(config.children);

    return (
      <Component key={Math.random()} {...config.props}>
        {children}
      </Component>
    );
  };

  const updateOutput = useCallback(() => {
    try {
      const [jsSection, jsxSection] = code.split("// JSX section");

      // Create a new function that will serve as our component
      const ComponentFunction = new Function(
        "React",
        "useState",
        "useEffect",
        "components",
        "renderComponent",
        `
        return function CustomComponent() {
          ${jsSection}
          const structure = ${jsxSection.trim()};
          return renderComponent(structure);
        }
      `
      );

      // Execute the function to get our component
      const CustomComponent = ComponentFunction(
        React,
        useState,
        useEffect,
        components,
        renderComponent
      );

      // Render the component
      setOutput(<CustomComponent />);
    } catch (error) {
      if (error instanceof Error) {
        // Check if error is an instance of Error
        setOutput(<div className="text-red-500">Error: {error.message}</div>);
      } else {
        setOutput(
          <div className="text-red-500">Error: An unknown error occurred</div>
        );
      }
    }
  }, [code]); // eslint disable

  useEffect(() => {
    updateOutput();
  }, [updateOutput]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-2">Component Code</h2>
        <textarea
          className="w-full h-[400px] p-2 font-mono text-sm border rounded"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Card>
      <Card className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
        <div className="border p-4 rounded min-h-[400px]">{output}</div>
      </Card>
    </div>
  );
};

export default LiveEditor;
