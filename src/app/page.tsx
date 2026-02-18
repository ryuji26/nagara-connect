'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import { StarIcon, GlossIcon, WaterRepellentIcon, CoatingIcon } from '@/components/ui/BrandIcons';

const nearbyPartners = [
  { name: 'TAKA', style: 'スピード重視型', rating: 4.9, reviews: 128, distance: '1.2km', badge: 'gold', specialties: ['コーティング', '研磨'] },
  { name: 'RYU', style: 'こだわり仕上げ型', rating: 4.8, reviews: 95, distance: '2.5km', badge: 'silver', specialties: ['洗浄', 'コーティング'] },
  { name: 'SORA', style: 'オールラウンダー', rating: 4.7, reviews: 67, distance: '3.1km', badge: 'gold', specialties: ['研磨', '洗浄'] },
  { name: 'KEI', style: 'コーティング特化', rating: 5.0, reviews: 42, distance: '4.0km', badge: 'master', specialties: ['コーティング'] },
];

const recentHistory = [
  { date: '2/15', car: 'レクサス RX', service: 'プレミアム洗車', partner: 'TAKA', status: '完了' },
  { date: '2/8', car: 'BMW 3シリーズ', service: 'コーティングメンテ', partner: 'RYU', status: '完了' },
];

const products = [
  { name: '阿修羅', desc: '究極のツヤ出し', icon: 'gloss' },
  { name: 'スノーシャンプー', desc: '泡洗浄の極み', icon: 'water' },
  { name: 'プラズマ', desc: '最強撥水コート', icon: 'coating' },
];

function getBadgeStyle(badge: string) {
  switch (badge) {
    case 'master': return 'badge-master';
    case 'gold': return 'badge-gold';
    case 'silver': return 'badge-silver';
    default: return 'badge-bronze';
  }
}

function getBadgeLabel(badge: string) {
  switch (badge) {
    case 'master': return 'MASTER';
    case 'gold': return 'GOLD';
    case 'silver': return 'SILVER';
    default: return 'BRONZE';
  }
}

export default function HomePage() {
  return (
    <div className="pb-24">
      <Header />

      {/* Hero Section */}
      <div className="px-5 pt-5 pb-4">
        <div className="glass-card-green p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#00e676" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" stroke="#00e676" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" stroke="#00e676" strokeWidth="0.5" />
            </svg>
          </div>
          <p className="text-nagara-gray-light text-xs mb-1">こんにちは、</p>
          <h2 className="font-heading text-xl font-bold text-nagara-white mb-1">竜二さん 👋</h2>
          <p className="text-nagara-gray text-sm mb-4">あなたの愛車、最後の洗車から<span className="text-nagara-green font-semibold"> 12日</span>経過</p>
          <button className="gradient-green text-nagara-black font-semibold text-sm px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            🚿 今すぐ予約する
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <p className="text-nagara-green font-heading font-bold text-xl">24</p>
            <p className="text-nagara-gray text-[10px] mt-0.5">累計施工数</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-nagara-green font-heading font-bold text-xl">4.9</p>
            <p className="text-nagara-gray text-[10px] mt-0.5">平均評価</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-nagara-green font-heading font-bold text-xl">3</p>
            <p className="text-nagara-gray text-[10px] mt-0.5">お気に入り</p>
          </div>
        </div>
      </div>

      {/* Nearby Partners */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-base">近くのパートナー</h3>
          <button className="text-nagara-green text-xs font-medium">もっと見る →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {nearbyPartners.map((partner, i) => (
            <div
              key={partner.name}
              className="glass-card flex-shrink-0 w-[180px] p-4 hover:bg-nagara-card-hover transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center">
                  <span className="font-heading font-bold text-nagara-black text-sm">{partner.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{partner.name}</p>
                  <span className={`${getBadgeStyle(partner.badge)} text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white inline-block`}>
                    {getBadgeLabel(partner.badge)}
                  </span>
                </div>
              </div>
              <p className="text-nagara-gray text-[11px] mb-2">{partner.style}</p>
              <div className="flex items-center gap-1 mb-2">
                <StarIcon size={12} filled />
                <span className="text-nagara-gold text-xs font-semibold">{partner.rating}</span>
                <span className="text-nagara-gray text-[10px]">({partner.reviews})</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {partner.specialties.map(s => (
                  <span key={s} className="text-[9px] bg-nagara-green-subtle text-nagara-green px-1.5 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <p className="text-nagara-gray text-[10px]">📍 {partner.distance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-base">最近の施工</h3>
          <button className="text-nagara-green text-xs font-medium">履歴一覧 →</button>
        </div>
        {recentHistory.map((item, i) => (
          <div key={i} className="glass-card p-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nagara-green-subtle flex items-center justify-center">
                <span className="text-lg">🚗</span>
              </div>
              <div>
                <p className="text-sm font-medium">{item.car}</p>
                <p className="text-nagara-gray text-[11px]">{item.service} • {item.partner}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-nagara-green bg-nagara-green-subtle px-2 py-0.5 rounded-full">{item.status}</span>
              <p className="text-nagara-gray text-[10px] mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Promo */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-base">ながら洗車 製品</h3>
          <span className="text-[10px] text-nagara-gray">公式ケミカル</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {products.map((p) => (
            <div key={p.name} className="glass-card p-3 text-center hover:bg-nagara-card-hover transition-all cursor-pointer group">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-nagara-green-subtle flex items-center justify-center group-hover:scale-110 transition-transform">
                {p.icon === 'gloss' && <GlossIcon size={20} />}
                {p.icon === 'water' && <WaterRepellentIcon size={20} />}
                {p.icon === 'coating' && <CoatingIcon size={20} />}
              </div>
              <p className="text-xs font-semibold">{p.name}</p>
              <p className="text-[10px] text-nagara-gray mt-0.5">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
