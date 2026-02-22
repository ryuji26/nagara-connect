'use client';

import React from 'react';
import Link from 'next/link';
import {
    Clock, ArrowLeft, Crown, Shield, Sparkles, Star,
    ChevronRight, LogIn, UserPlus, Search, MapPin
} from 'lucide-react';

/* ══════════════════════════════════════════
   SIZE PRICING DATA
   ══════════════════════════════════════════ */

const sizes = ['SS', 'S', 'M', 'L', 'LL', 'XL'] as const;

const sizeDescriptions: Record<string, string> = {
    SS: '8.4m³以下（軽自動車）',
    S: '8.5〜10.4m³（コンパクトカー）',
    M: '10.5〜12.1m³（セダン・ハッチバック）',
    L: '12.2〜13.9m³（中型SUV・ワゴン）',
    LL: '14.0〜17.9m³（ミニバン・大型SUV）',
    XL: '18.0m³以上（大型SUV・高級バン）',
};

const sizeExamples: Record<string, string> = {
    SS: 'N-ONE, ハスラー, ワゴンR, ラパン',
    S: 'フィット, N-BOX, アクア, マツダ2',
    M: 'プリウス, シビック, インプレッサ',
    L: 'ヴェゼル, CX-5, カローラクロス',
    LL: 'ハリアー, アルファード, ステップWGN',
    XL: 'ランドクルーザー, Gクラス, レンジローバー',
};

/* ══════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════ */

export interface MenuData {
    id: string;
    rank: string;
    name: string;
    time: string;
    description: string;
    image: string;
    popular?: boolean;
    accentColor: string;
    bgColor: string;
    prices: Record<string, string>;
    features: string[];
    includes: string[];
    products: string[];
    steps?: { title: string; desc: string }[];
}

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */

export default function MenuDetailPage({ menu }: { menu: MenuData }) {
    const isPopular = menu.popular;

    return (
        <div className="min-h-screen bg-bg text-text-primary">
            {/* ── HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
                <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 h-16 flex items-center justify-between">
                    <Link href="/" className="font-heading text-xl md:text-2xl font-black tracking-tight hover:opacity-80 transition-opacity">
                        NAGARA <span className="text-primary font-display italic">PRO</span>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:bg-bg-secondary transition-all">
                            <LogIn size={15} />
                            ログイン
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all shadow-sm">
                            <UserPlus size={15} />
                            会員登録
                        </button>
                    </div>
                </div>
            </header>

            {/* ── BREADCRUMB ── */}
            <nav className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16 py-4">
                <ol className="flex items-center gap-2 text-xs text-text-muted">
                    <li><Link href="/" className="hover:text-primary transition-colors">トップ</Link></li>
                    <li><ChevronRight size={12} /></li>
                    <li>メニュー</li>
                    <li><ChevronRight size={12} /></li>
                    <li className="text-text-primary font-semibold">{menu.name}</li>
                </ol>
            </nav>

            {/* ── HERO SECTION ── */}
            <section className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16 pb-12 md:pb-16">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                        <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                        {isPopular && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-gold to-accent-gold-dark text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                <Crown size={12} className="inline mr-1 -mt-0.5" />一番人気
                            </div>
                        )}
                        <div className="absolute top-4 right-4">
                            <span className={`text-sm font-black px-4 py-1.5 rounded-lg shadow-sm ${isPopular ? 'bg-accent-gold text-white' : 'bg-white/90 text-text-primary'}`}>
                                {menu.rank}
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className="text-2xl font-black px-4 py-1 rounded-xl"
                                style={{ background: menu.bgColor, color: menu.accentColor }}
                            >
                                {menu.rank}
                            </span>
                        </div>
                        <h1 className="font-heading text-3xl md:text-4xl font-black mb-3">{menu.name}</h1>
                        <div className="flex items-center gap-2 text-text-muted text-sm mb-5">
                            <Clock size={16} />
                            <span>所要時間: {menu.time}</span>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-base mb-8">
                            {menu.description}
                        </p>

                        {/* Quick price */}
                        <div className="bg-bg-secondary rounded-2xl p-5 border border-border-light">
                            <p className="text-xs text-text-muted font-semibold mb-1">SSサイズ（軽自動車）〜</p>
                            <p className={`font-heading font-black text-3xl ${isPopular ? 'text-accent-gold-dark' : 'text-primary'}`}>
                                {menu.prices['SS']}〜
                            </p>
                            <p className="text-xs text-text-muted mt-2">※サイズにより料金が異なります。下記料金表をご確認ください。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SIZE PRICING TABLE ── */}
            <section className="bg-bg-secondary py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16">
                    <div className="text-center mb-8 md:mb-10">
                        <p className="text-xs font-bold text-accent-gold tracking-[0.25em] uppercase mb-2">Size & Pricing</p>
                        <h2 className="font-heading text-2xl md:text-3xl font-black">サイズ別料金表</h2>
                        <p className="text-sm text-text-muted mt-3 max-w-lg mx-auto">
                            お車のサイズ（体積）に応じて料金が決まります。
                        </p>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-md border border-border-light overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left px-5 py-4 text-xs font-bold text-text-muted uppercase tracking-wider bg-bg-secondary/50">サイズ</th>
                                        <th className="text-left px-5 py-4 text-xs font-bold text-text-muted uppercase tracking-wider bg-bg-secondary/50">目安</th>
                                        <th className="text-right px-5 py-4 text-xs font-bold text-text-muted uppercase tracking-wider bg-bg-secondary/50">料金（税込）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizes.map((size, idx) => (
                                        <tr
                                            key={size}
                                            className={`border-b border-border-light last:border-b-0 transition-colors hover:bg-bg-secondary/30 ${size === 'S' ? 'bg-primary-subtle/30' : ''}`}
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black ${size === 'S'
                                                            ? isPopular ? 'bg-accent-gold text-white' : 'bg-primary text-white'
                                                            : 'bg-bg-secondary text-text-primary'
                                                            }`}
                                                    >
                                                        {size}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-bold text-text-primary">{size}サイズ</p>
                                                        <p className="text-xs text-text-muted">{sizeDescriptions[size]}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-xs text-text-secondary">{sizeExamples[size]}</p>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <span className={`font-heading font-black text-lg ${size === 'S'
                                                    ? isPopular ? 'text-accent-gold-dark' : 'text-primary'
                                                    : 'text-text-primary'
                                                    }`}>
                                                    {menu.prices[size]}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-xs text-text-muted text-center mt-4">
                        ※ 料金はすべて税込表示です。お車の状態により追加料金が発生する場合があります。
                    </p>
                </div>
            </section>

            {/* ── SERVICE DETAILS ── */}
            <section className="max-w-5xl mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Features */}
                    <div className="bg-white rounded-2xl p-6 border border-border-light shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                            <Sparkles size={20} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-base mb-4">このコースの特徴</h3>
                        <ul className="space-y-2">
                            {menu.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                    <Star size={14} className="text-accent-gold mt-0.5 flex-shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Includes */}
                    <div className="bg-white rounded-2xl p-6 border border-border-light shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center mb-4">
                            <Shield size={20} className="text-success" />
                        </div>
                        <h3 className="font-heading font-bold text-base mb-4">施工内容</h3>
                        <ul className="space-y-2">
                            {menu.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="bg-white rounded-2xl p-6 border border-border-light shadow-md">
                        <div className="w-10 h-10 rounded-xl bg-accent-gold-light flex items-center justify-center mb-4">
                            <Crown size={20} className="text-accent-gold-dark" />
                        </div>
                        <h3 className="font-heading font-bold text-base mb-4">使用プロダクト</h3>
                        <ul className="space-y-2">
                            {menu.products.map((p, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 flex-shrink-0" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── WASH STEPS ── */}
            {menu.steps && menu.steps.length > 0 && (
                <section className="bg-bg-secondary py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-5 md:px-10 lg:px-16">
                        <div className="text-center mb-10">
                            <p className="text-xs font-bold text-accent-gold tracking-[0.25em] uppercase mb-2">Wash Process</p>
                            <h2 className="font-heading text-2xl md:text-3xl font-black">施工ステップ</h2>
                            <p className="text-sm text-text-muted mt-3">丁寧な手作業で、愛車を新車以上の輝きへ導きます。</p>
                        </div>

                        <div className="space-y-4">
                            {menu.steps.map((step, i) => (
                                <div key={i} className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm flex items-start gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-light flex items-center justify-center shrink-0 border border-primary/10">
                                        <span className="font-heading font-black text-lg md:text-xl text-primary">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-text-primary">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA SECTION ── */}
            <section className="cta-gradient py-16 md:py-20 text-center">
                <div className="max-w-3xl mx-auto px-5">
                    <h2 className="font-heading text-2xl md:text-3xl font-black text-white mb-4">
                        {menu.name}を体験してみませんか？
                    </h2>
                    <p className="text-white/70 text-sm md:text-base mb-8">
                        お近くの認定職人を探して、今すぐ予約しましょう。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold-dark text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm"
                        >
                            <Search size={16} />
                            職人を探す
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-2xl border border-white/20 transition-all active:scale-95 text-sm"
                        >
                            <ArrowLeft size={16} />
                            メニュー一覧に戻る
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-primary-dark text-white/60 text-xs py-8">
                <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-16 text-center">
                    <p className="font-heading text-base font-bold text-white/80 mb-3">
                        NAGARA <span className="font-display italic">PRO</span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                        <Link href="#" className="hover:text-white transition-colors">利用規約</Link>
                        <Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                        <Link href="#" className="hover:text-white transition-colors">特定商取引法</Link>
                        <Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link>
                    </div>
                    <p>© 2026 NAGARA PRO. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
