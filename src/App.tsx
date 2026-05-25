import React from 'react';
import { Header } from './components/Header';
import { TopStats } from './components/TopStats';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { MapArea } from './components/MapArea';

export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#06141d] font-sans selection:bg-teal-500/30">
      <MapArea />
      <Header />
      <TopStats />
      
      {/* 
        The sidebars are absolutely positioned within their components 
        but we can render them here.
      */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-10" 
           style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #06141d 100%)' }} />
      
      <div className="relative z-20 pointer-events-auto">
        <LeftSidebar />
        <RightSidebar />
      </div>
    </div>
  );
}
