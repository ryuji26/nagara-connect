'use client';

import React, { useState } from 'react';
import {
  MapPin, Search, Star, Clock, Shield, ChevronRight,
  Droplets, Sparkles, Zap, Check, User, Calendar,
  ArrowLeft, Diamond, Heart, ThumbsUp, Award, BadgeCheck,
  Phone, MessageCircle, ChevronDown, Crown
} from 'lucide-react';

const services = [
  { id: 'quick-wash', name: 'クイックウォッシュ', time: '約30分', price: '¥4,400~', description: 'スノーフォームによるノータッチ洗車。室内拭き上げ付。', icon: Droplets, color: '#1a3a8f', bgColor: '#e8edf8', image: '/images/quick-wash.png' },
  { id: 'skin-improvement', name: '肌改善スタンダード', time: '約60分', price: '¥12,000~', description: 'BASE（下地処理剤）で傷埋め＋表面安定化。見違えるような艶に。', icon: Sparkles, color: '#c9a96e', bgColor: '#f8f3eb', image: '/images/skin-improvement.png' },
  { id: 'night-luster', name: 'ナイトラスタープレミアム', time: '約110分', price: '¥25,000~', description: '旗艦サービス。Fast Glass（2時間硬化ガラスコーティング）で究極の鏡面仕上げ。', icon: Diamond, color: '#1a3a8f', bgColor: '#e8edf8', popular: true, image: '/images/night-luster.png' },
  { id: 'restore-pro', name: 'リストアプロ', time: '約3.5時間', price: '¥60,000~', description: '深い傷や経年劣化を精密に復元。新車以上の輝きを取り戻す最高峰。', icon: Zap, color: '#c9a96e', bgColor: '#f8f3eb', image: '/images/restore-pro.png' },
];

const areas = ['渋谷区', '新宿区', '港区', '世田谷区', '目黒区', '品川区'];

const detailersList = [
  { id: 1, name: '高橋 匠', rating: 4.9, reviews: 128, jobs: 342, specialty: 'コーティング', badge: 'マスター認定', area: '渋谷区・目黒区', intro: 'Fast Glass認定施工者。10年以上の経験を持ち、高級車ディテイリングを専門としています。', availableToday: true, topReview: { name: '田中様', car: 'レクサス RX', text: '仕上がりに感動しました。水弾きが全然違います。丁寧な作業で安心して任せられました。', rating: 5 }, menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' } },
  { id: 2, name: '佐藤 竜', rating: 5.0, reviews: 203, jobs: 518, specialty: '研磨', badge: 'グランドマスター', area: '新宿区・中野区', intro: '研磨のスペシャリスト。深い傷も丁寧に除去し、新車以上の輝きを実現。', availableToday: true, topReview: { name: '鈴木様', car: 'BMW M3', text: '3年放置した水ジミが完全に消えました。プロの技術に脱帽です。', rating: 5 }, menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥13,000', 'night-luster': '¥27,000', 'restore-pro': '¥65,000' } },
  { id: 3, name: '田中 空', rating: 4.8, reviews: 87, jobs: 256, specialty: '洗車・メンテナンス', badge: 'エキスパート', area: '港区・千代田区', intro: '丁寧で素早い洗車が定評。忙しいビジネスマンから厚い支持。', availableToday: false, topReview: { name: '山田様', car: 'メルセデス Cクラス', text: '毎月お願いしています。いつも期待以上の仕上がりです。', rating: 5 }, menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' } },
  { id: 4, name: '鈴木 慶', rating: 4.7, reviews: 64, jobs: 189, specialty: 'レストア', badge: 'エキスパート', area: '世田谷区・杉並区', intro: '旧車・クラシックカーのレストアが得意。最適な施工プランをご提案。', availableToday: true, topReview: { name: '伊藤様', car: 'ポルシェ 911', text: '30年前の車がここまで蘇るとは。素晴らしい技術です。', rating: 5 }, menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥26,000', 'restore-pro': '¥62,000' } },
  { id: 5, name: '山本 雪', rating: 4.9, reviews: 156, jobs: 401, specialty: 'コーティング', badge: 'マスター認定', area: '品川区・大田区', intro: '女性ならではの細やかな気配りと確かな技術。アフターフォローも丁寧。', availableToday: true, topReview: { name: '中村様', car: 'テスラ Model 3', text: '説明が丁寧で、施工前後の違いもしっかり見せてくれました。', rating: 5 }, menuPrices: { 'quick-wash': '¥4,400', 'skin-improvement': '¥12,000', 'night-luster': '¥25,000', 'restore-pro': '¥60,000' } },
];

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
type View = 'home' | 'list' | 'profile' | 'booking';

export default function NagaraProPage() {
  const [view, setView] = useState<View>('home');
  const [selectedDetailer, setSelectedDetailer] = useState(detailersList[0]);
  const [selectedService, setSelectedService] = useState(services[2]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [searchArea, setSearchArea] = useState('渋谷区');
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const toggleLike = (id: number) => setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const dates = Array.from({ length: 7 }).map((_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return { day: d.getDate(), weekday: ['日', '月', '火', '水', '木', '金', '土'][d.getDay()], isToday: i === 0 }; });

  const Stars5 = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(rating) ? '#e8a838' : '#e2e5ec'} stroke={i < Math.floor(rating) ? '#e8a838' : '#e2e5ec'} />)}</div>
  );

  return (
    <div className="min-h-screen bg-bg text-text-primary">

      {/* ═══ HOME ═══ */}
      {view === 'home' && (
        <div className="animate-fade-in">
          {/* Header */}
          <header className="px-6 md:px-12 lg:px-20 pt-5 pb-4 flex items-center justify-between max-w-[1600px] mx-auto">
            <h1 className="font-heading text-xl md:text-2xl font-black tracking-tight">
              NAGARA <span className="text-primary font-display italic">PRO</span>
            </h1>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-2xl border border-border flex items-center justify-center hover:bg-bg-secondary transition-all hover:shadow-md"><User size={17} className="text-text-muted" /></button>
            </div>
          </header>

          {/* Hero */}
          <section className="px-6 md:px-12 lg:px-20 py-6 md:py-12 max-w-[1600px] mx-auto">
            <div className="relative rounded-[28px] overflow-hidden">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b3d] via-[#162a5e] to-[#1a3a8f]" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,169,110,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)' }} />
              <div className="absolute top-6 right-8 w-72 h-72 rounded-full bg-accent-gold/5 blur-3xl animate-float" />

              <div className="relative px-8 md:px-14 py-14 md:py-20 text-center">
                {/* Gold accent line */}
                <div className="w-12 h-[3px] bg-gradient-to-r from-accent-gold to-accent-gold-dark rounded-full mb-5 mx-auto" />
                <p className="text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-3 text-accent-gold">Mobile Car Care Revolution</p>
                <h2 className="font-heading text-3xl md:text-5xl font-black leading-[1.15] mb-4 text-white">
                  ショップ品質を、<br />
                  <span className="text-accent-gold">あなたの駐車場</span>で。
                </h2>
                <p className="text-sm md:text-base text-blue-200/80 max-w-2xl mx-auto leading-relaxed mb-8">
                  プロの職人がご自宅に出張。Fast Glass認定コーティングから丁寧な手洗いまで、最高品質のカーケアをお届けします。
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3.5 flex items-center gap-2.5 border border-white/15 min-w-[200px]">
                    <MapPin size={16} className="text-accent-gold shrink-0" />
                    <select className="bg-transparent text-sm w-full outline-none text-white appearance-none cursor-pointer" value={searchArea} onChange={(e) => setSearchArea(e.target.value)}>
                      {areas.map(a => <option key={a} value={a} className="text-text-primary bg-white">{a}</option>)}
                    </select>
                    <ChevronDown size={14} className="text-white/50 shrink-0" />
                  </div>
                  <button className="bg-accent-gold hover:bg-accent-gold-dark text-white font-heading font-bold text-sm px-7 py-3.5 rounded-2xl transition-all active:scale-[0.97] flex items-center justify-center gap-2 shrink-0 shadow-lg hover:shadow-xl" onClick={() => setView('list')}>
                    <Search size={16} />職人を探す
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Categories */}
          <section className="px-6 md:px-12 lg:px-20 pb-10 max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-1">Services</p>
                <h3 className="font-heading text-lg md:text-xl font-bold">メニューから探す</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map(svc => {
                return (
                  <button key={svc.id} className={`card text-left group overflow-hidden ${svc.popular ? 'ring-2 ring-primary/15' : ''}`} onClick={() => setView('list')}>
                    {/* Image */}
                    <div className="relative h-36 md:h-44 overflow-hidden">
                      <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {svc.popular && <span className="badge badge-gold absolute top-3 left-3 shadow-md"><Crown size={10} />人気</span>}
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="font-heading text-sm md:text-base font-bold mb-1">{svc.name}</p>
                      <p className="text-xs md:text-sm text-text-muted leading-relaxed">{svc.time} • {svc.price}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured Detailers */}
          <section className="px-6 md:px-12 lg:px-20 pb-10 max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-1">Professionals</p>
                <h3 className="font-heading text-lg md:text-xl font-bold">おすすめの職人</h3>
              </div>
              <button className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:underline" onClick={() => setView('list')}>すべて見る <ChevronRight size={14} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {detailersList.slice(0, 3).map(d => (
                <button key={d.id} className="card p-6 md:p-7 text-left group" onClick={() => { setSelectedDetailer(d); setView('profile'); }}>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-primary-subtle flex items-center justify-center">
                      <User size={22} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5"><p className="font-heading font-bold text-sm md:text-base">{d.name}</p><BadgeCheck size={14} className="text-primary shrink-0" /></div>
                      <div className="flex items-center gap-1 mt-0.5"><Star size={12} fill="#e8a838" stroke="#e8a838" /><span className="text-xs text-star font-bold">{d.rating}</span><span className="text-xs text-text-muted">({d.reviews}件)</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="badge badge-neutral">{d.specialty}</span>
                    <span className="badge badge-primary">{d.badge}</span>
                    {d.availableToday && <span className="badge badge-success">本日空きあり</span>}
                  </div>
                  <p className="text-xs text-text-muted flex items-center gap-1"><MapPin size={12} />{d.area}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Trust badges */}
          <section className="px-6 md:px-12 lg:px-20 pb-12 max-w-[1600px] mx-auto">
            <div className="card-gold p-8 md:p-10">
              <div className="text-center mb-6">
                <p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-1">Trust & Quality</p>
                <h3 className="font-heading text-base md:text-lg font-bold">安心と品質のお約束</h3>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { icon: Shield, label: '賠償責任保険付', sub: '万が一も安心' },
                  { icon: Award, label: '認定職人のみ', sub: '厳格な審査基準' },
                  { icon: BadgeCheck, label: '認定製品使用', sub: 'Fast Glass / BASE' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/60 flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <item.icon size={22} className="text-accent-gold md:!w-6 md:!h-6" />
                    </div>
                    <p className="text-xs md:text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="text-center pb-10">
            <div className="divider-gold w-16 mx-auto mb-4" />
            <p className="text-sm text-text-muted font-display italic tracking-wide">&ldquo;傷なんて磨けばいい。&rdquo;</p>
          </div>
        </div>
      )}

      {/* ═══ LIST ═══ */}
      {view === 'list' && (
        <div className="animate-fade-in">
          <header className="px-6 md:px-12 lg:px-20 pt-5 pb-4 flex items-center gap-3 max-w-[1600px] mx-auto">
            <button className="w-10 h-10 rounded-2xl border border-border flex items-center justify-center shrink-0 hover:bg-bg-secondary transition-all" onClick={() => setView('home')}><ArrowLeft size={17} className="text-text-secondary" /></button>
            <div className="flex-1">
              <h1 className="font-heading text-base md:text-lg font-bold">{searchArea}の職人</h1>
              <p className="text-xs text-text-muted">{detailersList.length}件の結果</p>
            </div>
          </header>

          <div className="px-6 md:px-12 lg:px-20 pb-3 max-w-[1600px] mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {['おすすめ順', '評価順', '口コミ数順', '本日空きあり'].map((f, i) => (
                <button key={f} className={`text-xs px-5 py-2.5 rounded-full whitespace-nowrap transition-all border font-semibold ${i === 0 ? 'btn-primary !rounded-full' : 'bg-white text-text-secondary border-border hover:border-primary/30'}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="px-6 md:px-12 lg:px-20 pb-10 max-w-[1600px] mx-auto space-y-4">
            {detailersList.map((d, idx) => (
              <button key={d.id} className="w-full text-left card p-6 md:p-8 group animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }} onClick={() => { setSelectedDetailer(d); setView('profile'); }}>
                <div className="flex gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary-light to-primary-subtle flex items-center justify-center shrink-0">
                    <User size={28} className="text-primary md:!w-9 md:!h-9" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5"><h3 className="font-heading font-bold text-base md:text-lg">{d.name}</h3><BadgeCheck size={15} className="text-primary" /></div>
                      <button className="p-1.5" onClick={(e) => { e.stopPropagation(); toggleLike(d.id); }}><Heart size={18} className={likedIds.includes(d.id) ? 'text-nagara-red fill-nagara-red' : 'text-text-muted'} /></button>
                    </div>
                    <div className="flex items-center gap-2 mb-3"><Stars5 rating={d.rating} /><span className="text-xs text-star font-bold">{d.rating}</span><span className="text-xs text-text-muted">({d.reviews}件)</span></div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="badge badge-neutral">{d.specialty}</span>
                      <span className="badge badge-primary">{d.badge}</span>
                      {d.availableToday && <span className="badge badge-success">本日空きあり</span>}
                    </div>
                    <p className="text-xs text-text-muted mb-2 flex items-center gap-1"><MapPin size={12} />{d.area}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{d.intro}</p>
                    <div className="mt-4 bg-bg-secondary rounded-2xl p-4 border border-border-light">
                      <div className="flex items-center gap-1.5 mb-1.5"><ThumbsUp size={12} className="text-primary" /><span className="text-xs text-primary font-semibold">注目の口コミ</span></div>
                      <p className="text-sm text-text-secondary">&ldquo;{d.topReview.text}&rdquo;</p>
                      <p className="text-xs text-text-muted mt-1.5">{d.topReview.name} • {d.topReview.car}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ PROFILE ═══ */}
      {view === 'profile' && (
        <div className="animate-fade-in">
          <header className="px-6 md:px-12 lg:px-20 pt-5 pb-4 flex items-center gap-3 max-w-[1600px] mx-auto">
            <button className="w-10 h-10 rounded-2xl border border-border flex items-center justify-center shrink-0 hover:bg-bg-secondary transition-all" onClick={() => setView('list')}><ArrowLeft size={17} className="text-text-secondary" /></button>
            <h1 className="font-heading text-base md:text-lg font-bold flex-1">職人プロフィール</h1>
            <button className="p-2" onClick={() => toggleLike(selectedDetailer.id)}><Heart size={20} className={likedIds.includes(selectedDetailer.id) ? 'text-nagara-red fill-nagara-red' : 'text-text-muted'} /></button>
          </header>

          <div className="max-w-[1600px] mx-auto">
            <div className="px-6 md:px-12 pb-6">
              <div className="card p-7 md:p-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-7">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary-light to-primary-subtle flex items-center justify-center shrink-0 shadow-md">
                    <User size={36} className="text-primary md:!w-12 md:!h-12" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                      <h2 className="font-heading text-2xl md:text-3xl font-black">{selectedDetailer.name}</h2>
                      <BadgeCheck size={20} className="text-primary" />
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                      <div className="flex items-center gap-1"><Stars5 rating={selectedDetailer.rating} /><span className="text-sm text-star font-bold ml-1">{selectedDetailer.rating}</span><span className="text-xs text-text-muted">({selectedDetailer.reviews}件)</span></div>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted">{selectedDetailer.jobs}件施工</span>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                      <span className="badge badge-neutral">{selectedDetailer.specialty}</span>
                      <span className="badge badge-gold">{selectedDetailer.badge}</span>
                      <span className="badge badge-neutral"><MapPin size={10} />{selectedDetailer.area}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{selectedDetailer.intro}</p>
                    <div className="flex gap-2.5 mt-5">
                      <button className="border border-border rounded-2xl px-5 py-2.5 flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:bg-bg-secondary transition-all"><Phone size={14} /> 電話</button>
                      <button className="border border-primary/20 bg-primary-subtle rounded-2xl px-5 py-2.5 flex items-center gap-1.5 text-sm font-semibold text-primary hover:bg-primary-light transition-all"><MessageCircle size={14} /> メッセージ</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="px-6 md:px-12 pb-6">
              <div className="flex items-end justify-between mb-4">
                <div><p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-0.5">Menu</p><h3 className="font-heading text-base md:text-lg font-bold">メニュー・料金</h3></div>
              </div>
              <div className="space-y-3">
                {services.map(svc => {
                  const Icon = svc.icon;
                  const price = selectedDetailer.menuPrices[svc.id as keyof typeof selectedDetailer.menuPrices];
                  return (
                    <button key={svc.id} className={`w-full text-left card p-5 md:p-7 flex items-center gap-4 md:gap-5 group ${svc.popular ? 'ring-2 ring-accent-gold/20 card-gold' : ''}`} onClick={() => { setSelectedService(svc); setView('booking'); setBookingComplete(false); setSelectedDate(null); setSelectedTime(null); }}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: svc.bgColor }}><Icon size={20} style={{ color: svc.color }} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-heading font-bold text-sm md:text-base">{svc.name}</p>
                          {svc.popular && <span className="badge badge-gold text-[0.65rem]"><Crown size={10} />人気</span>}
                        </div>
                        <p className="text-xs md:text-sm text-text-muted mt-0.5">{svc.time} • {svc.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-heading font-bold text-sm md:text-lg text-primary">{price}</p>
                        <p className="text-xs text-text-muted group-hover:text-primary transition-colors">予約 →</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="px-6 md:px-12 pb-10">
              <div className="flex items-end justify-between mb-4">
                <div><p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-0.5">Reviews</p><h3 className="font-heading text-base md:text-lg font-bold">口コミ ({selectedDetailer.reviews}件)</h3></div>
              </div>
              <div className="card p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-display text-4xl md:text-5xl font-black text-star italic">{selectedDetailer.rating}</span>
                  <div><Stars5 rating={selectedDetailer.rating} /><p className="text-xs text-text-muted mt-1">{selectedDetailer.reviews}件の口コミ</p></div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Stars5 rating={selectedDetailer.topReview.rating} />
                    <span className="text-xs text-text-muted">{selectedDetailer.topReview.name} • {selectedDetailer.topReview.car}</span>
                  </div>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">&ldquo;{selectedDetailer.topReview.text}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ BOOKING ═══ */}
      {view === 'booking' && (
        <div className="animate-fade-in">
          <header className="px-6 md:px-12 lg:px-20 pt-5 pb-4 flex items-center gap-3 max-w-[1600px] mx-auto">
            <button className="w-10 h-10 rounded-2xl border border-border flex items-center justify-center shrink-0 hover:bg-bg-secondary transition-all" onClick={() => setView('profile')}><ArrowLeft size={17} className="text-text-secondary" /></button>
            <h1 className="font-heading text-base md:text-lg font-bold flex-1">予約</h1>
          </header>

          {!bookingComplete ? (
            <div className="max-w-[1600px] mx-auto">
              <div className="px-6 md:px-12 pb-5">
                <div className="card p-6 md:p-7">
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-light to-primary-subtle flex items-center justify-center"><User size={18} className="text-primary" /></div>
                    <div><p className="font-heading font-bold text-sm md:text-base">{selectedDetailer.name}</p><p className="text-xs text-text-muted flex items-center gap-1"><Star size={10} fill="#e8a838" stroke="#e8a838" />{selectedDetailer.rating} • {selectedDetailer.area}</p></div>
                  </div>
                  <div className="border-t border-border pt-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5"><selectedService.icon size={16} style={{ color: selectedService.color }} /><div><p className="text-sm font-bold">{selectedService.name}</p><p className="text-xs text-text-muted">{selectedService.time}</p></div></div>
                    <span className="font-heading font-bold text-lg text-primary">{selectedDetailer.menuPrices[selectedService.id as keyof typeof selectedDetailer.menuPrices]}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-12 pb-5">
                <div className="flex items-end mb-3"><div><p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-0.5">Date</p><h3 className="font-heading text-sm md:text-base font-bold">日付を選択</h3></div></div>
                <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
                  {dates.map((d, i) => (
                    <button key={i} className={`flex flex-col items-center px-5 py-4 rounded-2xl transition-all shrink-0 border font-heading ${selectedDate === i ? 'btn-primary !rounded-2xl border-transparent' : 'bg-white text-text-secondary border-border hover:border-primary/30 hover:shadow-md'}`} onClick={() => setSelectedDate(i)}>
                      <span className={`text-xs mb-1 font-body ${selectedDate === i ? 'text-blue-200' : 'text-text-muted'}`}>{d.isToday ? '今日' : d.weekday}</span>
                      <span className="font-bold text-xl">{d.day}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate !== null && (
                <div className="px-6 md:px-12 pb-6 animate-fade-in-up">
                  <div className="flex items-end mb-3"><div><p className="text-xs font-bold text-accent-gold tracking-[0.2em] uppercase mb-0.5">Time</p><h3 className="font-heading text-sm md:text-base font-bold">時間を選択</h3></div></div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5">
                    {timeSlots.map(t => {
                      const available = Math.random() > 0.3;
                      return (
                        <button key={t} className={`py-3 rounded-2xl text-sm font-semibold transition-all border ${selectedTime === t ? 'btn-primary !rounded-2xl border-transparent' : available ? 'bg-white text-text-secondary border-border hover:border-primary/30 hover:shadow-md' : 'bg-bg-secondary text-text-muted/40 border-transparent cursor-not-allowed'}`} onClick={() => available && setSelectedTime(t)} disabled={!available}>{t}</button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="px-6 md:px-12 pb-5">
                <div className="card-gold p-5 md:p-6 flex items-start gap-3">
                  <Shield size={20} className="text-accent-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-accent-gold-dark">賠償責任保険付き</p>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">施設所有者賠償責任保険・自動車管理者賠償責任保険に加入。万が一の際も安心です。</p>
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-12 pb-10">
                <button className={`w-full font-heading font-bold text-base py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${selectedDate !== null && selectedTime ? 'btn-primary' : 'bg-bg-secondary text-text-muted cursor-not-allowed border border-border'}`} disabled={selectedDate === null || !selectedTime} onClick={() => setBookingComplete(true)}>
                  <Check size={18} />予約を確定する
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 text-center animate-fade-in-up">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-success-light to-emerald-50 border-2 border-success/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Check size={36} className="text-success md:!w-12 md:!h-12" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-black mb-2">予約が確定しました！</h2>
              <p className="text-sm md:text-base text-text-secondary mb-8">{selectedDetailer.name}さんが{dates[selectedDate || 0]?.day}日 {selectedTime}にお伺いします。</p>
              <div className="card p-7 md:p-9 text-left mb-8 max-w-md mx-auto">
                <div className="space-y-4">
                  {[
                    ['職人', selectedDetailer.name],
                    ['メニュー', selectedService.name],
                    ['日時', `${dates[selectedDate || 0]?.day}日 (${dates[selectedDate || 0]?.weekday}) ${selectedTime}`],
                    ['施工時間', selectedService.time],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between"><span className="text-sm text-text-muted">{label}</span><span className="text-sm font-bold">{val}</span></div>
                  ))}
                  <div className="divider-gold" />
                  <div className="flex justify-between">
                    <span className="text-base font-bold">合計</span>
                    <span className="text-lg font-black text-primary">{selectedDetailer.menuPrices[selectedService.id as keyof typeof selectedDetailer.menuPrices]}</span>
                  </div>
                </div>
              </div>
              <button className="btn-primary font-heading font-bold text-sm md:text-base px-10 py-4 rounded-2xl" onClick={() => { setView('home'); setBookingComplete(false); }}>トップに戻る</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
