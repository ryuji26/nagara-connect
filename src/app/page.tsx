'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin, Search, ChevronUp, ChevronLeft, Star, Clock, Shield,
  Droplets, Sparkles, Zap, Check, Car, User, Bell, Menu,
  ArrowRight, X, Phone, MessageCircle
} from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────────
type View = 'map' | 'menu' | 'status';
type StatusPhase = 0 | 1 | 2 | 3;

// ─── DATA ────────────────────────────────────────────────
const services = [
  {
    id: 'fast-glass',
    name: 'FAST GLASS',
    badge: '2-Hour Cure / 3-Year Durability',
    price: '¥25,000~',
    description: 'Ultimate glass coating that hardens in 2 hours. Military-grade protection with a mirror-like finish that repels water, dirt, and UV rays.',
    style: 'crystal' as const,
    icon: Sparkles,
    features: ['Ceramic 9H Hardness', 'Hydrophobic', 'UV Protection'],
  },
  {
    id: 'asura',
    name: 'ASURA',
    badge: 'Deep Gloss / Water Repellent',
    price: '¥15,000~',
    description: 'Legendary coating that delivers an otherworldly deep gloss. Water beads and sheets off the surface like nothing you\'ve seen.',
    style: 'asura' as const,
    icon: Zap,
    features: ['Deep Gloss Finish', 'Self-Cleaning', '1-Year Protection'],
  },
  {
    id: 'snowmen',
    name: 'SNOWMEN WASH',
    badge: 'Scratch-less Foam Wash',
    price: '¥4,000~',
    description: 'Thick snow foam blankets your vehicle, lifting dirt without touching the paint. The gentlest wash for the most precious surfaces.',
    style: 'snow' as const,
    icon: Droplets,
    features: ['pH Neutral', 'Zero Contact', 'Paint Safe'],
  },
];

const statusPhases: { label: string; sub: string; color: string }[] = [
  { label: 'Applying Snow Foam...', sub: 'Thick foam encapsulating surface contaminants', color: '#ffffff' },
  { label: 'Polishing with Easy Polish...', sub: 'Restoring factory-fresh clarity to every panel', color: '#ff0033' },
  { label: 'Curing Fast Glass...', sub: 'Ceramic coating forming molecular bonds', color: '#00ffff' },
  { label: 'Complete', sub: 'Your vehicle is now protected', color: '#00ff88' },
];

const mapPins = [
  { x: 30, y: 25, name: 'Detailer A', rating: 4.9, delay: 0 },
  { x: 65, y: 40, name: 'Detailer B', rating: 5.0, delay: 0.3 },
  { x: 45, y: 65, name: 'Detailer C', rating: 4.8, delay: 0.6 },
  { x: 75, y: 20, name: 'Detailer D', rating: 4.7, delay: 0.9 },
  { x: 20, y: 55, name: 'Detailer E', rating: 4.9, delay: 1.2 },
];

// ─── COMPONENTS ──────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[11px] text-text-secondary font-medium">21:11</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-[2px]">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`w-[3px] rounded-full ${i <= 3 ? 'bg-white' : 'bg-text-muted'}`} style={{ height: 4 + i * 2 }} />
          ))}
        </div>
        <span className="text-[11px] text-text-secondary">5G</span>
        <div className="w-6 h-3 rounded-sm border border-white/30 relative">
          <div className="absolute inset-[1px] rounded-[1px] bg-white/80" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ progress, size = 200, strokeWidth = 4, color = '#ff0033' }: {
  progress: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full animate-breathe" style={{
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
      }} />

      <svg className="progress-ring" width={size} height={size}>
        {/* Background track */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        {/* Progress arc */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
        />
        {/* Glow arc */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth + 8} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          opacity={0.15} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl font-black tracking-tight" style={{ color }}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, onSelect }: {
  service: typeof services[0]; index: number; onSelect: () => void;
}) {
  const Icon = service.icon;

  const glowStyle = {
    crystal: 'hover:shadow-[0_0_40px_rgba(200,220,255,0.15)] border-white/10',
    asura: 'hover:shadow-[0_0_40px_rgba(255,0,51,0.2)] border-asura-red/20',
    snow: 'hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/10',
  }[service.style];

  const accentColor = {
    crystal: '#c8dcff',
    asura: '#ff0033',
    snow: '#ffffff',
  }[service.style];

  const bgGradient = {
    crystal: 'from-blue-500/5 to-transparent',
    asura: 'from-red-500/8 to-transparent',
    snow: 'from-white/5 to-transparent',
  }[service.style];

  return (
    <button
      className={`w-full text-left glass rounded-2xl p-5 transition-all duration-500 animate-fade-in-up group cursor-pointer ${glowStyle}`}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={onSelect}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center border border-white/5`}>
            <Icon size={20} style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold tracking-wide">{service.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={10} style={{ color: accentColor }} />
              <span className="text-[10px] font-medium" style={{ color: accentColor }}>{service.badge}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-lg font-bold" style={{ color: accentColor }}>{service.price}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{service.description}</p>

      {/* Features */}
      <div className="flex gap-2 mb-3">
        {service.features.map(f => (
          <span key={f} className="text-[9px] font-medium px-2 py-1 rounded-full border border-white/10 text-text-secondary">
            {f}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star size={12} fill={accentColor} stroke={accentColor} />
          <Star size={12} fill={accentColor} stroke={accentColor} />
          <Star size={12} fill={accentColor} stroke={accentColor} />
          <Star size={12} fill={accentColor} stroke={accentColor} />
          <Star size={12} fill={accentColor} stroke={accentColor} />
          <span className="text-[10px] text-text-muted ml-1">5.0</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: accentColor }}>
          <span>Select</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────

export default function NagaraProPage() {
  const [view, setView] = useState<View>('map');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [statusPhase, setStatusPhase] = useState<StatusPhase>(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance live status
  useEffect(() => {
    if (view !== 'status') return;

    setProgress(0);
    setStatusPhase(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [view]);

  useEffect(() => {
    if (progress >= 100) setStatusPhase(3);
    else if (progress >= 66) setStatusPhase(2);
    else if (progress >= 33) setStatusPhase(1);
    else setStatusPhase(0);
  }, [progress]);

  const handleSelectService = useCallback((id: string) => {
    setSelectedService(id);
    setView('status');
  }, []);

  return (
    <div className="min-h-screen bg-black-deep relative overflow-hidden">

      {/* ═══════════════════════════════════════════════════
          VIEW A: THE MAP (LANDING)
          ═══════════════════════════════════════════════════ */}
      {view === 'map' && (
        <div className="h-screen flex flex-col animate-fade-in">
          <StatusBar />

          {/* Header */}
          <div className="px-5 pt-2 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-asura-red animate-pulse-red" />
                <span className="font-heading text-[10px] font-bold text-asura-red tracking-[0.3em] uppercase">Live</span>
              </div>
              <h1 className="font-heading text-2xl font-black tracking-tight mt-0.5">
                NAGARA <span className="text-asura-red">PRO</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <Bell size={18} className="text-text-secondary" />
              </button>
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <User size={18} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-5 pb-3">
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
              <Search size={16} className="text-text-muted" />
              <span className="text-sm text-text-muted">Search location or service...</span>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative">
            {/* Dark map simulation */}
            <div className="absolute inset-0 bg-black-surface">
              {/* Grid lines */}
              {Array.from({ length: 20 }).map((_, i) => (
                <React.Fragment key={`grid-${i}`}>
                  <div className="absolute h-full w-px" style={{ left: `${(i + 1) * 5}%`, background: 'rgba(255,255,255,0.02)' }} />
                  <div className="absolute w-full h-px" style={{ top: `${(i + 1) * 5}%`, background: 'rgba(255,255,255,0.02)' }} />
                </React.Fragment>
              ))}

              {/* Major roads */}
              <div className="absolute top-[35%] left-0 right-0 h-[4px] bg-white/[0.04] rounded-full" />
              <div className="absolute top-[65%] left-[10%] right-[20%] h-[3px] bg-white/[0.03] rounded-full" />
              <div className="absolute left-[45%] top-0 bottom-0 w-[4px] bg-white/[0.04] rounded-full" />
              <div className="absolute left-[72%] top-[10%] bottom-[30%] w-[3px] bg-white/[0.03] rounded-full" />
              {/* Diagonal road */}
              <div className="absolute top-[20%] left-[10%] w-[50%] h-[3px] bg-white/[0.025] rounded-full" style={{ transform: 'rotate(25deg)' }} />

              {/* Current location */}
              <div className="absolute" style={{ left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }}>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-plasma-blue animate-pulse-plasma" />
                  <div className="absolute -inset-3 rounded-full border border-plasma-blue/30 animate-breathe" />
                  <div className="absolute -inset-6 rounded-full border border-plasma-blue/10 animate-breathe" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              {/* Booking Pins */}
              {mapPins.map((pin, i) => (
                <div
                  key={i}
                  className="absolute animate-pin-bounce"
                  style={{
                    left: `${pin.x}%`, top: `${pin.y}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${pin.delay}s`,
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-asura-red flex items-center justify-center glow-asura-sm">
                      <MapPin size={14} className="text-white" fill="white" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <span className="text-[9px] font-semibold">{pin.name}</span>
                      <span className="text-[9px] text-asura-red ml-1">★ {pin.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sheet */}
            <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-500 ease-out ${bottomSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'
              }`}>
              {/* Handle */}
              <button
                className="w-full flex justify-center pt-3 pb-2"
                onClick={() => setBottomSheetOpen(!bottomSheetOpen)}
              >
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </button>

              <div className="glass-strong rounded-t-3xl px-5 pt-3 pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-heading text-lg font-bold">Find a Detailer</h2>
                    <p className="text-xs text-text-secondary mt-0.5">5 professionals nearby</p>
                  </div>
                  <ChevronUp size={20} className={`text-text-muted transition-transform ${bottomSheetOpen ? '' : 'rotate-180'}`} />
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: Car, label: 'My Location', sub: 'Shibuya, Tokyo' },
                    { icon: Clock, label: 'Schedule', sub: 'Now' },
                    { icon: Shield, label: 'Insurance', sub: 'Covered' },
                  ].map((item, i) => (
                    <div key={item.label} className="glass rounded-xl p-3 text-center animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <item.icon size={18} className="mx-auto mb-1.5 text-text-secondary" />
                      <p className="text-[10px] font-semibold">{item.label}</p>
                      <p className="text-[9px] text-text-muted">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="w-full bg-asura-red text-white font-heading font-bold text-sm py-3.5 rounded-xl glow-asura transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setView('menu')}
                >
                  Book Premium Detailing →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW B: MENU SELECTION (THE PRODUCT LINEUP)
          ═══════════════════════════════════════════════════ */}
      {view === 'menu' && (
        <div className="min-h-screen animate-fade-in">
          <StatusBar />

          {/* Header */}
          <div className="px-5 pt-2 pb-4 flex items-center justify-between">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center" onClick={() => setView('map')}>
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base font-bold tracking-wider">SELECT SERVICE</h1>
              <p className="text-[10px] text-text-muted tracking-[0.2em] uppercase">Premium Lineup</p>
            </div>
            <div className="w-10" />
          </div>

          {/* Brand bar */}
          <div className="px-5 pb-4">
            <div className="glass rounded-xl px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 rounded-full bg-asura-red" />
                <div>
                  <span className="font-heading text-xs font-bold tracking-wider">NAGARA PRO</span>
                  <p className="text-[9px] text-text-muted">Certified Products Only</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-plasma-blue" />
                <span className="text-[10px] text-plasma-blue font-semibold">Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="px-5 space-y-3 pb-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onSelect={() => handleSelectService(service.id)}
              />
            ))}
          </div>

          {/* Bottom hint */}
          <div className="px-5 pb-8 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <p className="text-[10px] text-text-muted">All services include complimentary interior wipe-down</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW C: LIVE STATUS (THE EXPERIENCE)
          ═══════════════════════════════════════════════════ */}
      {view === 'status' && (
        <div className="min-h-screen flex flex-col animate-fade-in">
          <StatusBar />

          {/* Header */}
          <div className="px-5 pt-2 pb-4 flex items-center justify-between">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center" onClick={() => { setView('menu'); setProgress(0); }}>
              <X size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base font-bold tracking-wider">LIVE STATUS</h1>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-asura-red animate-pulse-red" />
                <span className="text-[10px] text-asura-red font-semibold tracking-wider">IN PROGRESS</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <Phone size={18} className="text-text-secondary" />
            </button>
          </div>

          {/* Detailer info */}
          <div className="px-5 pb-6">
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-asura-red/20 border border-asura-red/30 flex items-center justify-center">
                <User size={20} className="text-asura-red" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-bold text-sm">Master Takahashi</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} fill="#ff0033" stroke="#ff0033" />
                  <span className="text-[10px] text-asura-red font-semibold">5.0</span>
                  <span className="text-[10px] text-text-muted">• 342 services</span>
                </div>
              </div>
              <button className="w-9 h-9 rounded-xl glass flex items-center justify-center">
                <MessageCircle size={16} className="text-plasma-blue" />
              </button>
            </div>
          </div>

          {/* Progress Ring - Center */}
          <div className="flex-1 flex flex-col items-center justify-center px-5">
            <div className="relative">
              {/* Background ambient */}
              <div className="absolute inset-0 -m-16 rounded-full animate-breathe" style={{
                background: `radial-gradient(circle, ${statusPhases[statusPhase].color}08 0%, transparent 70%)`,
              }} />

              <ProgressRing
                progress={progress}
                size={220}
                strokeWidth={4}
                color={statusPhases[statusPhase].color}
              />
            </div>

            {/* Status text */}
            <div className="mt-8 text-center animate-fade-in-up">
              <h2 className="font-heading text-lg font-bold mb-1" style={{ color: statusPhases[statusPhase].color }}>
                {statusPhases[statusPhase].label}
              </h2>
              <p className="text-xs text-text-secondary max-w-[260px] mx-auto leading-relaxed">
                {statusPhases[statusPhase].sub}
              </p>
            </div>

            {/* Phase indicators */}
            <div className="flex items-center gap-3 mt-6">
              {statusPhases.slice(0, 3).map((phase, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${statusPhase > i ? 'bg-white scale-100' :
                      statusPhase === i ? 'animate-pulse-red' : 'bg-white/20'
                    }`} style={statusPhase >= i ? { backgroundColor: phase.color } : {}} />
                  {i < 2 && <div className={`w-8 h-px transition-all duration-500 ${statusPhase > i ? 'bg-white/30' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Service details */}
          <div className="px-5 pb-6">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-muted">Selected Service</span>
                <span className="text-xs text-text-muted">ETA: {Math.max(0, Math.ceil((100 - progress) * 0.6))} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-plasma-blue" />
                  <span className="font-heading font-bold text-sm">
                    {services.find(s => s.id === selectedService)?.name || 'FAST GLASS'}
                  </span>
                </div>
                <span className="font-heading font-bold text-sm text-asura-red">
                  {services.find(s => s.id === selectedService)?.price || '¥25,000~'}
                </span>
              </div>
            </div>
          </div>

          {/* Complete CTA */}
          {statusPhase === 3 && (
            <div className="px-5 pb-8 animate-fade-in-up">
              <button
                className="w-full bg-asura-red text-white font-heading font-bold text-sm py-3.5 rounded-xl glow-asura transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={() => { setView('map'); setProgress(0); }}
              >
                <Check size={18} />
                Confirm & Rate
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
