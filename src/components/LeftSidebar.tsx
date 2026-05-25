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
    <div className={cn("relative flex flex-col overflow-hidden rounded-[16px] border-t border-t-blue-400/30 border-r border-r-blue-500/20 border-b border-b-black/40 border-l border-l-blue-500/20 bg-gradient-to-br from-slate-800/80 via-blue-900/40 to-[rgba(10,20,35,0.8)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]", className)}>
      
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

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2">
        <div className="relative flex items-center gap-3">
           <div className="relative flex items-center justify-center text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
             <div className="z-10">{icon}</div>
           </div>
           <span className="font-sans text-sm font-semibold tracking-wider text-slate-200 uppercase">{title}</span>
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
        <div className="mb-4 flex items-center justify-between pr-2 text-sm text-slate-400">
          <span>日期:</span>
          <div className="flex items-center gap-2 rounded border border-blue-500/30 bg-slate-800/80 px-2 py-1 text-slate-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
            <Calendar size={14} className="text-blue-400" />
            <span>2026-05-14</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium">
          {dutyList.map((duty, idx) => (
            <div key={idx} className="flex items-center text-sm text-slate-300">
              <div className="flex w-28 items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full shadow-[0_0_6px_currentColor]", duty.color, duty.color.replace('bg-', 'text-'))} />
                <span className="text-slate-400">{duty.role}</span>
              </div>
              <div className="flex-1 text-slate-100">{duty.name}</div>
              <div className="w-8 text-right text-slate-500/40">--</div>
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
            <button className="rounded border border-blue-400/40 bg-blue-500/10 px-2 py-0.5 text-xs text-blue-300 hover:bg-blue-500/20 transition-colors">下发指令</button>
            <button className="rounded border border-blue-400/40 bg-blue-500/10 px-2 py-0.5 text-xs text-blue-300 hover:bg-blue-500/20 transition-colors">任务调度</button>
          </>
        }
      >
        <table className="w-full text-center text-[13px] text-slate-300">
          <thead>
            <tr className="text-slate-400/80 border-b border-slate-600/30">
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
              <tr key={idx} className="border-b border-slate-600/20 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-3 text-left text-slate-400/80">{task.level}</td>
                <td className="py-3 text-blue-100">{task.total}</td>
                <td className="py-3 text-blue-400">{task.done}</td>
                <td className="py-3 text-red-400">{task.undone}</td>
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
          <div className="flex gap-1 rounded bg-slate-800/80 border border-slate-600/30 p-0.5">
             <button className="rounded bg-blue-600/30 px-2 py-0.5 text-[11px] text-blue-100 shadow-[0_0_8px_rgba(59,130,246,0.3)]">巡逻打卡</button>
             <button className="rounded px-2 py-0.5 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors">事件线索</button>
             <button className="rounded px-2 py-0.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">一键报警</button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {[
            { name: '水门渔港巡逻队', desc: '水门渔港东海岸线', time: '2026-05-14 08:00:00' },
            { name: '金沙湾巡逻队', desc: '金沙湾景区及周边道路', time: '2026-05-14 09:30:00' },
          ].map((patrol, idx) => (
            <div key={idx} className="group flex items-center justify-between rounded border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-transparent p-3 hover:border-blue-400/40 transition-colors">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-600 text-blue-400 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50 transition-all">
                  <Shield size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{patrol.name}</div>
                  <div className="mt-1 text-[11px] text-slate-400">{patrol.desc}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500 font-mono">{patrol.time}</div>
                </div>
              </div>
              <div className="text-[13px] font-semibold text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">进行中</div>
            </div>
          ))}
        </div>
      </Panel>

    </div>
  );
}
