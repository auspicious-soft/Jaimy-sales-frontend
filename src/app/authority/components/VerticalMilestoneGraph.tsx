"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { HomeApplicantsIncreaseIcon } from "@/utils/svgicons";

/* -------------------- Types -------------------- */

export type MilestonePoint = {
  label: string; // e.g. "Nov", "Dec", "Jan"
  value: number; // controls line height
  active?: boolean; // highlighted
};

interface VerticalMilestoneGraphProps {
  title: string;
  percentageText: string;
  data: MilestonePoint[];
}

/* -------------------- Component -------------------- */

export default function VerticalMilestoneGraph({
  title,
  percentageText,
  data,
}: VerticalMilestoneGraphProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <div className="w-full rounded-xl bg-[#312B2C]  text-white">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4 px-6 pt-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
          <HomeApplicantsIncreaseIcon />
        </div>
        <div className="text-sm text-gray-300">
          <span className="font-medium text-white">{percentageText}%</span> {title}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative flex h-44 items-end justify-between px-14">
        {/* Background grid */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-gray-700" />
          ))}
        </div>

        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="relative z-10 flex h-full flex-col items-center justify-end"
            >
              {/* Label pill (above line) */}
              <div
                className={`mb-0 rounded-full px-4 py-1 text-xs font-medium ${
                  item.active
                    ? "bg-pink-500 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                {item.label}
              </div>

              {/* Vertical line */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-[5px]  transition-all duration-300 ${
                  item.active ? "bg-pink-500" : "bg-gray-600"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Usage Example -------------------- */

// const data = [
//   { label: "Nov", value: 40 },
//   { label: "Dec", value: 55 },
//   { label: "Jan", value: 80, active: true },
// ];

// <VerticalMilestoneGraph
//   title="Applicants increase in last 6 months"
//   percentageText="35%"
//   data={data}
// />
