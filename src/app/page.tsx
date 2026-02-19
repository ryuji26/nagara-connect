'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin, Search, ChevronUp, ChevronLeft, Star, Clock, Shield,
  Droplets, Sparkles, Zap, Check, Car, User, Bell,
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
    badge: '2時間硬化 / 3年耐久',
    price: '¥25,000~',
    description: 'わずか2時間で硬化する究極のガラスコーティング。ミリタリーグレードの保護力で、撥水・防汚・UV遮断を実現する鏡面仕上げ。',
    style: 'crystal' as const,
    icon: Sparkles,
    features: ['セラミック9H硬度', '超撥水', 'UV保護'],
  },
  {
    id: 'asura',
    name: 'ASURA',
    badge: '深艶 / 強撥水',
    price: '¥15,000~',
    description: '異次元の深い艶を実現する伝説のコーティング。水玉が瞬時に流れ落ちる圧倒的な撥水性能。',
    style: 'asura' as const,
    icon: Zap,
    features: ['深艶仕上げ', 'セルフクリーニング', '1年保護'],
  },
  {
    id: 'snowmen',
    name: 'SNOWMEN WASH',
    badge: 'ノースクラッチ泡洗車',
    price: '¥4,000~',
    description: '極厚のスノーフォームが車体を包み込み、塗装に触れることなく汚れを浮かせて除去。最も大切な愛車のための最も優しい洗車。',
    style: 'snow' as const,
    icon: Droplets,
    features: ['pH中性', 'ノータッチ', '塗装保護'],
  },
];

const statusPhases: { label: string; sub: string; color: string }[] = [
  { label: 'スノーフォーム塗布中...', sub: '極厚の泡が汚れを包み込んで浮かせています', color: '#ffffff' },
  { label: 'イージーポリッシュで研磨中...', sub: '全パネルを新車同様の輝きに復元しています', color: '#ff0033' },
  { label: 'FAST GLASS 硬化中...', sub: 'セラミックコーティングが分子レベルで結合しています', color: '#00ffff' },
  { label: '施工完了', sub: 'お客様の愛車は完全に保護されました', color: '#00ff88' },
];

const mapPins = [
  { x: 25, y: 22, name: 'TAKA', rating: 4.9, delay: 0 },
  { x: 62, y: 38, name: 'RYU', rating: 5.0, delay: 0.3 },
  { x: 42, y: 62, name: 'SORA', rating: 4.8, delay: 0.6 },
  { x: 78, y: 18, name: 'KEI', rating: 4.7, delay: 0.9 },
  { x: 18, y: 52, name: 'YUKI', rating: 4.9, delay: 1.2 },
];

// ─── COMPONENTS ──────────────────────────────────────────

function ProgressRing({ progress, size = 200, strokeWidth = 4, color = '#ff0033' }: {
  progress: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full animate-breathe" style={{
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
      }} />
      <svg className="progress-ring" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }}
        />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth + 8} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          opacity={0.15} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl md:text-5xl font-black tracking-tight" style={{ color }}>
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
      className={`w-full text-left glass rounded-2xl p-5 md:p-6 transition-all duration-500 animate-fade-in-up group cursor-pointer ${glowStyle}`}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center border border-white/5`}>
            <Icon size={20} className="md:!w-6 md:!h-6" style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="font-heading text-lg md:text-xl font-bold tracking-wide">{service.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={10} style={{ color: accentColor }} />
              <span className="text-[10px] md:text-xs font-medium" style={{ color: accentColor }}>{service.badge}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-lg md:text-xl font-bold" style={{ color: accentColor }}>{service.price}</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-3">{service.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {service.features.map(f => (
          <span key={f} className="text-[9px] md:text-[11px] font-medium px-2 py-1 rounded-full border border-white/10 text-text-secondary">
            {f}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={accentColor} stroke={accentColor} />
          ))}
          <span className="text-[10px] text-text-muted ml-1">5.0</span>
        </div>
        <div className="flex items-center gap-1 text-xs md:text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: accentColor }}>
          <span>選択</span>
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

  useEffect(() => {
    if (view !== 'status') return;
    setProgress(0);
    setStatusPhase(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
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

          {/* Header */}
          <div className="px-5 md:px-10 lg:px-16 pt-4 pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-asura-red animate-pulse-red" />
                <span className="font-heading text-[10px] md:text-xs font-bold text-asura-red tracking-[0.3em] uppercase">配信中</span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mt-0.5">
                NAGARA <span className="text-asura-red">PRO</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center">
                <Bell size={18} className="text-text-secondary" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center">
                <User size={18} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-5 md:px-10 lg:px-16 pb-3">
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 max-w-2xl">
              <Search size={16} className="text-text-muted" />
              <span className="text-sm text-text-muted">場所やサービスを検索...</span>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-black-surface">
              {/* Grid */}
              {Array.from({ length: 30 }).map((_, i) => (
                <React.Fragment key={`grid-${i}`}>
                  <div className="absolute h-full w-px" style={{ left: `${(i + 1) * 3.33}%`, background: 'rgba(255,255,255,0.015)' }} />
                  <div className="absolute w-full h-px" style={{ top: `${(i + 1) * 3.33}%`, background: 'rgba(255,255,255,0.015)' }} />
                </React.Fragment>
              ))}

              {/* Roads */}
              <div className="absolute top-[35%] left-0 right-0 h-[4px] bg-white/[0.04] rounded-full" />
              <div className="absolute top-[65%] left-[5%] right-[15%] h-[3px] bg-white/[0.03] rounded-full" />
              <div className="absolute left-[40%] top-0 bottom-0 w-[4px] bg-white/[0.04] rounded-full" />
              <div className="absolute left-[70%] top-[10%] bottom-[30%] w-[3px] bg-white/[0.03] rounded-full" />
              <div className="absolute top-[20%] left-[8%] w-[45%] h-[3px] bg-white/[0.025] rounded-full" style={{ transform: 'rotate(20deg)' }} />
              <div className="absolute top-[50%] left-[55%] w-[35%] h-[3px] bg-white/[0.02] rounded-full" style={{ transform: 'rotate(-15deg)' }} />

              {/* Current location */}
              <div className="absolute" style={{ left: '48%', top: '45%', transform: 'translate(-50%, -50%)' }}>
                <div className="relative">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-plasma-blue animate-pulse-plasma" />
                  <div className="absolute -inset-3 md:-inset-4 rounded-full border border-plasma-blue/30 animate-breathe" />
                  <div className="absolute -inset-6 md:-inset-8 rounded-full border border-plasma-blue/10 animate-breathe" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              {/* Pins */}
              {mapPins.map((pin, i) => (
                <div key={i} className="absolute animate-pin-bounce"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)', animationDelay: `${pin.delay}s` }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-asura-red flex items-center justify-center glow-asura-sm">
                      <MapPin size={14} className="text-white md:!w-5 md:!h-5" fill="white" />
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <span className="text-[10px] md:text-xs font-semibold">{pin.name}</span>
                      <span className="text-[10px] md:text-xs text-asura-red ml-1.5">★ {pin.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sheet - Responsive: full width on mobile, centered card on desktop */}
            <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-500 ease-out ${bottomSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'
              }`}>
              <button className="w-full flex justify-center pt-3 pb-2 md:hidden"
                onClick={() => setBottomSheetOpen(!bottomSheetOpen)}
              >
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </button>

              <div className="glass-strong rounded-t-3xl md:rounded-3xl px-5 md:px-8 pt-3 pb-8 md:py-8 md:mx-auto md:max-w-2xl md:mb-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h2 className="font-heading text-lg md:text-2xl font-bold">パートナーを探す</h2>
                    <p className="text-xs md:text-sm text-text-secondary mt-0.5">近くに5人のプロがいます</p>
                  </div>
                  <ChevronUp size={20} className={`text-text-muted transition-transform md:hidden ${bottomSheetOpen ? '' : 'rotate-180'}`} />
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {[
                    { icon: Car, label: '現在地', sub: '渋谷区, 東京' },
                    { icon: Clock, label: '予約', sub: '今すぐ' },
                    { icon: Shield, label: '保険', sub: '適用済み' },
                  ].map((item, i) => (
                    <div key={item.label} className="glass rounded-xl p-3 md:p-4 text-center animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <item.icon size={18} className="mx-auto mb-1.5 text-text-secondary md:!w-6 md:!h-6" />
                      <p className="text-[10px] md:text-sm font-semibold">{item.label}</p>
                      <p className="text-[9px] md:text-xs text-text-muted">{item.sub}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-asura-red text-white font-heading font-bold text-sm md:text-base py-3.5 md:py-4 rounded-xl glow-asura transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setView('menu')}
                >
                  プレミアム施工を予約する →
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

          {/* Header */}
          <div className="px-5 md:px-10 lg:px-16 pt-4 pb-4 flex items-center justify-between max-w-5xl mx-auto">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center" onClick={() => setView('map')}>
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base md:text-xl font-bold tracking-wider">メニュー選択</h1>
              <p className="text-[10px] md:text-xs text-text-muted tracking-[0.2em]">プレミアムラインナップ</p>
            </div>
            <div className="w-10 md:w-12" />
          </div>

          {/* Brand bar */}
          <div className="px-5 md:px-10 lg:px-16 pb-4 max-w-5xl mx-auto">
            <div className="glass rounded-xl px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 h-6 rounded-full bg-asura-red" />
                <div>
                  <span className="font-heading text-xs md:text-sm font-bold tracking-wider">NAGARA PRO</span>
                  <p className="text-[9px] md:text-xs text-text-muted">認定製品のみ使用</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-plasma-blue" />
                <span className="text-[10px] md:text-xs text-plasma-blue font-semibold">品質保証</span>
              </div>
            </div>
          </div>

          {/* Service Cards - responsive grid */}
          <div className="px-5 md:px-10 lg:px-16 pb-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  onSelect={() => handleSelectService(service.id)}
                />
              ))}
            </div>
          </div>

          {/* Bottom hint */}
          <div className="px-5 pb-8 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <p className="text-[10px] md:text-xs text-text-muted">全メニューに室内拭き上げサービスが含まれます</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW C: LIVE STATUS (THE EXPERIENCE)
          ═══════════════════════════════════════════════════ */}
      {view === 'status' && (
        <div className="min-h-screen flex flex-col animate-fade-in">

          {/* Header */}
          <div className="px-5 md:px-10 lg:px-16 pt-4 pb-4 flex items-center justify-between max-w-4xl mx-auto w-full">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center" onClick={() => { setView('menu'); setProgress(0); }}>
              <X size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base md:text-xl font-bold tracking-wider">施工状況</h1>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-asura-red animate-pulse-red" />
                <span className="text-[10px] md:text-xs text-asura-red font-semibold tracking-wider">施工中</span>
              </div>
            </div>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center">
              <Phone size={18} className="text-text-secondary" />
            </button>
          </div>

          {/* Content area - centered, max width */}
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">

            {/* Detailer info */}
            <div className="px-5 md:px-10 pb-6">
              <div className="glass rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-asura-red/20 border border-asura-red/30 flex items-center justify-center">
                  <User size={20} className="text-asura-red md:!w-7 md:!h-7" />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-sm md:text-lg">マスター 高橋</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} fill="#ff0033" stroke="#ff0033" />
                    <span className="text-[10px] md:text-xs text-asura-red font-semibold">5.0</span>
                    <span className="text-[10px] md:text-xs text-text-muted">• 342件の施工</span>
                  </div>
                </div>
                <button className="w-9 h-9 md:w-11 md:h-11 rounded-xl glass flex items-center justify-center">
                  <MessageCircle size={16} className="text-plasma-blue" />
                </button>
              </div>
            </div>

            {/* Progress Ring - Center */}
            <div className="flex-1 flex flex-col items-center justify-center px-5">
              <div className="relative">
                <div className="absolute inset-0 -m-16 rounded-full animate-breathe" style={{
                  background: `radial-gradient(circle, ${statusPhases[statusPhase].color}08 0%, transparent 70%)`,
                }} />
                <div className="hidden md:block">
                  <ProgressRing progress={progress} size={280} strokeWidth={5} color={statusPhases[statusPhase].color} />
                </div>
                <div className="md:hidden">
                  <ProgressRing progress={progress} size={200} strokeWidth={4} color={statusPhases[statusPhase].color} />
                </div>
              </div>

              <div className="mt-8 text-center animate-fade-in-up">
                <h2 className="font-heading text-lg md:text-2xl font-bold mb-1" style={{ color: statusPhases[statusPhase].color }}>
                  {statusPhases[statusPhase].label}
                </h2>
                <p className="text-xs md:text-sm text-text-secondary max-w-[300px] md:max-w-md mx-auto leading-relaxed">
                  {statusPhases[statusPhase].sub}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                {statusPhases.slice(0, 3).map((phase, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 ${statusPhase > i ? 'bg-white scale-100' :
                        statusPhase === i ? 'animate-pulse-red' : 'bg-white/20'
                      }`} style={statusPhase >= i ? { backgroundColor: phase.color } : {}} />
                    {i < 2 && <div className={`w-8 md:w-14 h-px transition-all duration-500 ${statusPhase > i ? 'bg-white/30' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Service details */}
            <div className="px-5 md:px-10 pb-6">
              <div className="glass rounded-2xl p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs md:text-sm text-text-muted">選択サービス</span>
                  <span className="text-xs md:text-sm text-text-muted">残り: 約{Math.max(0, Math.ceil((100 - progress) * 0.6))}分</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-plasma-blue md:!w-5 md:!h-5" />
                    <span className="font-heading font-bold text-sm md:text-base">
                      {services.find(s => s.id === selectedService)?.name || 'FAST GLASS'}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-sm md:text-base text-asura-red">
                    {services.find(s => s.id === selectedService)?.price || '¥25,000~'}
                  </span>
                </div>
              </div>
            </div>

            {/* Complete CTA */}
            {statusPhase === 3 && (
              <div className="px-5 md:px-10 pb-8 animate-fade-in-up">
                <button
                  className="w-full bg-asura-red text-white font-heading font-bold text-sm md:text-base py-3.5 md:py-4 rounded-xl glow-asura transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  onClick={() => { setView('map'); setProgress(0); }}
                >
                  <Check size={18} />
                  確認 & レビュー
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
