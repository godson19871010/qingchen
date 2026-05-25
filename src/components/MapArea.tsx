import React, { useEffect, useState } from 'react';
import { Search, Layers, Crosshair, Ruler, Maximize } from 'lucide-react';
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '../lib/utils';
import ReactDOMServer from 'react-dom/server';

const rippleKeyframes = `
  @keyframes mapRipple {
    0% { transform: translate(-50%, -50%) rotateX(72deg) scale(0.2); opacity: 0.8; border-width: 2px; }
    50% { opacity: 0.4; border-width: 1px; }
    100% { transform: translate(-50%, -50%) rotateX(72deg) scale(4); opacity: 0; border-width: 0px; }
  }
`;

function createCustomIcon(name: string, type: string, active: boolean = false) {
  const getMainColor = () => {
    switch (type) {
      case 'person': return 'rgba(45,212,191,1)';
      case 'unit': return 'rgba(96,165,250,1)';
      case 'alert': return 'rgba(248,113,113,1)';
      default: return 'rgba(45,212,191,1)';
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'person': return 'rgba(20,184,166,0.3)';
      case 'unit': return 'rgba(59,130,246,0.3)';
      case 'alert': return 'rgba(239,68,68,0.3)';
      default: return 'rgba(20,184,166,0.3)';
    }
  };

  const iconHtml = `
    <style>${rippleKeyframes}</style>
    <div class="flex flex-col items-center justify-center -translate-x-1/2 -translate-y-full pointer-events-none">
      <div class="relative flex flex-col items-center justify-end pb-[8px]">
        
        <!-- Ripple effect branching from map surface (3D perspective) -->
        <div class="absolute bottom-[0px] left-1/2 w-0 h-0 pointer-events-none" style="perspective: 1000px;">
           <div class="absolute top-[50%] left-[50%] rounded-full border-solid opacity-0" style="width: 80px; height: 80px; border-color: ${getMainColor()}; animation: mapRipple 6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; animation-delay: 0s; box-shadow: 0 0 10px ${getMainColor()} inset, 0 0 10px ${getMainColor()}"></div>
           <div class="absolute top-[50%] left-[50%] rounded-full border-solid opacity-0" style="width: 80px; height: 80px; border-color: ${getMainColor()}; animation: mapRipple 6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; animation-delay: 2s; box-shadow: 0 0 10px ${getMainColor()} inset, 0 0 10px ${getMainColor()}"></div>
           <div class="absolute top-[50%] left-[50%] rounded-full border-solid opacity-0" style="width: 80px; height: 80px; border-color: ${getMainColor()}; animation: mapRipple 6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; animation-delay: 4s; box-shadow: 0 0 10px ${getMainColor()} inset, 0 0 10px ${getMainColor()}"></div>
        </div>

        <!-- Pin Arrow pointing to map -->
        <div class="absolute bottom-[1px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] z-10" style="border-top-color: ${getMainColor()}"></div>

        <!-- Main icon circle -->
        <div class="relative flex h-7 w-7 items-center justify-center rounded-full border bg-opacity-70 backdrop-blur-md z-10" style="background-color: ${getBgColor()}; border-color: ${getMainColor()}; color: ${getMainColor()}; ${active ? `box-shadow: 0 0 15px ${getMainColor()};` : ''}">
          ${type === 'alert' ? '<span class="text-sm font-bold">!</span>' : (type === 'person' ? (
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
          ) : (
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>'
          ))}
        </div>
      </div>
      <div class="mt-0 whitespace-nowrap rounded bg-[#081822]/90 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.8)] border backdrop-blur-sm" style="border-color: ${getMainColor()}">
        ${name}
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
}

function MapTweak() {
  const map = useMap();
  useEffect(() => {
    map.zoomControl?.remove();
  }, [map]);
  return null;
}

export function MapArea() {
  const center: [number, number] = [26.885, 120.003]; // Xiapu / Shuimen area roughly
  
  return (
    <div className="absolute inset-0 z-0 bg-[#06141d] overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={12} 
        zoomControl={false}
        className="h-full w-full"
        style={{ background: '#06141d' }}
      >
        <MapTweak />
        {/* Esri World Imagery with greenish tint via CSS filter or just normal */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
          className="map-tiles-filter"
        />
        
        {/* Adds standard dark matter labels on top if wanted, but Esri has a boundaries layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          className="map-tiles-filter"
        />

        <Marker position={[26.920, 119.950]} icon={createCustomIcon('钟家镇', 'person')} />
        <Marker position={[26.878, 120.021]} icon={createCustomIcon('水门港区', 'unit', true)} />
        <Marker position={[26.840, 120.005]} icon={createCustomIcon('金沙湾', 'person')} />
        <Marker position={[26.950, 120.080]} icon={createCustomIcon('X976', 'alert')} />

      </MapContainer>

      {/* Map Tools Left Bottom */}
      <div className="absolute bottom-[40px] left-[400px] z-[1000] flex flex-col items-center gap-6 rounded-[20px] bg-gradient-to-b from-[#b3c7cf]/40 to-[#738f9f]/20 py-6 px-1.5 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl border border-white/20 w-[42px]">
        <button className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"><Search size={22} /></button>
        <button className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"><Layers size={22} /></button>
        <button className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"><Crosshair size={22} /></button>
        <button className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"><Ruler size={22} /></button>
        <div className="h-4" /> {/* Spacer instead of line to match screenshot */}
        <button className="text-white hover:text-cyan-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"><Maximize size={22} /></button>
      </div>
    </div>
  );
}

function ToolButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-teal-500/20 text-teal-300 transition-all hover:shadow-[inset_0_0_10px_rgba(45,212,191,0.4)]">
      {icon}
    </button>
  );
}
