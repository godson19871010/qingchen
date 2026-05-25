import React from 'react';
import { UserCheck, Target, Building2, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ title, value, icon, delay = 0 }: StatCardProps) {
  return (
    <div 
      className="relative flex items-center justify-center gap-5 overflow-hidden rounded-2xl border-t border-t-slate-300/40 border-r border-r-slate-400/20 border-b border-b-black/60 border-l border-l-slate-400/20 bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-[rgba(5,10,15,0.7)] py-4 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
    >
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

      <div className="relative z-20 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 text-cyan-300 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]">
        {icon}
      </div>
      <div className="flex flex-col z-20 w-24">
        <div className="text-[13px] font-medium text-slate-400 mb-0.5">{title}</div>
        <div className="text-[32px] font-bold leading-none bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent font-mono drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
          {value}
        </div>
      </div>
    </div>
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
