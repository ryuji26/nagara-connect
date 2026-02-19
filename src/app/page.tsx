'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin, Search, ChevronUp, ChevronLeft, Star, Clock, Shield,
  Droplets, Sparkles, Zap, Check, Car, User, Bell,
  ArrowRight, X, Phone, MessageCircle, Navigation, Diamond
} from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────────
type View = 'map' | 'menu' | 'matching' | 'status';
type MatchPhase = 'searching' | 'found' | 'arriving' | 'arrived';
type StatusPhase = 0 | 1 | 2 | 3;

// ─── DATA ────────────────────────────────────────────────
const services = [
  {
    id: 'quick-wash',
    name: 'クイックウォッシュ',
    badge: '約30分 / 高速メンテナンス',
    price: '¥4,400~',
    time: '30',
    description: 'NAGARAのスノーフォームによる高速メンテナンス泡洗車。傷をつけないノータッチ洗車で、愛車を美しく保ちます。',
    style: 'snow' as const,
    icon: Droplets,
    features: ['ノータッチ洗車', 'スノーフォーム', '室内拭き上げ付'],
  },
  {
    id: 'skin-improvement',
    name: '肌改善スタンダード',
    badge: '約60分 / 傷埋め＋下地処理',
    price: '¥12,000~',
    time: '60',
    description: 'BASE（下地処理剤）による傷埋めと表面安定化。研磨時間を大幅短縮しながら、滑らかな肌触りと高い光沢を実現。',
    style: 'base' as const,
    icon: Sparkles,
    features: ['BASE下地処理', '傷埋め', '光沢復元'],
  },
  {
    id: 'night-luster',
    name: 'ナイトラスタープレミアム',
    nameShort: 'NAGARA PRO',
    badge: '約110分 / Fast Glass施工',
    price: '¥25,000~',
    time: '110',
    description: '旗艦サービス。Fast Glass（2時間硬化ガラスコーティング）による究極の鏡面仕上げ。撥水・防汚・UV遮断を実現。',
    style: 'crystal' as const,
    icon: Diamond,
    features: ['Fast Glass', '2時間硬化', '3年耐久'],
  },
  {
    id: 'restore-pro',
    name: 'リストアプロ',
    badge: '約3.5時間 / 精密ディテイリング',
    price: '¥60,000~',
    time: '210',
    description: '深い傷や経年劣化した塗装を職人の手で精密に復元。新車以上の輝きを取り戻す、NAGARAの最高峰サービス。',
    style: 'asura' as const,
    icon: Zap,
    features: ['精密研磨', '完全復元', 'プロ専用工程'],
  },
];

const statusPhases: { label: string; sub: string; color: string }[] = [
  { label: 'スノーフォーム塗布中...', sub: '極厚の泡が汚れを包み込んで浮かせています', color: '#ffffff' },
  { label: 'BASE下地処理中...', sub: '傷を埋めながら塗装面を安定化しています', color: '#ff0033' },
  { label: 'Fast Glass 硬化中...', sub: 'セラミックコーティングが分子レベルで結合しています', color: '#00ffff' },
  { label: '施工完了', sub: 'お客様の愛車は完全に保護されました', color: '#00ff88' },
];

const detailers = [
  { x: 25, y: 22, name: '高橋 匠', rating: 4.9, jobs: 342, specialty: 'コーティング', delay: 0 },
  { x: 62, y: 38, name: '佐藤 竜', rating: 5.0, jobs: 518, specialty: '研磨', delay: 0.3 },
  { x: 42, y: 62, name: '田中 空', rating: 4.8, jobs: 256, specialty: '洗車', delay: 0.6 },
  { x: 78, y: 18, name: '鈴木 慶', rating: 4.7, jobs: 189, specialty: 'レストア', delay: 0.9 },
  { x: 18, y: 52, name: '山本 雪', rating: 4.9, jobs: 401, specialty: 'コーティング', delay: 1.2 },
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

  const accentColor = {
    snow: '#ffffff',
    base: '#ffaa33',
    crystal: '#00ccff',
    asura: '#ff0033',
  }[service.style];

  const glowStyle = {
    snow: 'hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/10',
    base: 'hover:shadow-[0_0_40px_rgba(255,170,51,0.15)] border-amber-500/20',
    crystal: 'hover:shadow-[0_0_40px_rgba(0,204,255,0.15)] border-cyan-400/20',
    asura: 'hover:shadow-[0_0_40px_rgba(255,0,51,0.2)] border-asura-red/20',
  }[service.style];

  const bgGradient = {
    snow: 'from-white/5 to-transparent',
    base: 'from-amber-500/8 to-transparent',
    crystal: 'from-cyan-500/8 to-transparent',
    asura: 'from-red-500/8 to-transparent',
  }[service.style];

  const isFlag = service.id === 'night-luster';

  return (
    <button
      className={`w-full text-left glass rounded-2xl p-5 md:p-6 transition-all duration-500 animate-fade-in-up group cursor-pointer relative overflow-hidden ${glowStyle} ${isFlag ? 'ring-1 ring-cyan-400/30' : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
      onClick={onSelect}
    >
      {/* Flagship badge */}
      {isFlag && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500/20 to-transparent px-4 py-1.5 rounded-bl-xl">
          <span className="text-[9px] md:text-[10px] font-bold text-cyan-300 tracking-wider">★ 旗艦サービス</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center border border-white/5`}>
            <Icon size={20} className="md:!w-6 md:!h-6" style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="font-heading text-base md:text-lg font-bold tracking-wide">{service.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={10} style={{ color: accentColor }} />
              <span className="text-[10px] md:text-xs font-medium" style={{ color: accentColor }}>{service.badge}</span>
            </div>
          </div>
        </div>
        <div className="text-right mt-1">
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
  const [matchPhase, setMatchPhase] = useState<MatchPhase>('searching');
  const [matchedDetailer, setMatchedDetailer] = useState(detailers[0]);
  const [arrivalMin, setArrivalMin] = useState(8);
  const [statusPhase, setStatusPhase] = useState<StatusPhase>(0);
  const [progress, setProgress] = useState(0);

  // Matching flow simulation
  useEffect(() => {
    if (view !== 'matching') return;
    setMatchPhase('searching');

    // Pick random detailer
    const idx = Math.floor(Math.random() * detailers.length);
    setMatchedDetailer(detailers[idx]);

    const t1 = setTimeout(() => setMatchPhase('found'), 2500);
    const t2 = setTimeout(() => {
      setMatchPhase('arriving');
      setArrivalMin(8);
    }, 4500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [view]);

  // Arrival countdown
  useEffect(() => {
    if (view !== 'matching' || matchPhase !== 'arriving') return;
    const iv = setInterval(() => {
      setArrivalMin(prev => {
        if (prev <= 1) {
          clearInterval(iv);
          setMatchPhase('arrived');
          return 0;
        }
        return prev - 1;
      });
    }, 1500);
    return () => clearInterval(iv);
  }, [view, matchPhase]);

  // Auto-advance to status after arrived
  useEffect(() => {
    if (view !== 'matching' || matchPhase !== 'arrived') return;
    const t = setTimeout(() => setView('status'), 2000);
    return () => clearTimeout(t);
  }, [view, matchPhase]);

  // Status progress
  useEffect(() => {
    if (view !== 'status') return;
    setProgress(0);
    setStatusPhase(0);
    const iv = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(iv); return 100; }
        return prev + 0.5;
      });
    }, 80);
    return () => clearInterval(iv);
  }, [view]);

  useEffect(() => {
    if (progress >= 100) setStatusPhase(3);
    else if (progress >= 66) setStatusPhase(2);
    else if (progress >= 33) setStatusPhase(1);
    else setStatusPhase(0);
  }, [progress]);

  const handleSelectService = useCallback((id: string) => {
    setSelectedService(id);
    setView('matching');
  }, []);

  const selectedSvc = services.find(s => s.id === selectedService) || services[2];

  return (
    <div className="min-h-screen bg-black-deep relative overflow-hidden">

      {/* ═══════════════════════════════════════════════════
          VIEW A: MAP — 近くの職人を見つける
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

          {/* Search */}
          <div className="px-5 md:px-10 lg:px-16 pb-3">
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 max-w-2xl">
              <Search size={16} className="text-text-muted" />
              <span className="text-sm text-text-muted">場所やサービスを検索...</span>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-black-surface">
              {Array.from({ length: 30 }).map((_, i) => (
                <React.Fragment key={`g-${i}`}>
                  <div className="absolute h-full w-px" style={{ left: `${(i + 1) * 3.33}%`, background: 'rgba(255,255,255,0.015)' }} />
                  <div className="absolute w-full h-px" style={{ top: `${(i + 1) * 3.33}%`, background: 'rgba(255,255,255,0.015)' }} />
                </React.Fragment>
              ))}
              <div className="absolute top-[35%] left-0 right-0 h-[4px] bg-white/[0.04]" />
              <div className="absolute top-[65%] left-[5%] right-[15%] h-[3px] bg-white/[0.03]" />
              <div className="absolute left-[40%] top-0 bottom-0 w-[4px] bg-white/[0.04]" />
              <div className="absolute left-[70%] top-[10%] bottom-[30%] w-[3px] bg-white/[0.03]" />
              <div className="absolute top-[20%] left-[8%] w-[45%] h-[3px] bg-white/[0.025]" style={{ transform: 'rotate(20deg)' }} />

              {/* You */}
              <div className="absolute" style={{ left: '48%', top: '45%', transform: 'translate(-50%, -50%)' }}>
                <div className="relative">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-plasma-blue animate-pulse-plasma" />
                  <div className="absolute -inset-3 md:-inset-4 rounded-full border border-plasma-blue/30 animate-breathe" />
                  <div className="absolute -inset-6 md:-inset-8 rounded-full border border-plasma-blue/10 animate-breathe" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              {/* Detailer Pins */}
              {detailers.map((d, i) => (
                <div key={i} className="absolute animate-pin-bounce"
                  style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%, -50%)', animationDelay: `${d.delay}s` }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-asura-red flex items-center justify-center glow-asura-sm">
                      <MapPin size={14} className="text-white md:!w-5 md:!h-5" fill="white" />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass-strong rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <p className="text-[10px] md:text-xs font-bold">{d.name}</p>
                      <p className="text-[9px] text-text-muted">★{d.rating} • {d.specialty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sheet */}
            <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-500 ease-out ${bottomSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'
              }`}>
              <button className="w-full flex justify-center pt-3 pb-2 md:hidden" onClick={() => setBottomSheetOpen(!bottomSheetOpen)}>
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </button>

              <div className="glass-strong rounded-t-3xl md:rounded-3xl px-5 md:px-8 pt-3 pb-8 md:py-8 md:mx-auto md:max-w-2xl md:mb-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h2 className="font-heading text-lg md:text-2xl font-bold">職人を探す</h2>
                    <p className="text-xs md:text-sm text-text-secondary mt-0.5">近くに{detailers.length}人のプロがいます</p>
                  </div>
                  <ChevronUp size={20} className={`text-text-muted transition-transform md:hidden ${bottomSheetOpen ? '' : 'rotate-180'}`} />
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {[
                    { icon: Car, label: '現在地', sub: '渋谷区, 東京' },
                    { icon: Clock, label: '予約', sub: '今すぐ' },
                    { icon: Shield, label: '保険', sub: '賠償責任保険付' },
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
                  メニューを選んで予約する →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW B: MENU SELECTION — サービスを選ぶ
          ═══════════════════════════════════════════════════ */}
      {view === 'menu' && (
        <div className="min-h-screen animate-fade-in">
          <div className="px-5 md:px-10 lg:px-16 pt-4 pb-4 flex items-center justify-between max-w-5xl mx-auto">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center" onClick={() => setView('map')}>
              <ChevronLeft size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base md:text-xl font-bold tracking-wider">メニュー選択</h1>
              <p className="text-[10px] md:text-xs text-text-muted tracking-[0.15em]">ショップ品質を、半額で。</p>
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
                  <p className="text-[9px] md:text-xs text-text-muted">認定製品 × 認定職人</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-plasma-blue" />
                <span className="text-[10px] md:text-xs text-plasma-blue font-semibold">賠償責任保険付</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="px-5 md:px-10 lg:px-16 pb-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} onSelect={() => handleSelectService(service.id)} />
              ))}
            </div>
          </div>

          <div className="px-5 pb-8 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <p className="text-[10px] md:text-xs text-text-muted">
              「傷なんて磨けばいい。」— 全メニューに室内拭き上げサービス付
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW C: MATCHING — Uber型マッチング
          ═══════════════════════════════════════════════════ */}
      {view === 'matching' && (
        <div className="h-screen flex flex-col animate-fade-in">
          <div className="px-5 md:px-10 lg:px-16 pt-4 pb-4 flex items-center justify-between max-w-4xl mx-auto w-full">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center" onClick={() => { setView('menu'); }}>
              <X size={20} className="text-text-secondary" />
            </button>
            <div className="text-center">
              <h1 className="font-heading text-base md:text-xl font-bold tracking-wider">
                {matchPhase === 'searching' ? '職人を探しています...' :
                  matchPhase === 'found' ? '職人が見つかりました！' :
                    matchPhase === 'arriving' ? '向かっています' : '到着しました！'}
              </h1>
            </div>
            <div className="w-10 md:w-12" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-5 max-w-4xl mx-auto w-full">

            {/* Searching animation */}
            {matchPhase === 'searching' && (
              <div className="text-center animate-fade-in">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-asura-red/30 animate-breathe" />
                  <div className="absolute inset-3 rounded-full border border-asura-red/20 animate-breathe" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute inset-6 rounded-full border border-asura-red/10 animate-breathe" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search size={32} className="text-asura-red animate-pulse" />
                  </div>
                </div>
                <p className="text-sm md:text-base text-text-secondary">最適な職人をマッチング中...</p>
                <p className="text-xs text-text-muted mt-1">{selectedSvc.name} • {selectedSvc.price}</p>
              </div>
            )}

            {/* Found */}
            {matchPhase === 'found' && (
              <div className="text-center animate-fade-in-up w-full">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-asura-red/20 border-2 border-asura-red/40 flex items-center justify-center mx-auto mb-4">
                  <User size={36} className="text-asura-red md:!w-12 md:!h-12" />
                </div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-1">{matchedDetailer.name}</h2>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star size={14} fill="#ff0033" stroke="#ff0033" />
                  <span className="text-sm text-asura-red font-bold">{matchedDetailer.rating}</span>
                  <span className="text-xs text-text-muted">• {matchedDetailer.jobs}件の施工</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-text-secondary">{matchedDetailer.specialty}スペシャリスト</span>
              </div>
            )}

            {/* Arriving */}
            {(matchPhase === 'arriving' || matchPhase === 'arrived') && (
              <div className="text-center animate-fade-in-up w-full">
                {/* Mini map */}
                <div className="relative w-full max-w-md mx-auto h-40 md:h-52 glass rounded-2xl overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-black-surface">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <React.Fragment key={`mg-${i}`}>
                        <div className="absolute h-full w-px" style={{ left: `${(i + 1) * 10}%`, background: 'rgba(255,255,255,0.02)' }} />
                        <div className="absolute w-full h-px" style={{ top: `${(i + 1) * 10}%`, background: 'rgba(255,255,255,0.02)' }} />
                      </React.Fragment>
                    ))}
                    {/* Your location */}
                    <div className="absolute" style={{ left: '70%', top: '60%' }}>
                      <div className="w-3 h-3 rounded-full bg-plasma-blue animate-pulse-plasma" />
                    </div>
                    {/* Detailer moving */}
                    <div className="absolute transition-all duration-1000"
                      style={{
                        left: matchPhase === 'arrived' ? '65%' : '30%',
                        top: matchPhase === 'arrived' ? '55%' : '30%',
                      }}
                    >
                      <div className="w-5 h-5 rounded-full bg-asura-red flex items-center justify-center glow-asura-sm">
                        <Navigation size={10} className="text-white" />
                      </div>
                    </div>
                    {/* Route line */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="30%" y1="30%" x2="70%" y2="60%" stroke="#ff003380" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>
                  </div>
                </div>

                {/* Detailer card */}
                <div className="glass rounded-2xl p-4 md:p-5 max-w-md mx-auto mb-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-asura-red/20 border border-asura-red/30 flex items-center justify-center">
                      <User size={24} className="text-asura-red" />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-bold text-base md:text-lg">{matchedDetailer.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={10} fill="#ff0033" stroke="#ff0033" />
                        <span className="text-[11px] text-asura-red font-semibold">{matchedDetailer.rating}</span>
                        <span className="text-[11px] text-text-muted">• {matchedDetailer.specialty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {matchPhase === 'arriving' ? (
                        <>
                          <p className="font-heading text-2xl md:text-3xl font-black text-asura-red">{arrivalMin}</p>
                          <p className="text-[10px] text-text-muted">分で到着</p>
                        </>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check size={20} className="text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 max-w-md mx-auto">
                  <button className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2">
                    <Phone size={16} className="text-text-secondary" />
                    <span className="text-xs font-semibold text-text-secondary">電話</span>
                  </button>
                  <button className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2">
                    <MessageCircle size={16} className="text-plasma-blue" />
                    <span className="text-xs font-semibold text-plasma-blue">メッセージ</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom service info */}
          <div className="px-5 md:px-10 pb-6 max-w-4xl mx-auto w-full">
            <div className="glass rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <selectedSvc.icon size={16} className="text-plasma-blue" />
                <span className="font-heading font-bold text-sm md:text-base">{selectedSvc.name}</span>
              </div>
              <span className="font-heading font-bold text-sm md:text-base text-asura-red">{selectedSvc.price}</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VIEW D: LIVE STATUS — 施工リアルタイム
          ═══════════════════════════════════════════════════ */}
      {view === 'status' && (
        <div className="min-h-screen flex flex-col animate-fade-in">
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

          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {/* Detailer */}
            <div className="px-5 md:px-10 pb-6">
              <div className="glass rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-asura-red/20 border border-asura-red/30 flex items-center justify-center">
                  <User size={20} className="text-asura-red md:!w-7 md:!h-7" />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-sm md:text-lg">{matchedDetailer.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} fill="#ff0033" stroke="#ff0033" />
                    <span className="text-[10px] md:text-xs text-asura-red font-semibold">{matchedDetailer.rating}</span>
                    <span className="text-[10px] md:text-xs text-text-muted">• {matchedDetailer.jobs}件の施工</span>
                  </div>
                </div>
                <button className="w-9 h-9 md:w-11 md:h-11 rounded-xl glass flex items-center justify-center">
                  <MessageCircle size={16} className="text-plasma-blue" />
                </button>
              </div>
            </div>

            {/* Progress Ring */}
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
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 ${statusPhase > i ? 'scale-100' : statusPhase === i ? 'animate-pulse-red' : 'bg-white/20'
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
                  <span className="text-xs md:text-sm text-text-muted">残り: 約{Math.max(0, Math.ceil((100 - progress) * parseInt(selectedSvc.time) / 100))}分</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <selectedSvc.icon size={16} className="text-plasma-blue md:!w-5 md:!h-5" />
                    <span className="font-heading font-bold text-sm md:text-base">{selectedSvc.name}</span>
                  </div>
                  <span className="font-heading font-bold text-sm md:text-base text-asura-red">{selectedSvc.price}</span>
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
