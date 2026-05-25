import React from 'react';
import { Download, Maximize } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex h-[100px] items-start pt-4 justify-between px-10 pointer-events-none">
      
      {/* Background Deep Header Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010b12] via-[#011422]/95 to-transparent -z-10 h-[150px] pointer-events-none"></div>

      {/* Background Smooth Glowing Line */}
      <div className="absolute inset-x-0 top-0 h-[100px] pointer-events-none -z-10 opacity-90">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
             <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="8%" stopColor="transparent" />
                <stop offset="22%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="78%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="92%" stopColor="transparent" />
             </linearGradient>
             <linearGradient id="fillFade" x1="0" y1="85" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" />
             </linearGradient>
             <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
             </radialGradient>
          </defs>
          
          {/* Fading trapezoid background */}
          <path d="M150,0 L420,85 L1500,85 L1770,0 Z" fill="url(#fillFade)" />

          {/* Central underglow pool */}
          <ellipse cx="960" cy="85" rx="600" ry="25" fill="url(#centerGlow)" opacity="0.8" filter="blur(10px)" />

          {/* Trapezoid header line */}
          <path d="M150,0 L420,85 L1500,85 L1770,0" stroke="url(#rimGlow)" strokeWidth="2.5" fill="none" />
          <path d="M150,0 L420,85 L1500,85 L1770,0" stroke="url(#rimGlow)" strokeWidth="10" filter="blur(6px)" opacity="0.7" fill="none" />
        </svg>
      </div>
      {/* Left decoration */}
      <div className="flex w-[300px] items-center gap-2 opacity-80 pt-2 pointer-events-auto">
        <div className="h-1.5 w-12 -skew-x-[30deg] bg-gradient-to-r from-transparent to-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        <div className="h-1.5 w-6 -skew-x-[30deg] bg-cyan-400"></div>
        <div className="h-1.5 w-3 -skew-x-[30deg] bg-cyan-400/60"></div>
      </div>
      
      {/* Title */}
      <div className="relative flex flex-col items-center justify-center pt-2 pointer-events-auto">
        <h1 className="relative z-10 flex items-center justify-center gap-6 text-slate-200 drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)] pb-1">
          <span className="text-[28px] font-bold tracking-[0.25em]">数 智 云</span>
          <span className="text-[36px] font-bold tracking-[0.2em] px-4 text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-white to-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">清 尘</span>
          <span className="text-[28px] font-bold tracking-[0.25em]">防 控 平 台</span>
        </h1>
      </div>
      
      {/* Right controls */}
      <div className="flex w-[300px] items-center justify-end gap-3 text-cyan-300 pt-2 pointer-events-auto">
        <button className="flex items-center gap-2 rounded border border-slate-500/40 bg-slate-800/80 px-4 py-1.5 text-[13px] font-medium transition-all hover:bg-slate-700 hover:border-cyan-400/50 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
          <Download size={16} />
          <span>控件下载</span>
        </button>
        <button className="rounded border border-slate-500/40 bg-slate-800/80 p-1.5 transition-all hover:bg-slate-700 hover:border-cyan-400/50 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
          <Maximize size={18} />
        </button>
      </div>
    </header>
  );
}
