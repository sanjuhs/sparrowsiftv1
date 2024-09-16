// "use client";

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "Jan", desktop: 50, mobile: 30, value: 34 },
//   { month: "Feb", desktop: 75, mobile: 45, value: 50 },
//   { month: "Mar", desktop: 100, mobile: 60, value: 30 },
//   { month: "Apr", desktop: 60, mobile: 40, value: 20 },
//   { month: "May", desktop: 80, mobile: 55, value: 24 },
//   { month: "Jun", desktop: 120, mobile: 70, value: 90 },
// ];

// const SomeChart: React.FC = () => {
//   return (
//     <Card className="m-4 p-4 rounded-lg bg-white shadow-md">
//       <CardHeader>
//         <CardTitle className="text-lg font-bold text-gray-800">
//           Sales Trends
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="desktop" fill="#2563eb" />
//             <Bar dataKey="mobile" fill="#60a5fa" />
//             <Bar dataKey="value" fill="#60a5fa" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default SomeChart;

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsToolTip,
} from "recharts";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

const data = [
  { month: "Jan", desktop: 50, mobile: 30, value: 34, x: 10, y: 30 },
  { month: "Feb", desktop: 75, mobile: 45, value: 50, x: 20, y: 50 },
  { month: "Mar", desktop: 100, mobile: 60, value: 30, x: 30, y: 40 },
  { month: "Apr", desktop: 60, mobile: 40, value: 20, x: 40, y: 30 },
  { month: "May", desktop: 80, mobile: 55, value: 24, x: 50, y: 50 },
  { month: "Jun", desktop: 120, mobile: 70, value: 90, x: 60, y: 60 },
];

const MultiChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
      <Card className="p-4 rounded-lg bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Sales Trends (Bar Chart)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsToolTip />
              <Legend />
              <Bar dataKey="desktop" fill="#2563eb" />
              <Bar dataKey="mobile" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="p-4 rounded-lg bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Data Distribution (Scatter Chart)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <XAxis dataKey="x" name="X Value" />
              <YAxis dataKey="y" name="Y Value" />
              <RechartsToolTip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Data Points" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="p-4 rounded-lg bg-white shadow-md md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Value Trends (Line Chart)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiChart;
