import React from 'react';
import { UserCheck, Target, Building2, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ title, value, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + delay * 0.1, ease: "easeOut" }}
      className="relative flex items-center justify-center gap-5 overflow-hidden rounded-2xl border-t border-t-blue-300/40 border-r border-r-blue-400/20 border-b border-b-black/40 border-l border-l-blue-400/20 bg-gradient-to-br from-blue-900/60 via-blue-950/50 to-[rgba(10,20,40,0.6)] py-4 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      <style>{`
        @keyframes containerLiquidWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatUpTop {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
      `}</style>
      
      {/* Liquid background fill */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute bottom-0 left-0 w-full h-[60%] opacity-20 mix-blend-screen overflow-hidden rounded-b-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500/40 to-transparent"></div>
             <svg className="absolute w-[200%] h-[20px] -top-[5px] left-0 drop-shadow-[0_-2px_6px_rgba(59,130,246,0.5)]" style={{ animation: 'containerLiquidWave 8s linear infinite' }} viewBox="0 0 800 20" preserveAspectRatio="none">
                <path d="M0,10 C100,0 300,20 400,10 C500,0 700,20 800,10 L800,20 L0,20 Z" fill="rgba(59,130,246,0.3)"/>
             </svg>
             <svg className="absolute w-[200%] h-[20px] -top-[2px] left-0" style={{ animation: 'containerLiquidWave 12s linear infinite reverse' }} viewBox="0 0 800 20" preserveAspectRatio="none">
                <path d="M0,10 C100,20 300,0 400,10 C500,20 700,0 800,10 L800,20 L0,20 Z" fill="rgba(59,130,246,0.5)"/>
             </svg>
             {/* Bubbles */}
             <div className="absolute bottom-1 left-[20%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatUpTop 3s infinite ease-in' }} />
             <div className="absolute bottom-2 left-[60%] w-0.5 h-0.5 bg-white rounded-full" style={{ animation: 'floatUpTop 2.5s infinite ease-in 1s' }} />
         </div>
      </div>

      {/* Realistic External Light Source Cast */}
      <div className="pointer-events-none absolute inset-0 z-10"
           style={{ background: 'radial-gradient(circle at -5% -5%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 30%, transparent 60%)' }} />
           
      {/* Soft Light Rays Passing Over Glass */}
      <div className="pointer-events-none absolute inset-0 z-20 mix-blend-screen opacity-60"
           style={{ 
             background: 'conic-gradient(from 90deg at -10% -10%, transparent 0deg, rgba(255,255,255,0.1) 15deg, rgba(255,255,255,0.2) 30deg, transparent 45deg, rgba(255,255,255,0.1) 60deg, transparent 80deg)',
             WebkitMaskImage: 'radial-gradient(circle at -10% -10%, black 10%, transparent 65%)',
             maskImage: 'radial-gradient(circle at -10% -10%, black 10%, transparent 65%)'
           }} 
      />

      {/* Highlighted Edges Hit By Light */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-slate-200/50 via-slate-300/10 to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 left-0 bottom-[30%] w-[1px] bg-gradient-to-b from-slate-200/50 via-slate-300/10 to-transparent z-10" />
      
      {/* Inner Bevel for Metallic Depth */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.02),inset_-1px_-1px_3px_rgba(0,0,0,0.5)]" />

      <div className="relative z-20 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-600/20 to-blue-900/40 text-blue-300 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)]">
        {icon}
      </div>
      <div className="flex flex-col z-20 w-24">
        <div className="text-[13px] font-medium text-blue-200/80 mb-0.5">{title}</div>
        <div className="text-[32px] font-bold leading-none bg-gradient-to-r from-blue-300 to-sky-200 bg-clip-text text-transparent font-mono drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

export function TopStats() {
  const stats = [
    { title: '重点人员', value: '5,501', icon: <UserCheck size={28} /> },
    { title: '重点目标', value: '299', icon: <Target size={28} /> },
    { title: '重点单位', value: '153', icon: <Building2 size={28} /> },
    { title: '重点场所', value: '874', icon: <MapPin size={28} /> },
  ];

  return (
    <div className="absolute top-[95px] left-[50%] flex translate-x-[-50%] gap-4 z-10 w-full max-w-[900px] justify-center">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex-1">
          <StatCard {...stat} delay={idx * 100} />
        </div>
      ))}
    </div>
  );
}
