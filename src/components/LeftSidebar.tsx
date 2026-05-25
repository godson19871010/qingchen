import React from 'react';
import { Calendar, Shield, ClipboardList, MapPin, Hexagon } from 'lucide-react';
import { cn } from '../lib/utils';

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

function Panel({ title, icon, children, className, actions }: PanelProps) {
  return (
    <div className={cn("relative flex flex-col overflow-hidden rounded-[16px] border-t border-t-cyan-100/50 border-r border-r-cyan-200/20 border-b border-b-black/40 border-l border-l-cyan-300/10 bg-gradient-to-br from-[#0e273a]/40 via-[#081825]/40 to-[#040e14]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]", className)}>
      
      {/* Pure White Radial Glow from Top-Left */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10" 
           style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)' }} />
      
      {/* Short Diagonal Light Beams shooting to the middle */}
      <div className="pointer-events-none absolute top-0 left-0 w-[120px] h-[1.5px] z-20 origin-top-left rotate-[30deg] bg-gradient-to-r from-white via-white/80 to-transparent shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      <div className="pointer-events-none absolute top-0 left-0 w-[80px] h-[2px] z-20 origin-top-left rotate-[45deg] bg-gradient-to-r from-white via-white/90 to-transparent shadow-[0_0_12px_2px_rgba(255,255,255,1)]" />
      <div className="pointer-events-none absolute top-0 left-0 w-[100px] h-[1px] z-20 origin-top-left rotate-[60deg] bg-gradient-to-r from-white via-white/60 to-transparent shadow-[0_0_8px_1px_rgba(255,255,255,0.6)]" />

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

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2">
        <div className="relative flex items-center gap-3">
           <div className="relative flex items-center justify-center text-cyan-200/90">
             <div className="absolute inset-0 bg-cyan-400/20 blur-[8px] rounded-full"></div>
             <div className="z-10">{icon}</div>
           </div>
           <span className="font-bold tracking-widest text-[#e8f8ff] text-[17px] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{title}</span>
        </div>
        {actions && <div className="relative z-10 flex gap-2 items-center">{actions}</div>}
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 overflow-auto px-4 pb-4 pt-1 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

export function LeftSidebar() {
  const dutyList = [
    { role: '值班领导', name: '雷大明', color: 'bg-yellow-500' },
    { role: '综合指挥', name: '兰石滨', color: 'bg-teal-500' },
    { role: '备勤', name: '水门油勤组', color: 'bg-teal-500' },
    { role: '案件办理', name: '雷玉英', color: 'bg-blue-500' },
    { role: '社区警务', name: '钟凤妹', color: 'bg-teal-500' },
    { role: '接处警组', name: '兰守旭', color: 'bg-red-500' },
    { role: '四级巡防', name: '水门四级巡防组', color: 'bg-green-500' },
  ];

  const tasks = [
    { level: '省级', total: 1640, done: 231, undone: 1409, h24: 12, h72: 3, overdue: 0 },
    { level: '市级', total: 793, done: 124, undone: 669, h24: 6, h72: 2, overdue: 0 },
    { level: '县级', total: 598, done: 89, undone: 509, h24: 4, h72: 1, overdue: 0 },
    { level: '本所', total: 89, done: 23, undone: 66, h24: 1, h72: 0, overdue: 0 },
  ];

  return (
    <div className="absolute left-6 top-[95px] z-10 flex h-[calc(100vh-110px)] w-[360px] flex-col gap-4 pb-4">
      
      {/* 勤务状态 (Duty Status) */}
      <Panel title="勤务状态" icon={<Shield size={14} strokeWidth={2.5}/>}>
        <div className="mb-4 flex items-center justify-between pr-2 text-sm text-teal-200/80">
          <span>日期:</span>
          <div className="flex items-center gap-2 rounded border border-teal-400/40 bg-[#0a1f2c]/80 px-2 py-1 text-teal-100 shadow-[inset_0_0_8px_rgba(20,184,166,0.2)]">
            <Calendar size={14} className="text-teal-400" />
            <span>2026-05-14</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium">
          {dutyList.map((duty, idx) => (
            <div key={idx} className="flex items-center text-sm text-teal-50">
              <div className="flex w-28 items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full shadow-[0_0_6px_currentColor]", duty.color, duty.color.replace('bg-', 'text-'))} />
                <span className="text-teal-200/70">{duty.role}</span>
              </div>
              <div className="flex-1 text-[#f8fafc]">{duty.name}</div>
              <div className="w-8 text-right text-teal-500/40">--</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* 任务中心 (Task Center) */}
      <Panel 
        title="任务中心" 
        icon={<ClipboardList size={14} strokeWidth={2.5} />}
        actions={
          <>
            <button className="rounded border border-teal-400/40 bg-teal-500/10 px-2 py-0.5 text-xs text-teal-300 hover:bg-teal-500/20 transition-colors">下发指令</button>
            <button className="rounded border border-teal-400/40 bg-teal-500/10 px-2 py-0.5 text-xs text-teal-300 hover:bg-teal-500/20 transition-colors">任务调度</button>
          </>
        }
      >
        <table className="w-full text-center text-[13px] text-teal-100">
          <thead>
            <tr className="text-teal-400/80 border-b border-teal-500/20">
              <th className="pb-2 text-left font-normal">级别</th>
              <th className="pb-2 font-normal">总数</th>
              <th className="pb-2 font-normal">已完成</th>
              <th className="pb-2 font-normal">未完成</th>
              <th className="pb-2 font-normal">24h</th>
              <th className="pb-2 font-normal">72h</th>
              <th className="pb-2 pr-1 text-right font-normal">已逾期</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {tasks.map((task, idx) => (
              <tr key={idx} className="border-b border-teal-500/10 last:border-0 hover:bg-teal-500/5 transition-colors">
                <td className="py-3 text-left text-teal-200/80">{task.level}</td>
                <td className="py-3">{task.total}</td>
                <td className="py-3 text-teal-300">{task.done}</td>
                <td className="py-3 text-red-300">{task.undone}</td>
                <td className="py-3">{task.h24}</td>
                <td className="py-3">{task.h72}</td>
                <td className="py-3 pr-1 text-right">{task.overdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* 巡逻打卡 (Patrol Check-in) */}
      <Panel 
        title="巡逻打卡" 
        icon={<MapPin size={14} strokeWidth={2.5}/>}
        actions={
          <div className="flex gap-1 rounded bg-[#041118] border border-teal-400/30 p-0.5">
             <button className="rounded bg-teal-500/30 px-2 py-0.5 text-[11px] text-[#e0fcfc]">巡逻打卡</button>
             <button className="rounded px-2 py-0.5 text-[11px] text-teal-500/70 hover:text-teal-300 hover:bg-teal-500/10 transition-colors">事件线索</button>
             <button className="rounded px-2 py-0.5 text-[11px] text-teal-500/70 hover:text-teal-300 hover:bg-teal-500/10 transition-colors">一键报警</button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {[
            { name: '水门渔港巡逻队', desc: '水门渔港东海岸线', time: '2026-05-14 08:00:00' },
            { name: '金沙湾巡逻队', desc: '金沙湾景区及周边道路', time: '2026-05-14 09:30:00' },
          ].map((patrol, idx) => (
            <div key={idx} className="group flex items-center justify-between rounded border border-teal-500/20 bg-gradient-to-r from-teal-900/20 to-transparent p-3 hover:border-teal-400/50 transition-colors">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 border border-teal-400/30 group-hover:shadow-[0_0_10px_rgba(20,184,166,0.3)]">
                  <Shield size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-teal-100">{patrol.name}</div>
                  <div className="mt-1 text-[11px] text-teal-200/60">{patrol.desc}</div>
                  <div className="mt-0.5 text-[11px] text-teal-200/60">{patrol.time}</div>
                </div>
              </div>
              <div className="text-[13px] font-semibold text-teal-400 drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]">进行中</div>
            </div>
          ))}
        </div>
      </Panel>

    </div>
  );
}
