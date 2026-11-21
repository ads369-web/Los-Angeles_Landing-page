"use client";

import React, { useState } from "react";
import type { LocalizedContent } from "@/data/lpCopy";

interface JourneyStepsProps {
  steps: LocalizedContent["journey"]["steps"];
}

export default function JourneySteps({ steps }: JourneyStepsProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 list-none m-0 p-0">
      {steps.map((step, idx) => {
        const isActive = activeStepIndex === idx;
        return (
          <li
            key={step.stepNum}
            onClick={() => setActiveStepIndex(idx)}
            className={`rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer reveal-up stagger-${idx + 1} ${
              isActive
                ? "bg-white border-[#DE7356] shadow-retro-hover"
                : "bg-[#FAF6F0] border-[#E5E0D8] hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1816] text-[#FBF9F5] font-mono text-xs font-semibold">
                {step.stepNum}
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#9A5B25] bg-[#FBF5EB] px-2.5 py-1 rounded-full border border-[#E8DEC8]">
                {step.duration}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mb-2">
              {step.title}
            </h3>
            <p className="text-xs font-medium text-[#6C655E] mb-3">{step.shortDesc}</p>
            <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed mb-4">
              {step.fullDesc}
            </p>
            <p className="text-[11px] text-[#5B8266] bg-[#EBF2ED] border border-[#D4E4D8] rounded-xl px-3.5 py-2.5 leading-relaxed">
              {step.reassurance}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
