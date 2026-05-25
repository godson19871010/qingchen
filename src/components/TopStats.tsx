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
      className="relative flex items-center justify-center gap-5 overflow-hidden rounded-2xl border-t border-t-cyan-100/50 border-r border-r-cyan-200/20 border-b border-b-black/40 border-l border-l-cyan-300/10 bg-gradient-to-br from-[#0e273a]/40 via-[#081825]/40 to-[#040e14]/40 py-4 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-md"
    >
      {/* Extremely subtle ambient top-left glow */}
      <div className="pointer-events-none absolute top-[-20%] left-[-20%] w-[50%] h-[50%] z-10 mix-blend-overlay"
           style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
           
      {/* Edge reflections */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent z-10" />
      
      {/* Slight inner rim */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)]" />

      <div className="relative z-20 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-teal-300/30 bg-teal-900/30 text-teal-200 shadow-[inset_0_0_15px_rgba(56,189,248,0.2)]">
        {icon}
      </div>
      <div className="flex flex-col z-20 w-24">
        <div className="text-[13px] font-medium text-teal-50/90 mb-0.5">{title}</div>
        <div className="text-[32px] font-bold leading-none text-white font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
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
