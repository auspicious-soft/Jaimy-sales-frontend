// "use client";

// import React from "react";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// /* -------------------- Types -------------------- */

// export type GraphDataPoint = {
//   label: string;
//   value: number;
// };

// interface GenericAreaGraphProps {
//   data: GraphDataPoint[];
//   height?: number;
//   strokeColor?: string;
//   gradientFrom?: string;
//   gradientTo?: string;
//   yAxisWidth?: number;
// }

// /* -------------------- Component -------------------- */

// export default function GenericAreaGraph({
//   data,
//   height = 220,
//   strokeColor = "#6EE7B7", // emerald-300
//   gradientFrom = "rgba(110,231,183,0.35)",
//   gradientTo = "rgba(110,231,183,0)",
//   yAxisWidth = 40,
// }: GenericAreaGraphProps) {
//   const gradientId = React.useId();

//   return (
//     <div className="w-full rounded-xl bg-[#312B2C] p-5">
//       <div style={{ height }} className="w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor={gradientFrom} />
//                 <stop offset="100%" stopColor={gradientTo} />
//               </linearGradient>
//             </defs>

//             <XAxis
//               dataKey="label"
//               tick={{ fill: "#9CA3AF", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />

//             <YAxis
//               width={yAxisWidth}
//               tick={{ fill: "#9CA3AF", fontSize: 12 }}
//               axisLine={false}
//               tickLine={false}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#111827",
//                 border: "1px solid #1F2937",
//                 borderRadius: "8px",
//                 color: "#E5E7EB",
//                 fontSize: "12px",
//               }}
//               labelStyle={{ color: "#9CA3AF" }}
//             />

//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke={strokeColor}
//               strokeWidth={2}
//               fill={`url(#${gradientId})`}
//               dot={false}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// /* -------------------- Usage Example -------------------- */

// // const weeklyData = [
// //   { label: "Mon", value: 220 },
// //   { label: "Tue", value: 180 },
// //   { label: "Wed", value: 240 },
// //   { label: "Thu", value: 210 },
// //   { label: "Fri", value: 200 },
// //   { label: "Sat", value: 280 },
// //   { label: "Sun", value: 260 },
// // ];

// // <GenericAreaGraph data={weeklyData} />

"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  } from "recharts";

/* -------------------- Types -------------------- */

export type GraphDataPoint = {
  label: string;
  value: number;
  
};

interface GenericAreaGraphProps {
  data: GraphDataPoint[];
  height?: number;
  strokeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  yAxisWidth?: number;
  title: string;
}

/* -------------------- Component -------------------- */

export default function GenericAreaGraph({
  data,
  height = 220,
  strokeColor = "#6EE7B7", // emerald-300
  gradientFrom = "rgba(110,231,183,0.35)",
  gradientTo = "rgba(110,231,183,0)",
  yAxisWidth = 40,
  title
}: GenericAreaGraphProps) {
  const gradientId = React.useId();

  return (
    <div className="w-full">
      <h1 className="text-[#EF476F] text-2xl font-extrabold mb-5">{title}</h1>
    
    <div className="w-full rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-700 bg-[#312B2C] p-5">

      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="label"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#4B5563" }}
              tickLine={false}
            />

            <YAxis
              width={yAxisWidth}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#4B5563" }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                color: "#E5E7EB",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#9CA3AF" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}

