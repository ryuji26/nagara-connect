'use client';

import React, { useState } from 'react';
import {
  MapPin, Search, Star, Clock, Shield, ChevronRight,
  Droplets, Sparkles, Zap, Check, User, Bell, Calendar,
  ArrowLeft, Diamond, Heart, ThumbsUp, Award, BadgeCheck,
  Car, Phone, MessageCircle, ChevronDown, X
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────

const services = [
  {
    id: 'quick-wash',
    name: 'クイックウォッシュ',
    time: '約30分',
    price: '¥4,400~',
    description: 'スノーフォームによるノータッチ洗車。室内拭き上げ付。',
    icon: Droplets,
    color: '#ffffff',
  },
  {
    id: 'skin-improvement',
    name: '肌改善スタンダード',
    time: '約60分',
    price: '¥12,000~',
    description: 'BASE（下地処理剤）で傷埋め＋表面安定化。見違えるような艶に。',
    icon: Sparkles,
    color: '#ffaa33',
  },
  {
    id: 'night-luster',
    name: 'ナイトラスタープレミアム',
    time: '約110分',
    price: '¥25,000~',
    description: '旗艦サービス。Fast Glass（2時間硬化ガラスコーティング）で究極の鏡面仕上げ。',
    icon: Diamond,
    color: '#00ccff',
    popular: true,
  },
  {
    id: 'restore-pro',
    name: 'リストアプロ',
    time: '約3.5時間',
    price: '¥60,000~',
    description: '深い傷や経年劣化を精密に復元。新車以上の輝きを取り戻す最高峰。',
    icon: Zap,
    color: '#ff0033',
  },
];

const areas = ['渋谷区', '新宿区', '港区', '世田谷区', '目黒区', '品川区'];

const detailersList = [
  {
    id: 1, name: '高橋 匠', photo: null,
    rating: 4.9, reviews: 128, jobs: 342,
    specialty: 'コーティング',
    badge: 'マスター認定',
    area: '渋谷区・目黒区',
    intro: 'Fast Glass認定施工者。10年以上の経験を持ち、高級車ディテイリングを専門としています。お客様の愛車を最高の状態に仕上げます。',
    availableToday: true,
    topReview: { name: '田中様', car: 'レクサス RX', text: '仕上がりに感動しました。水弾きが全然違います。丁寧な作業で安心して任せられました。', rating: 5 },
    menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' },
  },
  {
    id: 2, name: '佐藤 竜', photo: null,
    rating: 5.0, reviews: 203, jobs: 518,
    specialty: '研磨',
    badge: 'グランドマスター',
    area: '新宿区・中野区',
    intro: '研磨のスペシャリスト。深い傷も丁寧に除去し、新車以上の輝きを実現。リストアプロの指名率No.1。',
    availableToday: true,
    topReview: { name: '鈴木様', car: 'BMW M3', text: '3年放置した水ジミが完全に消えました。プロの技術に脱帽です。', rating: 5 },
    menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥13,000', 'night-luster': '¥27,000', 'restore-pro': '¥65,000' },
  },
  {
    id: 3, name: '田中 空', photo: null,
    rating: 4.8, reviews: 87, jobs: 256,
    specialty: '洗車・メンテナンス',
    badge: 'エキスパート',
    area: '港区・千代田区',
    intro: '丁寧で素早い洗車が定評。忙しいビジネスマンのお客様から厚い支持をいただいています。',
    availableToday: false,
    topReview: { name: '山田様', car: 'メルセデス Cクラス', text: '毎月お願いしています。いつも期待以上の仕上がりです。', rating: 5 },
    menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' },
  },
  {
    id: 4, name: '鈴木 慶', photo: null,
    rating: 4.7, reviews: 64, jobs: 189,
    specialty: 'レストア',
    badge: 'エキスパート',
    area: '世田谷区・杉並区',
    intro: '旧車・クラシックカーのレストアが得意。塗装の状態を見極め、最適な施工プランをご提案します。',
    availableToday: true,
    topReview: { name: '伊藤様', car: 'ポルシェ 911', text: '30年前の車がここまで蘇るとは思いませんでした。素晴らしい技術です。', rating: 5 },
    menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥26,000', 'restore-pro': '¥62,000' },
  },
  {
    id: 5, name: '山本 雪', photo: null,
    rating: 4.9, reviews: 156, jobs: 401,
    specialty: 'コーティング',
    badge: 'マスター認定',
    area: '品川区・大田区',
    intro: '女性ならではの細やかな気配りと確かな技術。コーティング後のアフターフォローも丁寧に対応します。',
    availableToday: true,
    topReview: { name: '中村様', car: 'テスラ Model 3', text: '説明が丁寧で、施工前後の違いもしっかり見せてくれました。大満足です。', rating: 5 },
    menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' },
  },
];

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

// ─── TYPES ───────────────────────────────────────────────
type View = 'home' | 'list' | 'profile' | 'booking';

// ─── MAIN PAGE ───────────────────────────────────────────
export default function NagaraProPage() {
  const [view, setView] = useState<View>('home');
  const [selectedDetailer, setSelectedDetailer] = useState(detailersList[0]);
  const [selectedService, setSelectedService] = useState(services[2]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [searchArea, setSearchArea] = useState('渋谷区');
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { day: d.getDate(), weekday: ['日', '月', '火', '水', '木', '金', '土'][d.getDay()], isToday: i === 0 };
  });

  return (
    <div className="min-h-screen bg-black-deep text-white">

      {/* ═══════════════════════════════════════════════════
          HOME — トップページ
          ═══════════════════════════════════════════════════ */}
      {view === 'home' && (
        <div className="animate-fade-in">
          {/* Header */}
          <header className="px-5 md:px-10 lg:px-16 pt-4 pb-3 flex items-center justify-between max-w-6xl mx-auto">
            <h1 className="font-heading text-xl md:text-2xl font-black tracking-tight">
              NAGARA <span className="text-asura-red">PRO</span>
            </h1>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <Bell size={18} className="text-text-secondary" />
              </button>
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <User size={18} className="text-text-secondary" />
              </button>
            </div>
          </header>

          {/* Hero */}
          <section className="px-5 md:px-10 lg:px-16 py-6 md:py-10 max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-asura-red/10 via-transparent to-cyan-500/5" />
              <div className="relative">
                <p className="text-xs md:text-sm text-asura-red font-bold tracking-[0.3em] uppercase mb-2">Mobile Car Care Revolution</p>
                <h2 className="font-heading text-2xl md:text-4xl font-black leading-tight mb-3">
                  ショップ品質を、<br />
                  <span className="text-asura-red">あなたの駐車場</span>で。
                </h2>
                <p className="text-sm md:text-base text-text-secondary max-w-lg leading-relaxed mb-6">
                  プロの職人がご自宅に出張。Fast Glass認定コーティングから丁寧な手洗いまで、最高品質のカーケアをお届けします。
                </p>

                {/* Search bar */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 glass rounded-xl px-4 py-3 flex items-center gap-2">
                    <MapPin size={16} className="text-asura-red shrink-0" />
                    <select
                      className="bg-transparent text-sm w-full outline-none text-white appearance-none cursor-pointer"
                      value={searchArea}
                      onChange={(e) => setSearchArea(e.target.value)}
                    >
                      {areas.map(a => <option key={a} value={a} className="bg-black-surface">{a}</option>)}
                    </select>
                    <ChevronDown size={14} className="text-text-muted shrink-0" />
                  </div>
                  <button
                    className="bg-asura-red text-white font-heading font-bold text-sm px-6 py-3 rounded-xl glow-asura transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
                    onClick={() => setView('list')}
                  >
                    <Search size={16} />
                    職人を探す
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Categories */}
          <section className="px-5 md:px-10 lg:px-16 pb-8 max-w-6xl mx-auto">
            <h3 className="font-heading text-base md:text-lg font-bold mb-4">メニューから探す</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {services.map(svc => {
                const Icon = svc.icon;
                return (
                  <button key={svc.id}
                    className="glass rounded-2xl p-4 md:p-5 text-left group hover:border-white/20 transition-all relative overflow-hidden"
                    onClick={() => setView('list')}
                  >
                    {svc.popular && (
                      <span className="absolute top-2 right-2 text-[10px] md:text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">人気</span>
                    )}
                    <Icon size={24} className="mb-2 md:mb-3 group-hover:scale-110 transition-transform" style={{ color: svc.color }} />
                    <p className="font-heading text-sm md:text-base font-bold mb-0.5">{svc.name}</p>
                    <p className="text-xs md:text-sm text-text-muted">{svc.time} • {svc.price}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured Detailers */}
          <section className="px-5 md:px-10 lg:px-16 pb-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-base md:text-lg font-bold">おすすめの職人</h3>
              <button className="text-xs text-asura-red font-semibold flex items-center gap-0.5" onClick={() => setView('list')}>
                すべて見る <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {detailersList.slice(0, 3).map(d => (
                <button key={d.id}
                  className="glass rounded-2xl p-4 md:p-5 text-left hover:border-white/20 transition-all group"
                  onClick={() => { setSelectedDetailer(d); setView('profile'); }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-asura-red/20 to-asura-red/5 border border-asura-red/20 flex items-center justify-center">
                      <User size={22} className="text-asura-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-heading font-bold text-sm md:text-base">{d.name}</p>
                        <BadgeCheck size={14} className="text-cyan-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={11} fill="#ff0033" stroke="#ff0033" />
                        <span className="text-xs text-asura-red font-bold">{d.rating}</span>
                        <span className="text-xs text-text-muted">({d.reviews}件)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[11px] md:text-xs px-2 py-0.5 rounded-full border border-white/10 text-text-secondary">{d.specialty}</span>
                    <span className="text-[11px] md:text-xs px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-300">{d.badge}</span>
                    {d.availableToday && <span className="text-[11px] md:text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">本日空きあり</span>}
                  </div>
                  <p className="text-xs md:text-sm text-text-muted flex items-center gap-1">
                    <MapPin size={12} /> {d.area}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Trust badges */}
          <section className="px-5 md:px-10 lg:px-16 pb-10 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-5 md:p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: Shield, label: '賠償責任保険付', sub: '万が一も安心' },
                  { icon: Award, label: '認定職人のみ', sub: '厳格な審査基準' },
                  { icon: BadgeCheck, label: '認定製品使用', sub: 'Fast Glass / BASE' },
                ].map(item => (
                  <div key={item.label}>
                    <item.icon size={22} className="mx-auto mb-2 text-asura-red md:!w-7 md:!h-7" />
                    <p className="text-xs md:text-sm font-bold">{item.label}</p>
                    <p className="text-[11px] md:text-xs text-text-muted mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer tagline */}
          <div className="text-center pb-8">
            <p className="text-xs text-text-muted italic">「傷なんて磨けばいい。」</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          LIST — 職人一覧
          ═══════════════════════════════════════════════════ */}
      {view === 'list' && (
        <div className="animate-fade-in">
          <header className="px-5 md:px-10 lg:px-16 pt-4 pb-3 flex items-center gap-3 max-w-6xl mx-auto">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0" onClick={() => setView('home')}>
              <ArrowLeft size={18} className="text-text-secondary" />
            </button>
            <div className="flex-1">
              <h1 className="font-heading text-base md:text-lg font-bold">{searchArea}の職人</h1>
              <p className="text-xs md:text-sm text-text-muted">{detailersList.length}件の結果</p>
            </div>
            <div className="glass rounded-xl px-3 py-2 flex items-center gap-1.5">
              <MapPin size={12} className="text-asura-red" />
              <span className="text-xs font-semibold">{searchArea}</span>
            </div>
          </header>

          {/* Sort / Filter */}
          <div className="px-5 md:px-10 lg:px-16 pb-3 max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['おすすめ順', '評価順', '口コミ数順', '本日空きあり'].map((f, i) => (
                <button key={f} className={`text-xs md:text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${i === 0 ? 'bg-asura-red/20 text-asura-red border border-asura-red/30' : 'glass text-text-secondary'
                  }`}>{f}</button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="px-5 md:px-10 lg:px-16 pb-8 max-w-6xl mx-auto space-y-3 md:space-y-4">
            {detailersList.map((d, idx) => (
              <button key={d.id}
                className="w-full text-left glass rounded-2xl p-4 md:p-6 hover:border-white/20 transition-all group animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={() => { setSelectedDetailer(d); setView('profile'); }}
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-asura-red/20 to-asura-red/5 border border-asura-red/20 flex items-center justify-center shrink-0">
                    <User size={28} className="text-asura-red md:!w-9 md:!h-9" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading font-bold text-base md:text-lg">{d.name}</h3>
                        <BadgeCheck size={15} className="text-cyan-400" />
                      </div>
                      <button className="p-1" onClick={(e) => { e.stopPropagation(); toggleLike(d.id); }}>
                        <Heart size={18} className={likedIds.includes(d.id) ? 'text-asura-red fill-asura-red' : 'text-text-muted'} />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.floor(d.rating) ? '#ff0033' : 'transparent'} stroke="#ff0033" />
                        ))}
                      </div>
                      <span className="text-xs text-asura-red font-bold">{d.rating}</span>
                      <span className="text-xs text-text-secondary">({d.reviews}件の口コミ)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full border border-white/10 text-text-secondary">{d.specialty}</span>
                      <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 text-cyan-300">{d.badge}</span>
                      {d.availableToday && <span className="text-[11px] md:text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">本日空きあり</span>}
                    </div>

                    {/* Area and intro */}
                    <p className="text-xs md:text-sm text-text-muted mb-1.5 flex items-center gap-1">
                      <MapPin size={12} /> {d.area}
                    </p>
                    <p className="text-xs md:text-sm text-text-secondary">{d.intro}</p>

                    {/* Top review snippet */}
                    <div className="mt-2 glass rounded-lg p-2.5 md:p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <ThumbsUp size={10} className="text-cyan-400" />
                        <span className="text-[11px] md:text-xs text-cyan-400 font-semibold">注目の口コミ</span>
                      </div>
                      <p className="text-xs md:text-sm text-text-secondary">&ldquo;{d.topReview.text}&rdquo;</p>
                      <p className="text-[11px] text-text-muted mt-0.5">{d.topReview.name} • {d.topReview.car}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          PROFILE — 職人プロフィール
          ═══════════════════════════════════════════════════ */}
      {view === 'profile' && (
        <div className="animate-fade-in">
          <header className="px-5 md:px-10 lg:px-16 pt-4 pb-3 flex items-center gap-3 max-w-4xl mx-auto">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0" onClick={() => setView('list')}>
              <ArrowLeft size={18} className="text-text-secondary" />
            </button>
            <h1 className="font-heading text-base md:text-lg font-bold flex-1">職人プロフィール</h1>
            <button className="p-2" onClick={() => toggleLike(selectedDetailer.id)}>
              <Heart size={20} className={likedIds.includes(selectedDetailer.id) ? 'text-asura-red fill-asura-red' : 'text-text-muted'} />
            </button>
          </header>

          <div className="max-w-4xl mx-auto">
            {/* Profile header */}
            <div className="px-5 md:px-10 pb-6">
              <div className="glass rounded-3xl p-5 md:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-asura-red/20 to-asura-red/5 border border-asura-red/20 flex items-center justify-center shrink-0">
                    <User size={36} className="text-asura-red md:!w-12 md:!h-12" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <h2 className="font-heading text-xl md:text-2xl font-black">{selectedDetailer.name}</h2>
                      <BadgeCheck size={18} className="text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={14} fill="#ff0033" stroke="#ff0033" />
                        <span className="text-sm text-asura-red font-bold">{selectedDetailer.rating}</span>
                        <span className="text-xs text-text-secondary">({selectedDetailer.reviews}件)</span>
                      </div>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{selectedDetailer.jobs}件の施工実績</span>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-3">
                      <span className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-white/10 text-text-secondary">{selectedDetailer.specialty}</span>
                      <span className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-cyan-500/20 text-cyan-300">{selectedDetailer.badge}</span>
                      <span className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-white/10 text-text-secondary flex items-center gap-1"><MapPin size={12} />{selectedDetailer.area}</span>
                    </div>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{selectedDetailer.intro}</p>

                    <div className="flex gap-2 mt-4">
                      <button className="glass rounded-xl px-4 py-2 flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                        <Phone size={14} /> 電話
                      </button>
                      <button className="glass rounded-xl px-4 py-2 flex items-center gap-1.5 text-xs font-semibold text-plasma-blue">
                        <MessageCircle size={14} /> メッセージ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="px-5 md:px-10 pb-6">
              <h3 className="font-heading text-sm md:text-base font-bold mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-asura-red" /> メニュー・料金
              </h3>
              <div className="space-y-2">
                {services.map(svc => {
                  const Icon = svc.icon;
                  const price = selectedDetailer.menuPrices[svc.id as keyof typeof selectedDetailer.menuPrices];
                  return (
                    <button key={svc.id}
                      className={`w-full text-left glass rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4 transition-all hover:border-white/20 group ${svc.popular ? 'ring-1 ring-cyan-400/20' : ''
                        }`}
                      onClick={() => { setSelectedService(svc); setView('booking'); setBookingComplete(false); setSelectedDate(null); setSelectedTime(null); }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${svc.color}10`, border: `1px solid ${svc.color}20` }}>
                        <Icon size={18} style={{ color: svc.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-heading font-bold text-sm md:text-base">{svc.name}</p>
                          {svc.popular && <span className="text-[10px] md:text-xs bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded-full font-bold">人気</span>}
                        </div>
                        <p className="text-xs md:text-sm text-text-secondary mt-0.5">{svc.time} • {svc.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-heading font-bold text-sm md:text-base" style={{ color: svc.color }}>{price}</p>
                        <p className="text-[11px] md:text-xs text-text-muted group-hover:text-asura-red transition-colors">予約する →</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="px-5 md:px-10 pb-8">
              <h3 className="font-heading text-sm md:text-base font-bold mb-3 flex items-center gap-2">
                <Star size={16} className="text-asura-red" /> 口コミ ({selectedDetailer.reviews}件)
              </h3>
              <div className="glass rounded-2xl p-4 md:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-heading text-3xl font-black text-asura-red">{selectedDetailer.rating}</span>
                  <div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#ff0033" stroke="#ff0033" />)}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{selectedDetailer.reviews}件の口コミ</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      {[...Array(selectedDetailer.topReview.rating)].map((_, i) => <Star key={i} size={10} fill="#ff0033" stroke="#ff0033" />)}
                    </div>
                    <span className="text-xs text-text-secondary">{selectedDetailer.topReview.name} • {selectedDetailer.topReview.car}</span>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">&ldquo;{selectedDetailer.topReview.text}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          BOOKING — 予約確認
          ═══════════════════════════════════════════════════ */}
      {view === 'booking' && (
        <div className="animate-fade-in">
          <header className="px-5 md:px-10 lg:px-16 pt-4 pb-3 flex items-center gap-3 max-w-4xl mx-auto">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0" onClick={() => setView('profile')}>
              <ArrowLeft size={18} className="text-text-secondary" />
            </button>
            <h1 className="font-heading text-base md:text-lg font-bold flex-1">予約</h1>
          </header>

          {!bookingComplete ? (
            <div className="max-w-4xl mx-auto">
              {/* Selected service & detailer */}
              <div className="px-5 md:px-10 pb-4">
                <div className="glass rounded-2xl p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-asura-red/20 border border-asura-red/20 flex items-center justify-center">
                      <User size={18} className="text-asura-red" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm md:text-base">{selectedDetailer.name}</p>
                      <p className="text-xs md:text-sm text-text-secondary flex items-center gap-1"><Star size={10} fill="#ff0033" stroke="#ff0033" />{selectedDetailer.rating} • {selectedDetailer.area}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <selectedService.icon size={16} style={{ color: selectedService.color }} />
                      <div>
                        <p className="text-sm font-bold">{selectedService.name}</p>
                        <p className="text-xs text-text-secondary">{selectedService.time}</p>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-base" style={{ color: selectedService.color }}>
                      {selectedDetailer.menuPrices[selectedService.id as keyof typeof selectedDetailer.menuPrices]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date selection */}
              <div className="px-5 md:px-10 pb-4">
                <h3 className="font-heading text-sm md:text-base font-bold mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-asura-red" /> 日付を選択
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {dates.map((d, i) => (
                    <button key={i}
                      className={`flex flex-col items-center px-3.5 md:px-5 py-3 md:py-4 rounded-xl transition-all shrink-0 ${selectedDate === i ? 'bg-asura-red glow-asura text-white' : 'glass text-text-secondary hover:border-white/20'
                        }`}
                      onClick={() => setSelectedDate(i)}
                    >
                      <span className={`text-xs md:text-sm mb-1 ${selectedDate === i ? 'text-white/80' : 'text-text-muted'}`}>
                        {d.isToday ? '今日' : d.weekday}
                      </span>
                      <span className="font-heading font-bold text-lg md:text-xl">{d.day}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              {selectedDate !== null && (
                <div className="px-5 md:px-10 pb-6 animate-fade-in-up">
                  <h3 className="font-heading text-sm md:text-base font-bold mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-asura-red" /> 時間を選択
                  </h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {timeSlots.map(t => {
                      const available = Math.random() > 0.3;
                      return (
                        <button key={t}
                          className={`py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all ${selectedTime === t ? 'bg-asura-red text-white glow-asura' :
                            available ? 'glass text-text-secondary hover:border-white/20' : 'glass text-text-muted/30 cursor-not-allowed opacity-40'
                            }`}
                          onClick={() => available && setSelectedTime(t)}
                          disabled={!available}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Insurance note */}
              <div className="px-5 md:px-10 pb-4">
                <div className="glass rounded-xl p-3 md:p-4 flex items-start gap-2.5">
                  <Shield size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-cyan-400">賠償責任保険付き</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-0.5">施設所有者賠償責任保険・自動車管理者賠償責任保険に加入しています。万が一の際も安心です。</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 md:px-10 pb-8">
                <button
                  className={`w-full font-heading font-bold text-sm md:text-base py-3.5 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${selectedDate !== null && selectedTime
                    ? 'bg-asura-red text-white glow-asura hover:scale-[1.02] active:scale-[0.98]'
                    : 'glass text-text-muted cursor-not-allowed'
                    }`}
                  disabled={selectedDate === null || !selectedTime}
                  onClick={() => setBookingComplete(true)}
                >
                  <Check size={18} />
                  予約を確定する
                </button>
              </div>
            </div>
          ) : (
            /* Booking Complete */
            <div className="max-w-4xl mx-auto px-5 md:px-10 py-16 text-center animate-fade-in-up">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <Check size={36} className="text-green-400 md:!w-12 md:!h-12" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-black mb-2">予約が確定しました！</h2>
              <p className="text-sm md:text-base text-text-secondary mb-8">
                {selectedDetailer.name}さんが{dates[selectedDate || 0]?.day}日 {selectedTime}にお伺いします。
              </p>
              <div className="glass rounded-2xl p-5 md:p-6 text-left mb-6 max-w-md mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">職人</span>
                    <span className="text-sm font-bold">{selectedDetailer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">メニュー</span>
                    <span className="text-sm font-bold">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">日時</span>
                    <span className="text-sm font-bold">{dates[selectedDate || 0]?.day}日 ({dates[selectedDate || 0]?.weekday}) {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">施工時間</span>
                    <span className="text-sm font-bold">{selectedService.time}</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between">
                    <span className="text-sm font-bold">合計</span>
                    <span className="text-sm font-bold text-asura-red">{selectedDetailer.menuPrices[selectedService.id as keyof typeof selectedDetailer.menuPrices]}</span>
                  </div>
                </div>
              </div>
              <button
                className="bg-asura-red text-white font-heading font-bold text-sm md:text-base px-8 py-3.5 rounded-xl glow-asura transition-all hover:scale-[1.02]"
                onClick={() => { setView('home'); setBookingComplete(false); }}
              >
                トップに戻る
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
