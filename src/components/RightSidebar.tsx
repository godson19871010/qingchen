import React from 'react';
import { ShieldAlert, Bell, ChevronDown, RefreshCcw, Hexagon, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import ThreeDChartWidget from './ThreeDChart';

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

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
  const [activeTab, setActiveTab] = React.useState<'monitoring' | 'stats'>('stats');

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
        
        {/* Tab 1: 预警监测 */}
        <div 
          onClick={() => setActiveTab('monitoring')}
          className={cn(
             "relative flex flex-col items-center justify-center py-5 w-[40px] h-[130px] border border-r-0 text-[14px] cursor-pointer transition-all duration-300 rounded-l-lg",
             activeTab === 'monitoring'
               ? "bg-gradient-to-l from-slate-800/95 to-slate-900/95 border-slate-400/50 text-slate-200 shadow-[-4px_0_15px_rgba(0,0,0,0.6),inset_-1px_1px_3px_rgba(255,255,255,0.2)]"
               : "bg-gradient-to-l from-slate-800/40 to-slate-900/40 border-slate-500/20 text-slate-400 hover:text-slate-200 shadow-[-4px_0_15px_rgba(0,0,0,0.3),inset_-1px_1px_2px_rgba(255,255,255,0.05)]"
          )}
          style={{ clipPath: 'polygon(100% 0, 0 12px, 0 calc(100% - 12px), 100% 100%)' }}
        >
          {activeTab === 'monitoring' && (
            <>
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
              <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-300/60 via-white/30 to-slate-300/60 z-10" />
              <div className="absolute top-[12px] left-[1px] h-[4px] w-[4px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
            </>
          )}
          {activeTab !== 'monitoring' && (
            <>
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/20 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/20 to-transparent z-10" />
              <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-400/20 via-slate-300/5 to-slate-400/20 z-10" />
            </>
          )}
          <div className={cn("flex flex-col gap-1 tracking-widest font-bold", activeTab === 'monitoring' ? "text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "")}>
            <span>预</span>
            <span>警</span>
            <span>监</span>
            <span>测</span>
          </div>
        </div>

        {/* Tab 2: 数据统计 */}
        <div 
          onClick={() => setActiveTab('stats')}
          className={cn(
             "relative flex flex-col items-center justify-center py-5 w-[40px] h-[130px] border border-r-0 text-[14px] cursor-pointer transition-all duration-300 rounded-l-lg",
             activeTab === 'stats'
               ? "bg-gradient-to-l from-slate-800/95 to-slate-900/95 border-slate-400/50 text-slate-200 shadow-[-4px_0_15px_rgba(0,0,0,0.6),inset_-1px_1px_3px_rgba(255,255,255,0.2)]"
               : "bg-gradient-to-l from-slate-800/40 to-slate-900/40 border-slate-500/20 text-slate-400 hover:text-slate-200 shadow-[-4px_0_15px_rgba(0,0,0,0.3),inset_-1px_1px_2px_rgba(255,255,255,0.05)]"
          )}
          style={{ clipPath: 'polygon(100% 0, 0 12px, 0 calc(100% - 12px), 100% 100%)' }}
        >
          {activeTab === 'stats' && (
            <>
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-300/60 to-transparent z-10" />
              <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-300/60 via-white/30 to-slate-200/60 z-10" />
              <div className="absolute top-[12px] left-[1px] h-[4px] w-[4px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
            </>
          )}
          {activeTab !== 'stats' && (
            <>
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/20 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-slate-400/20 to-transparent z-10" />
              <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-400/20 via-slate-300/5 to-slate-400/20 z-10" />
            </>
          )}
          <div className={cn("flex flex-col gap-1 tracking-widest font-bold", activeTab === 'stats' ? "text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "")}>
            <span>数</span>
            <span>据</span>
            <span>统</span>
            <span>计</span>
          </div>
        </div>
      </div>

      {activeTab === 'stats' && (
        <Panel title="预警处置率" icon={<ShieldAlert size={18} strokeWidth={2.5}/>} className="flex-1 flex flex-col min-h-[350px]">
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between text-[13px] text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span>类型:</span>
                <div className="flex gap-1 rounded bg-slate-800/80 border border-slate-600/30 p-0.5">
                  <button className="rounded bg-blue-500/30 px-3 py-0.5 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]">人</button>
                  <button className="px-3 py-0.5 hover:text-slate-200 hover:bg-slate-700/50 rounded transition-colors">车</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>平台:</span>
                <div className="flex gap-1.5 text-xs bg-slate-800/50 rounded border border-slate-700/50 p-1">
                  <span className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">海康</span>
                  <span className="rounded px-1.5 py-0.5 text-slate-500 transition-colors hover:text-slate-300">主防</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[13px] text-slate-400 shrink-0">
              <span>日期:</span>
              <div className="flex flex-1 items-center justify-between rounded border border-slate-600/40 bg-slate-800/80 px-2 py-1 text-slate-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]">
                <span>开始日期</span>
                <span className="text-slate-500">至</span>
                <span>结束日期</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <button className="rounded border border-slate-600/40 bg-slate-800/80 p-0.5 text-blue-400 hover:bg-slate-700 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.2)]">
                <RefreshCcw size={14} />
              </button>
            </div>

            <div className="flex gap-3 shrink-0">
               <div className="group flex-1 flex flex-col items-center justify-center rounded border border-red-500/30 bg-gradient-to-b from-red-500/10 to-transparent py-2 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all duration-300 hover:border-red-400/50">
                  <div className="text-[12px] font-medium text-slate-300 group-hover:text-slate-200 transition-colors">预警总数</div>
                  <div className="text-[24px] font-bold tracking-wider text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all">5</div>
               </div>
               <div className="group flex-1 flex flex-col items-center justify-center rounded border border-blue-400/30 bg-gradient-to-b from-blue-500/10 to-transparent py-2 shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300 hover:border-blue-300/50">
                  <div className="text-[12px] font-medium text-slate-300 group-hover:text-slate-200 transition-colors">已处置</div>
                  <div className="text-[24px] font-bold tracking-wider text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">1</div>
               </div>
            </div>

            {/* Canvas Wrapper - Automatically consumes all remaining vertical height and avoids squeeze */}
            <div className="flex-grow flex-1 w-[calc(100%+32px)] -mx-4 relative h-[270px] min-h-[220px]">
              <ThreeDChartWidget />
            </div>
            
            <div className="flex justify-center gap-8 text-xs font-medium text-slate-300 shrink-0 select-none pb-0.5">
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
      )}

      {activeTab === 'monitoring' && (
        <Panel title="预警监测" icon={<Bell size={18} strokeWidth={2.5}/>} className="flex-1 flex flex-col min-h-[350px]">
          <div className="mb-3 flex gap-1 rounded bg-slate-800/80 border border-slate-600/30 p-0.5 text-[12px] text-slate-400 shrink-0">
             <button className="rounded bg-blue-500/20 px-3 py-1 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.2)]">预警类</button>
             <button className="rounded px-3 py-1 hover:text-slate-200 hover:bg-slate-700/50 transition-colors">提醒类</button>
             <div className="mx-1 my-1 w-px bg-slate-600/50"></div>
             <button className="px-2 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">人</button>
             <button className="px-2 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">车</button>
             <button className="px-2 py-1 hover:text-slate-200 hover:bg-slate-700/30 transition-colors rounded">更多<ChevronDown size={12} className="inline ml-0.5 mb-0.5" /></button>
             <button className="ml-auto px-2 py-1 hover:text-blue-300 border-l border-slate-600/50 transition-colors">自定义</button>
          </div>

          <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 pr-1">
             {alerts.map((alert, idx) => (
                 <motion.div variants={itemVariants} key={idx} className="group relative flex gap-3 rounded bg-gradient-to-r from-slate-800/80 to-transparent p-2.5 transition-colors hover:bg-slate-700/50 border border-transparent hover:border-slate-600/30">
                   <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className={cn("mt-1 flex shrink-0 items-center justify-center rounded-sm h-8 w-8 bg-slate-900 border border-slate-700", alert.tag.includes('人员') ? 'text-red-400' : 'text-orange-400')}>
                      <Bell size={16} />
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-start justify-between gap-2">
                        <div className="truncate text-xs font-semibold text-slate-200" title={alert.title}>
                          {alert.title}
                        </div>
                        <div className={cn("shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium tracking-wide drop-shadow-md", alert.tagColor)}>
                          {alert.tag}
                        </div>
                     </div>
                     <div className="mt-1 truncate text-xs text-slate-400">{alert.desc}</div>
                     <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">{alert.time}</span>
                        <div className="flex gap-1 inline-flex">
                          <button className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 text-blue-400 hover:bg-slate-700 transition-colors">签收</button>
                          <button className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 text-slate-300 hover:bg-slate-700 transition-colors">忽略</button>
                          <button className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 text-red-400 hover:bg-slate-700 transition-colors text-[10px]">派发</button>
                        </div>
                     </div>
                   </div>
                 </motion.div>
             ))}
          </div>
        </Panel>
      )}

      {/* 智控降尘感知设备 - Highly requested, now balances Right Block perfectly */}
      <Panel 
        title="智控降尘感知设备" 
        icon={<Cpu size={18} strokeWidth={2.5}/>}
        className="h-[210px] shrink-0"
        actions={
          <span className="text-[11px] text-green-400 px-1.5 py-0.5 bg-green-500/10 rounded font-bold font-sans animate-pulse">全部在线</span>
        }
      >
        <div className="flex flex-col gap-2 h-full overflow-y-auto pr-1">
          {[
            { name: '水门东港1#环境测站', pm25: 18, pm10: 34, spray: '自动降尘中', device: '物联防尘雾枪' },
            { name: '路桥二期施工主要通道', pm25: 48, pm10: 92, spray: '自动降尘中', device: '重度智能喷淋' },
            { name: '金沙湾景区入口景观哨卡', pm25: 14, pm10: 25, spray: '节能待机中', device: '低空冷雾测站' },
          ].map((device, idx) => (
            <motion.div 
              variants={itemVariants} 
              key={idx} 
              className="group flex flex-col gap-1.5 rounded border border-blue-500/10 bg-slate-900/40 p-2.5 hover:border-blue-400/45 transition-all duration-300 hover:bg-slate-800/30"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 truncate pr-2 w-40" title={device.name}>{device.name}</span>
                <span className={cn(
                  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide",
                  device.spray.includes('自动') 
                    ? 'border border-green-500/30 bg-green-500/15 text-green-400 font-sans shadow-[0_0_6px_rgba(34,197,94,0.15)] animate-pulse' 
                    : 'border border-blue-500/20 bg-blue-500/10 text-blue-300 font-sans'
                )}>
                  {device.spray}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                <div className="bg-slate-950/40 border border-slate-800/45 rounded px-1.5 py-0.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">PM2.5</span>
                  <span className={cn("font-mono font-bold", device.pm25 > 35 ? 'text-orange-400' : 'text-green-400')}>
                    {device.pm25} <span className="text-[8px] font-normal text-slate-500">μg</span>
                  </span>
                </div>
                <div className="bg-slate-950/40 border border-slate-800/45 rounded px-1.5 py-0.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">PM10</span>
                  <span className={cn("font-mono font-bold", device.pm10 > 50 ? 'text-orange-400' : 'text-green-400')}>
                    {device.pm10} <span className="text-[8px] font-normal text-slate-500">μg</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-0.5 pt-1 border-t border-slate-800/30">
                <span>系统: {device.device}</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>传输正常</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>
    </motion.div>
  );
}
