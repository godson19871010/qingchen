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
      {/* Pure White Radial Glow from Top-Left */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10" 
           style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)' }} />
      
      {/* Short Diagonal Light Beams shooting to the middle */}
      <div className="pointer-events-none absolute top-0 left-0 w-[100px] h-[1.5px] z-20 origin-top-left rotate-[25deg] bg-gradient-to-r from-white via-white/80 to-transparent shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      <div className="pointer-events-none absolute top-0 left-0 w-[70px] h-[2px] z-20 origin-top-left rotate-[40deg] bg-gradient-to-r from-white via-white/90 to-transparent shadow-[0_0_12px_2px_rgba(255,255,255,1)]" />
      <div className="pointer-events-none absolute top-0 left-0 w-[85px] h-[1px] z-20 origin-top-left rotate-[55deg] bg-gradient-to-r from-white via-white/60 to-transparent shadow-[0_0_8px_1px_rgba(255,255,255,0.6)]" />

      {/* Intense White Core */}
      <div className="pointer-events-none absolute top-[0px] left-[0px] z-30">
         <div className="absolute top-[-4px] left-[-4px] h-[8px] w-[8px] rounded-full bg-white shadow-[0_0_30px_15px_rgba(255,255,255,1)]" />
         <div className="absolute top-[-12px] left-[-12px] h-[24px] w-[24px] rounded-full bg-white/90 blur-[5px]" />
         <div className="absolute top-[-2px] left-[-40px] w-[80px] h-[4px] bg-white blur-[2px] shadow-[0_0_15px_rgba(255,255,255,1)]" />
         <div className="absolute top-[-40px] left-[-2px] h-[80px] w-[4px] bg-white blur-[2px] shadow-[0_0_15px_rgba(255,255,255,1)]" />
      </div>
      
      {/* Pure White Radial Glow from Top-Right (Half Brightness) */}
      <div className="pointer-events-none absolute top-0 right-0 w-full h-full z-10" 
           style={{ background: 'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 50%, transparent 80%)' }} />
      <div className="pointer-events-none absolute top-[0px] right-[0px] z-30">
         <div className="absolute top-[-2px] right-[-2px] h-[4px] w-[4px] rounded-full bg-white shadow-[0_0_12px_5px_rgba(255,255,255,1)]" />
         <div className="absolute top-[-8px] right-[-8px] h-[16px] w-[16px] rounded-full bg-white/40 blur-[4px]" />
      </div>
      
      {/* Extremely Sharp, bright top and side edge reflections shooting to middle */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent z-10 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      <div className="pointer-events-none absolute top-0 left-0 bottom-[10%] w-[2px] bg-gradient-to-b from-white via-white/80 to-transparent z-10 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-[30%] w-[1.5px] bg-gradient-to-b from-white/40 via-white/20 to-transparent z-10" />

      {/* Inner Bevel Highlights for Frosted Feel */}
      <div className="pointer-events-none absolute inset-0 rounded-[16px] shadow-[inset_1px_1px_4px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(0,0,0,0.5)] z-10" />

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
