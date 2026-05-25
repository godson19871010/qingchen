import React from 'react';
import { ShieldAlert, Bell, ChevronDown, RefreshCcw, Hexagon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Custom3DBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  const depth = 6;
  
  if (!height || height <= 0) return null;

  return (
    <g>
      {/* Front face */}
      <path d={`M${x},${y} v${height} h${width} v-${height} Z`} fill={fill} />
      {/* Right face */}
      <path d={`M${x + width},${y} l${depth},-${depth} v${height} l-${depth},${depth} Z`} fill={fill} style={{ filter: 'brightness(0.6)' }} />
      {/* Top face */}
      <path d={`M${x},${y} l${depth},-${depth} h${width} l-${depth},${depth} Z`} fill={fill} style={{ filter: 'brightness(1.3)' }} />
    </g>
  );
};

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

export function RightSidebar() {
  const chartData = [
    { name: '四类人员预警\n采集布控', total: 3, handled: 1 },
    { name: '四类人员信息\n采集布控', total: 2.5, handled: 0 },
    { name: '重点区域/场所\n人员预警管控', total: 0, handled: 1.5 },
  ];

  const alerts = [
    { 
      type: 'person', 
      title: '兰凤英 - gd6段道路施工现场', 
      desc: '四类人员信息采集布控',
      time: '2026-05-14 16:40:15',
      tag: '人员预警',
      tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
      iconColor: 'text-red-400 bg-red-400/10'
    },
    { 
      type: 'person', 
      title: '钟凤英 - gd6段市场入口', 
      desc: '重点人员预警布控',
      time: '2026-05-14 08:05:42',
      tag: '人员预警',
      tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
      iconColor: 'text-red-400 bg-red-400/10'
    },
    { 
      type: 'location', 
      title: 'gd6段清水门 - 中心小学门口', 
      desc: '重点人员预警布控',
      time: '2026-05-14 13:18:29',
      tag: '人员预警',
      tagColor: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
      iconColor: 'text-orange-400 bg-orange-400/10'
    },
    { 
      type: 'person', 
      title: 'gd6段清水门 - 青云路口', 
      desc: '四类人员信息采集布控',
      time: '2026-05-14 10:22:35',
      tag: '人员预警',
      tagColor: 'border-red-500/50 bg-red-500/10 text-red-400',
      iconColor: 'text-red-400 bg-red-400/10'
    },
  ];

  return (
    <div className="absolute right-6 top-[95px] z-10 flex h-[calc(100vh-110px)] w-[380px] flex-col gap-4 pb-4">
      
      {/* Attached Tabs on Left Edge */}
      <div className="absolute left-[-40px] top-[140px] flex flex-col gap-8 z-[100] font-medium pointer-events-auto">
        
        {/* Tab 1 */}
        <div className="relative flex flex-col items-center justify-center py-5 w-[40px] h-[130px] bg-gradient-to-l from-slate-800/95 to-slate-900/95 border border-slate-400/40 border-r-0 shadow-[-4px_0_15px_rgba(0,0,0,0.6),inset_-1px_1px_3px_rgba(255,255,255,0.2)] text-slate-200 text-[14px]" style={{ clipPath: 'polygon(100% 0, 0 12px, 0 calc(100% - 12px), 100% 100%)' }}>
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-300/60 via-white/30 to-slate-300/60 z-10" />
          {/* Highlight point on tab top left corner */}
          <div className="absolute top-[12px] left-[1px] h-[4px] w-[4px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
          
          <div className="flex flex-col gap-1 tracking-widest text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
            <span>预</span>
            <span>警</span>
            <span>监</span>
            <span>测</span>
          </div>
        </div>

        {/* Tab 2 */}
        <div className="relative flex flex-col items-center justify-center py-5 w-[40px] h-[130px] bg-gradient-to-l from-slate-800/60 to-slate-900/60 border border-slate-500/20 border-r-0 shadow-[-4px_0_15px_rgba(0,0,0,0.5),inset_-1px_1px_2px_rgba(255,255,255,0.1)] text-slate-400 text-[14px]" style={{ clipPath: 'polygon(100% 0, 0 12px, 0 calc(100% - 12px), 100% 100%)' }}>
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/30 to-transparent z-10" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/30 to-transparent z-10" />
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-400/30 via-slate-300/10 to-slate-400/30 z-10" />
          
          <div className="flex flex-col gap-1 tracking-widest text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            <span>数</span>
            <span>据</span>
            <span>统</span>
            <span>计</span>
          </div>
        </div>
      </div>

      {/* 预警处置率 (Alert Handling Rate) */}
      <Panel title="预警处置率" icon={<ShieldAlert size={14} strokeWidth={2.5}/>}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[13px] text-slate-400">
            <div className="flex items-center gap-2">
              <span>类型:</span>
              <div className="flex gap-1 rounded bg-slate-800/80 border border-slate-600/30 p-0.5">
                <button className="rounded bg-blue-500/30 px-3 py-0.5 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]">人</button>
                <button className="px-3 py-0.5 hover:text-slate-200 hover:bg-slate-700/50 rounded transition-colors">车</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>平台分类:</span>
              <div className="flex gap-1.5 text-xs bg-slate-800/50 rounded border border-slate-700/50 p-1">
                <span className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">海康平台</span>
                <span className="rounded px-1.5 py-0.5 text-slate-500 transition-colors hover:text-slate-300">主防平台</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[13px] text-slate-400">
            <span>日期:</span>
            <div className="flex flex-1 items-center justify-between rounded border border-slate-600/40 bg-slate-800/80 px-2 py-1 text-slate-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
              <span>开始日期</span>
              <span className="text-slate-500">至</span>
              <span>结束日期</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            <button className="rounded border border-slate-600/40 bg-slate-800/80 p-1 text-blue-400 hover:bg-slate-700 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.2)]">
              <RefreshCcw size={16} />
            </button>
          </div>

          <div className="flex gap-3 mt-1">
             <div className="flex-1 flex flex-col items-center justify-center rounded border border-red-500/30 bg-gradient-to-b from-red-500/10 to-transparent py-3 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                <div className="text-[13px] font-medium text-slate-300">预警总数</div>
                <div className="text-[28px] font-bold tracking-wider text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">5</div>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center rounded border border-blue-400/30 bg-gradient-to-b from-blue-500/10 to-transparent py-3 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                <div className="text-[13px] font-medium text-slate-300">已处置</div>
                <div className="text-[28px] font-bold tracking-wider text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">1</div>
             </div>
          </div>

          <div className="mt-2 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94a3b8', fontSize: 11, opacity: 0.8 }} 
                  axisLine={{ stroke: '#475569', opacity: 0.4 }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis 
                  tick={{ fill: '#94a3b8', fontSize: 11, opacity: 0.8 }} 
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                />
                <Tooltip 
                  cursor={{ fill: '#ef4444', opacity: 0.15 }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '6px', fontSize: '13px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                />
                <Bar dataKey="total" fill="#ef4444" barSize={18} shape={<Custom3DBar />} />
                <Bar dataKey="handled" fill="#3b82f6" barSize={18} shape={<Custom3DBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-8 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.5)]"></div>
              <span>预警数量</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.5)]"></div>
              <span>已处置数量</span>
            </div>
          </div>
        </div>
      </Panel>

      {/* 预警监测 (Alert Monitoring) */}
      <Panel title="预警监测" icon={<Bell size={14} strokeWidth={2.5}/>} className="flex-1">
         <div className="mb-4 flex gap-1 rounded bg-slate-800/80 border border-slate-600/30 p-0.5 text-[13px] text-slate-400">
            <button className="rounded bg-blue-500/20 px-4 py-1 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.2)]">预警类</button>
            <button className="rounded px-4 py-1 hover:text-slate-200 hover:bg-slate-700/50 transition-colors">提醒类</button>
            <div className="mx-1 my-1 w-px bg-slate-600/50"></div>
            <button className="px-3 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">人</button>
            <button className="px-3 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">车</button>
            <button className="px-3 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">更多<ChevronDown size={12} className="inline ml-0.5 mb-0.5" /></button>
            <button className="ml-auto px-3 py-1 hover:text-blue-300 border-l border-slate-600/50 transition-colors">自定义</button>
         </div>

         <div className="flex flex-col gap-3">
            {alerts.map((alert, idx) => (
                <div key={idx} className="group relative flex gap-3 rounded bg-gradient-to-r from-slate-800/80 to-transparent p-3 transition-colors hover:bg-slate-700/50 border border-transparent hover:border-slate-600/30">
                  <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className={cn("mt-1 flex shrink-0 items-center justify-center rounded-sm h-9 w-9 bg-slate-900 border border-slate-700", alert.tag.includes('人员') ? 'text-red-400' : 'text-orange-400')}>
                     <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <div className="truncate text-sm font-semibold text-slate-200" title={alert.title}>
                         {alert.title}
                       </div>
                       <div className={cn("shrink-0 rounded border px-1.5 py-0.5 text-[11px] font-medium tracking-wide drop-shadow-md", alert.tagColor)}>
                         {alert.tag}
                       </div>
                    </div>
                    <div className="mt-1.5 truncate text-[13px] text-slate-400">{alert.desc}</div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                       <span className="text-slate-500 font-mono">{alert.time}</span>
                       <div className="flex gap-1.5">
                         <button className="rounded border border-slate-600 bg-slate-800 px-2 py-0.5 text-blue-400 hover:bg-slate-700 transition-colors">签收</button>
                         <button className="rounded border border-slate-600 bg-slate-800 px-2 py-0.5 text-slate-300 hover:bg-slate-700 transition-colors">忽略</button>
                         <button className="rounded border border-slate-600 bg-slate-800 px-2 py-0.5 text-red-400 hover:bg-slate-700 transition-colors">下发指令</button>
                       </div>
                    </div>
                  </div>
                </div>
            ))}
         </div>
      </Panel>
    </div>
  );
}
