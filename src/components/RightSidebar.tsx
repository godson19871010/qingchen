import React from 'react';
import { ShieldAlert, Bell, ChevronDown, RefreshCcw, Hexagon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Custom3DBar = (props: any) => {
  const { fill, x, y, width, height, index = 0 } = props;
  const depth = 8;
  
  if (!height || height <= 0) return null;

  const gradientId = `barGradient-${index}-${fill.replace('#','')}`;
  
  // Dimensions for inner liquid volume
  const padX = 2;
  const padY = 3;
  const lx = x + padX;
  const ly = y + padY;
  const lw = Math.max(1, width - padX * 2);
  const lh = Math.max(1, height - padY);
  const ld = depth - 2;

  return (
    <g className="cursor-pointer transition-all duration-300 hover:opacity-100">
      <defs>
        {/* Liquid Gradients: Deep at bottom, light at top */}
        <linearGradient id={`${gradientId}-liquidFront`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.15} />
          <stop offset="50%" stopColor={fill} stopOpacity={0.5} />
          <stop offset="100%" stopColor={fill} stopOpacity={0.95} />
        </linearGradient>
        <linearGradient id={`${gradientId}-liquidRight`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.05} />
          <stop offset="100%" stopColor={fill} stopOpacity={0.7} />
        </linearGradient>
        <linearGradient id={`${gradientId}-glassReflex`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.4} />
          <stop offset="20%" stopColor="#ffffff" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>
      
      {/* --- Outer Glass Back/Inside Walls --- */}
      <path d={`M${x + width},${y} l${depth},-${depth} v${height} l-${depth},${depth} Z`} fill="rgba(255,255,255,0.03)" />
      <path d={`M${x},${y} l${depth},-${depth} h${width} l-${depth},${depth} Z`} fill="rgba(255,255,255,0.03)" />
      
      {/* --- Inner Liquid Volume --- */}
      <g>
         {/* Front face of liquid */}
         <path d={`M${lx},${ly} v${lh} h${lw} v-${lh} Z`} fill={`url(#${gradientId}-liquidFront)`} />
         {/* Right face of liquid */}
         <path d={`M${lx + lw},${ly} l${ld},-${ld} v${lh} l-${ld},${ld} Z`} fill={`url(#${gradientId}-liquidRight)`} />
         {/* Top surface of liquid */}
         <path d={`M${lx},${ly} l${ld},-${ld} h${lw} l-${ld},${ld} Z`} fill={fill} fillOpacity={0.5} />
         
         {/* Rising Bubbles */}
         <circle cx={lx + lw * 0.3} cy={ly + lh - 2} r={1} fill="#ffffff" opacity={0.6}>
            <animate attributeName="cy" values={`${ly + lh};${ly + 2}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
         </circle>
         <circle cx={lx + lw * 0.7} cy={ly + lh - 2} r={0.8} fill="#ffffff" opacity={0.4}>
            <animate attributeName="cy" values={`${ly + lh};${ly + 2}`} dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="opacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
         </circle>
         <circle cx={lx + lw * 0.5} cy={ly + lh - 2} r={1.5} fill="#ffffff" opacity={0.5}>
            <animate attributeName="cy" values={`${ly + lh};${ly + 2}`} dur="1.8s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0;0.5;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
         </circle>
      </g>
      
      {/* --- Outer Glass Front Shell --- */}
      {/* Front Face Outline */}
      <path d={`M${x},${y} v${height} h${width} v-${height} Z`} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
      {/* Right Face Outline */}
      <path d={`M${x + width},${y} l${depth},-${depth} v${height} l-${depth},${depth} Z`} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      {/* Top Face Outline */}
      <path d={`M${x},${y} l${depth},-${depth} h${width} l-${depth},${depth} Z`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
      
      {/* Glassy highlight stripe on the left edge */}
      <path d={`M${x},${y} v${height} h${width/2.5} v-${height} Z`} fill={`url(#${gradientId}-glassReflex)`} />
      
      {/* Edges Specular Highlights */}
      <line x1={x} y1={y} x2={x+width} y2={y} stroke="rgba(255,255,255,0.6)" strokeWidth={1} />
      <line x1={x} y1={y} x2={x+depth} y2={y-depth} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      
      {/* Glowing base line spread */}
      <line x1={x-2} y1={y+height} x2={x+width+depth+2} y2={y+height} stroke={fill} strokeWidth={2} strokeOpacity={0.8} filter="blur(2px)" />

      {/* Subtle container breathing animation */}
      <animate attributeName="opacity" values="0.85; 1; 0.85" dur={`${2.5 + (index % 3) * 0.5}s`} repeatCount="indefinite" />
    </g>
  );
};

function Panel({ title, icon, children, className, actions }: PanelProps) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.2 } }
      }}
      className={cn("relative flex flex-col overflow-hidden rounded-[16px] border-t border-t-blue-400/30 border-r border-r-blue-500/20 border-b border-b-black/40 border-l border-l-blue-500/20 bg-gradient-to-br from-slate-800/80 via-blue-900/40 to-[rgba(10,20,35,0.8)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]", className)}
    >
      <style>{`
        @keyframes containerLiquidWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
      `}</style>
      
      {/* Liquid background fill */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute bottom-0 left-0 w-full h-[35%] opacity-20 mix-blend-screen overflow-hidden rounded-b-[16px]">
             <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500/40 to-transparent"></div>
             <svg className="absolute w-[200%] h-[40px] -top-[10px] left-0 drop-shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" style={{ animation: 'containerLiquidWave 8s linear infinite' }} viewBox="0 0 800 40" preserveAspectRatio="none">
                <path d="M0,20 C100,0 300,40 400,20 C500,0 700,40 800,20 L800,40 L0,40 Z" fill="rgba(59,130,246,0.4)"/>
             </svg>
             <svg className="absolute w-[200%] h-[40px] -top-[5px] left-0" style={{ animation: 'containerLiquidWave 12s linear infinite reverse' }} viewBox="0 0 800 40" preserveAspectRatio="none">
                <path d="M0,20 C100,40 300,0 400,20 C500,40 700,0 800,20 L800,40 L0,40 Z" fill="rgba(59,130,246,0.6)"/>
             </svg>
             {/* Bubbles */}
             <div className="absolute bottom-2 left-[20%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatUp 3s infinite ease-in' }} />
             <div className="absolute bottom-6 left-[60%] w-0.5 h-0.5 bg-white rounded-full" style={{ animation: 'floatUp 2.5s infinite ease-in 1s' }} />
             <div className="absolute bottom-0 left-[80%] w-1 h-1 bg-white rounded-full" style={{ animation: 'floatUp 4s infinite ease-in 0.5s' }} />
         </div>
         {/* Glass Reflex on sides */}
         <div className="absolute inset-x-0 bottom-0 h-full border-b-[8px] border-l-[3px] border-r-[3px] border-white/5 rounded-[16px] pointer-events-none" />
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

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2">
        <div className="relative flex items-center gap-3">
           <div className="relative flex items-center justify-center text-blue-300 rounded border border-blue-400/50 bg-blue-500/20 p-1.5 shadow-[0_0_12px_rgba(59,130,246,0.8)]">
             <div className="z-10">{icon}</div>
           </div>
           <span className="font-sans text-[15px] font-bold tracking-wider text-slate-100 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{title}</span>
        </div>
        {actions && <div className="relative z-10 flex gap-2 items-center">{actions}</div>}
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 overflow-auto px-4 pb-4 pt-1 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
          }
        }
      }}
      className="absolute right-6 top-[95px] z-10 flex h-[calc(100vh-110px)] w-[380px] flex-col gap-4 pb-4"
    >
      
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
      <Panel title="预警处置率" icon={<ShieldAlert size={18} strokeWidth={2.5}/>}>
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
             <div className="group flex-1 flex flex-col items-center justify-center rounded border border-red-500/30 bg-gradient-to-b from-red-500/10 to-transparent py-3 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(239,68,68,0.15)] hover:border-red-400/50">
                <div className="text-[13px] font-medium text-slate-300 group-hover:text-slate-200 transition-colors">预警总数</div>
                <div className="text-[28px] font-bold tracking-wider text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] transition-all">5</div>
             </div>
             <div className="group flex-1 flex flex-col items-center justify-center rounded border border-blue-400/30 bg-gradient-to-b from-blue-500/10 to-transparent py-3 shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(59,130,246,0.15)] hover:border-blue-300/50">
                <div className="text-[13px] font-medium text-slate-300 group-hover:text-slate-200 transition-colors">已处置</div>
                <div className="text-[28px] font-bold tracking-wider text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all">1</div>
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
                <Bar dataKey="total" fill="#ef4444" barSize={18} shape={<Custom3DBar />} isAnimationActive={true} animationDuration={1800} animationEasing="ease-out" />
                <Bar dataKey="handled" fill="#3b82f6" barSize={18} shape={<Custom3DBar />} isAnimationActive={true} animationDuration={1800} animationEasing="ease-out" />
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
      <Panel title="预警监测" icon={<Bell size={18} strokeWidth={2.5}/>} className="flex-1">
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
                <motion.div variants={itemVariants} key={idx} className="group relative flex gap-3 rounded bg-gradient-to-r from-slate-800/80 to-transparent p-3 transition-colors hover:bg-slate-700/50 border border-transparent hover:border-slate-600/30">
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
                </motion.div>
            ))}
         </div>
      </Panel>
    </motion.div>
  );
}
