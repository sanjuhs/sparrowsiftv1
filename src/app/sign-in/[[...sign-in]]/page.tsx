import React from "react";
import { SignIn } from "@clerk/nextjs";

const AlternatingCheckerboardPattern = () => (
  <div className="absolute inset-0 z-0">
    <div
      className="w-[200%] h-[200%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 25%, #FEFAEF 25%, #FEFAEF 75%, transparent 75%, transparent),
          linear-gradient(45deg, transparent 25%, #FEFAEF 25%, #FEFAEF 75%, transparent 75%, transparent)
        `,
        backgroundSize: "100px 100px",
        backgroundPosition: "0 0, 50px 50px",
      }}
    >
      <div
        className="absolute inset-0 bg-repeat "
        style={{
          backgroundImage: `url('/ssui.svg')`,
          backgroundSize: "400px 400px",
          backgroundPosition: "25px 25px, 75px 75px",
          maskImage: `
            linear-gradient(45deg, #FEFAEF 25%, transparent 25%, transparent 75%, #FEFAEF 75%, #000),
          `,
          maskSize: "100px 100px",
          maskPosition: "0 0, 50px 50px",
        }}
      />
    </div>
  </div>
);

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#FEFAEF] text-[#CE4F3D] overflow-hidden">
      <AlternatingCheckerboardPattern />
      <div className="z-10">
        <SignIn />
      </div>
    </div>
  );
}
