import React from 'react';
import { Download, Maximize } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 flex h-[100px] items-start pt-4 justify-between px-10 pointer-events-none"
    >
      
      {/* Background Deep Header Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010b12] via-[#011422]/95 to-transparent -z-10 h-[150px] pointer-events-none"></div>

      {/* Background Smooth Glowing Line */}
      <div className="absolute inset-x-0 top-0 h-[100px] pointer-events-none -z-10 opacity-90">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
             <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="8%" stopColor="transparent" />
                <stop offset="22%" stopColor="#1e3a8a" stopOpacity="0.6" />
                <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="78%" stopColor="#1e3a8a" stopOpacity="0.6" />
                <stop offset="92%" stopColor="transparent" />
             </linearGradient>
             <linearGradient id="fillFade" x1="0" y1="85" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="40%" stopColor="#1e40af" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" />
             </linearGradient>
             <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" />
             </radialGradient>
          </defs>
          
          {/* Fading trapezoid background */}
          <path d="M150,0 L420,85 L1500,85 L1770,0 Z" fill="url(#fillFade)" />

          {/* Central underglow pool */}
          <motion.ellipse 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            cx="960" cy="85" rx="600" ry="25" fill="url(#centerGlow)" filter="blur(10px)" 
          />

          {/* Trapezoid header line */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M150,0 L420,85 L1500,85 L1770,0" stroke="url(#rimGlow)" strokeWidth="2.5" fill="none" 
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M150,0 L420,85 L1500,85 L1770,0" stroke="url(#rimGlow)" strokeWidth="10" filter="blur(6px)" fill="none" 
          />
        </svg>
      </div>
      {/* Left decoration */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 0.8 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex w-[300px] items-center gap-2 pt-2 pointer-events-auto"
      >
        <div className="h-1.5 w-12 -skew-x-[30deg] bg-gradient-to-r from-transparent to-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
        <div className="h-1.5 w-6 -skew-x-[30deg] bg-blue-400"></div>
        <div className="h-1.5 w-3 -skew-x-[30deg] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
      </motion.div>
      
      {/* Title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative flex flex-col items-center justify-center pt-2 pointer-events-auto"
      >
        <h1 className="relative z-10 flex items-center justify-center gap-6 pb-1">
          <span className="text-[28px] font-bold tracking-[0.25em] text-slate-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">数 智 云</span>
          <span className="text-[38px] font-bold tracking-[0.2em] px-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">清 尘</span>
          <span className="text-[28px] font-bold tracking-[0.25em] text-slate-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">防 控 平 台</span>
        </h1>
      </motion.div>
      
      {/* Right controls */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex w-[300px] items-center justify-end gap-3 text-blue-300 pt-2 pointer-events-auto"
      >
        <button className="flex items-center gap-2 rounded border border-slate-500/40 bg-slate-800/80 px-4 py-1.5 text-[13px] font-medium transition-all hover:bg-slate-700 hover:border-blue-400/50 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
          <Download size={16} />
          <span>控件下载</span>
        </button>
        <button className="rounded border border-slate-500/40 bg-slate-800/80 p-1.5 transition-all hover:bg-slate-700 hover:border-blue-400/50 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
          <Maximize size={18} />
        </button>
      </motion.div>
    </motion.header>
  );
}
