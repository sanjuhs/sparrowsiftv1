import Image from "next/image";
import Link from "next/link";
// import { SignIn } from "@clerk/nextjs";

// export default function Home() {
//   return (
//     <main className="p-4 bg-[#FDFAEE] min-h-screen">
//       <div className="navbar text-xl font-[600] mb-4">
//         Sparrow Sift Quick UI / React &gt; Nextjs &gt; Shadcn UI
//       </div>
//       <div className="flex">
//         <Image
//           src="/ssk.png"
//           alt="thesift Ui log with a sparrow sitting on blocks"
//           width={300}
//           height={300}
//           className="rounded-lg"
//         />
//         <div className="p-4">
//           <p className="w-64 mb-4">
//             This is a quick Opensource (MIT liscence) experiment to generate
//             React based fully formed mini apps using Generative AI{" "}
//           </p>
//           <Link href="./aiflow">
//             <div className="bg-green-500 w-32 p-4 rounded-md text-white font-[700]">
//               Sign In / to experiment
//             </div>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Code,
  Cpu,
  Cloud,
  Download,
  Layout,
  Type,
  Palette,
} from "lucide-react";

// Assume we have a SparrowIcon component
// import { SparrowIcon } from "@/components/SparrowIcon"

// const Feature = ({ icon, title, description }) => (
const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Card className="bg-white">
    <CardHeader>
      <CardTitle className="flex items-center text-[#CE4F3D]">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-black">{description}</p>
    </CardContent>
  </Card>
);

// const BentoBox = ({ icon, title, description }) => (
const BentoBox: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <Card className="bg-white h-full">
    <CardHeader>
      <CardTitle className="flex items-center text-[#CE4F3D]">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-black">{description}</p>
    </CardContent>
  </Card>
);

const LandingPage = () => (
  <div className="min-h-screen bg-[#FEFAEF]">
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* <SparrowIcon className="w-10 h-10 mr-2" /> */}
          <Image src="/ssui.svg" alt="UST Logo" width={40} height={40} />

          <h1 className="text-3xl font-bold text-[#CE4F3D]">Sparrow Sift UI</h1>
        </div>
        <nav>
          <a href="#about">
            <Button variant="ghost" className="text-black">
              About
            </Button>
          </a>
          <a href="#features">
            <Button variant="ghost" className="text-black">
              Features
            </Button>
          </a>
          <a href="#pricing">
            <Button variant="ghost" className="text-black">
              Pricing
            </Button>
          </a>
          <a href="./aiflow">
            <Button
              variant="outline"
              className="text-[#CE4F3D] border-[#CE4F3D]"
            >
              Sign In
            </Button>
          </a>
        </nav>
      </div>
    </header>

    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">
          <span className="block">Create Dynamic UIs</span>
          <span className="block text-[#CE4F3D]">with AI-Powered Tools</span>
        </h2>
        <p className="mt-3 max-w-md mx-auto text-base text-black sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Sparrow Sift UI empowers developers to rapidly prototype and build
          interactive UI elements and mini-apps using various AI models.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link href="./aiflow">
            {/* <Link href="./toolList"> */}
            <Button className="mr-4 bg-[#CE4F3D] text-white hover:bg-[#BE3F2D]">
              Get Started
            </Button>
          </Link>
          <Button variant="outline" className="text-[#CE4F3D] border-[#CE4F3D]">
            View Demo
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h3
          className="text-2xl font-semibold text-center mb-8 text-black"
          id="features"
        >
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            icon={<Code className="w-6 h-6 text-[#CE4F3D]" />}
            title="AI-Powered UI Generation"
            description="Leverage various AI models to create UI elements and mini-apps quickly."
          />
          <Feature
            icon={<Cpu className="w-6 h-6 text-[#CE4F3D]" />}
            title="Local LLM Support"
            description="Run on your local system with support for various local language models."
          />
          <Feature
            icon={<Cloud className="w-6 h-6 text-[#CE4F3D]" />}
            title="Cloud Integration"
            description="Seamlessly integrate with cloud-based AI services like Claude, Google, and OpenAI."
          />
          <Feature
            icon={<Download className="w-6 h-6 text-[#CE4F3D]" />}
            title="Open Source"
            description="Free to download and use, with an active community of contributors."
          />
        </div>
      </div>

      <div className="mt-16">
        <h3
          className="text-2xl font-semibold text-center mb-8 text-black"
          id="about"
        >
          Explore Sparrow Sift UI
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <BentoBox
            icon={<Layout className="w-6 h-6 text-[#CE4F3D]" />}
            title="Responsive Layouts"
            description="Create adaptive layouts that look great on any device."
          />
          <BentoBox
            icon={<Type className="w-6 h-6 text-[#CE4F3D]" />}
            title="Typography System"
            description="Consistent and beautiful typography across your entire project."
          />
          <BentoBox
            icon={<Palette className="w-6 h-6 text-[#CE4F3D]" />}
            title="Color Schemes"
            description="AI-generated color palettes that match your brand identity."
          />
          <div className="md:col-span-3">
            <BentoBox
              icon={<Code className="w-6 h-6 text-[#CE4F3D]" />}
              title="Component Playground"
              description="Experiment with our library of pre-built components and see them in action."
            />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3
          className="text-2xl font-semibold text-center mb-8 text-black"
          id="pricing"
        >
          Pricing
        </h3>
        <Tabs defaultValue="free" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="free">Free Version</TabsTrigger>
            <TabsTrigger value="premium">Premium Version</TabsTrigger>
          </TabsList>
          <TabsContent value="free">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#CE4F3D]">Free Version</CardTitle>
                <CardDescription className="text-black">
                  Perfect for local development and testing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black">
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Run locally on your system
                <br />
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Access to open-source LLMs
                <br />
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Community support
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#CE4F3D] text-white hover:bg-[#BE3F2D]">
                  Download Now
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="premium">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#CE4F3D]">
                  Premium Version
                </CardTitle>
                <CardDescription className="text-black">
                  Enhanced features and cloud resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-black">
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                All features of the free version
                <br />
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Access to cloud resources
                <br />
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Integration with premium AI services
                <br />
                <CheckCircle className="inline-block mr-2 text-[#CE4F3D]" />
                Priority support
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#CE4F3D] text-white hover:bg-[#BE3F2D]">
                  Subscribe for $5/month
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>

    <footer className="mt-20 py-8 px-4 sm:px-6 lg:px-8 text-center text-black">
      <p>&copy; 2024 Sparrow Sift UI. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;
