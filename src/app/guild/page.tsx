'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';

const partnerProfile = {
    name: 'TAKA',
    fullName: '高橋 拓真',
    title: 'ながら洗車 認定マスター',
    style: 'スピード重視型 × 圧倒的光沢仕上げ',
    bio: '「速さは正義。でも仕上がりには一切妥協しない」をモットーに、効率的かつ高品質な洗車を提供。ながら洗車製品の特性を知り尽くしたマスターワーカー。',
    stats: { washes: 342, rating: 4.9, reviews: 128, repeatRate: 87 },
    badge: 'master',
    certDate: '2024年12月',
};

const skills = [
    { name: '洗浄', value: 95, color: '#42a5f5' },
    { name: '研磨', value: 88, color: '#ab47bc' },
    { name: 'コーティング', value: 92, color: '#ffa726' },
    { name: '接客', value: 90, color: '#ffd54f' },
    { name: 'スピード', value: 97, color: '#ef5350' },
];

const badges = [
    { name: 'ベーシック洗車', level: 'master', icon: '🧽', desc: '手洗い洗車マスター' },
    { name: 'コーティング', level: 'gold', icon: '✨', desc: 'プラズマコート認定' },
    { name: '研磨技術', level: 'gold', icon: '💎', desc: 'ポリッシュゴールド' },
    { name: 'Home Wash', level: 'silver', icon: '🚿', desc: 'ポータブル施工認定' },
    { name: '阿修羅マスター', level: 'master', icon: '🔥', desc: '阿修羅シリーズ完全習得' },
    { name: 'スピードスター', level: 'gold', icon: '⚡', desc: '最速施工認定' },
];

const certProgress = [
    { name: 'マスター洗車技術', progress: 100, total: 100 },
    { name: 'アドバンスコーティング', progress: 85, total: 100 },
    { name: 'プレミアム研磨', progress: 72, total: 100 },
    { name: 'インテリアケア', progress: 45, total: 100 },
];

function getBadgeColor(level: string) {
    switch (level) {
        case 'master': return 'badge-master';
        case 'gold': return 'badge-gold';
        case 'silver': return 'badge-silver';
        default: return 'badge-bronze';
    }
}

function RadarChart({ skills: s }: { skills: typeof skills }) {
    const cx = 120, cy = 120, r = 90;
    const n = s.length;
    const angles = s.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);

    const getPoint = (angle: number, ratio: number) => ({
        x: cx + r * ratio * Math.cos(angle),
        y: cy + r * ratio * Math.sin(angle),
    });

    const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

    return (
        <svg viewBox="0 0 240 240" className="w-full max-w-[260px] mx-auto">
            {/* Grid */}
            {gridLevels.map(level => (
                <polygon
                    key={level}
                    points={angles.map(a => { const p = getPoint(a, level); return `${p.x},${p.y}`; }).join(' ')}
                    fill="none"
                    stroke="#2a2a2a"
                    strokeWidth="0.5"
                />
            ))}
            {/* Axis lines */}
            {angles.map((a, i) => {
                const p = getPoint(a, 1);
                return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#2a2a2a" strokeWidth="0.5" />;
            })}
            {/* Data */}
            <polygon
                points={s.map((sk, i) => { const p = getPoint(angles[i], sk.value / 100); return `${p.x},${p.y}`; }).join(' ')}
                fill="rgba(0, 230, 118, 0.15)"
                stroke="#00e676"
                strokeWidth="2"
            />
            {/* Data points */}
            {s.map((sk, i) => {
                const p = getPoint(angles[i], sk.value / 100);
                return <circle key={i} cx={p.x} cy={p.y} r="4" fill={sk.color} stroke="#0a0a0a" strokeWidth="2" />;
            })}
            {/* Labels */}
            {s.map((sk, i) => {
                const p = getPoint(angles[i], 1.2);
                return (
                    <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#b0b0b0" fontWeight="600">
                        {sk.name}
                    </text>
                );
            })}
        </svg>
    );
}

export default function GuildPage() {
    const [tab, setTab] = useState<'profile' | 'certs'>('profile');

    return (
        <div className="pb-24">
            <Header title="ギルドカード" />

            {/* Profile Card */}
            <div className="px-5 pt-4 pb-3">
                <div className="glass-card-green p-5 relative overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                        <div className="w-full h-full rounded-full bg-nagara-green blur-3xl" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl gradient-green flex items-center justify-center glow-green">
                            <span className="font-heading font-black text-nagara-black text-2xl">{partnerProfile.name[0]}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-heading font-bold text-lg">{partnerProfile.name}</h2>
                                <span className="badge-master text-[9px] font-bold px-2 py-0.5 rounded-full text-white">MASTER</span>
                            </div>
                            <p className="text-nagara-gray-light text-xs">{partnerProfile.fullName}</p>
                            <p className="text-nagara-green text-[10px] font-medium mt-0.5">{partnerProfile.title}</p>
                        </div>
                    </div>

                    <p className="text-xs text-nagara-gray-light mb-3 italic">&quot;{partnerProfile.style}&quot;</p>

                    <div className="grid grid-cols-4 gap-2">
                        <div className="text-center">
                            <p className="font-heading font-bold text-nagara-green">{partnerProfile.stats.washes}</p>
                            <p className="text-[9px] text-nagara-gray">施工数</p>
                        </div>
                        <div className="text-center">
                            <p className="font-heading font-bold text-nagara-gold">{partnerProfile.stats.rating}</p>
                            <p className="text-[9px] text-nagara-gray">評価</p>
                        </div>
                        <div className="text-center">
                            <p className="font-heading font-bold text-nagara-white">{partnerProfile.stats.reviews}</p>
                            <p className="text-[9px] text-nagara-gray">レビュー</p>
                        </div>
                        <div className="text-center">
                            <p className="font-heading font-bold text-nagara-blue">{partnerProfile.stats.repeatRate}%</p>
                            <p className="text-[9px] text-nagara-gray">リピート</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* App Switch */}
            <div className="px-5 pb-3">
                <div className="glass-card p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md gradient-green flex items-center justify-center">
                            <span className="text-[8px] font-bold text-nagara-black">N</span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold">Nagara Connect</p>
                            <p className="text-[9px] text-nagara-gray">ブランド認定モード</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-5 rounded-full bg-nagara-green relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] text-nagara-gray">切替: Open Wash</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Toggle */}
            <div className="px-5 pb-3">
                <div className="glass-card p-1 flex">
                    <button
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'profile' ? 'gradient-green text-nagara-black' : 'text-nagara-gray'
                            }`}
                        onClick={() => setTab('profile')}
                    >
                        スキルチャート
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'certs' ? 'gradient-green text-nagara-black' : 'text-nagara-gray'
                            }`}
                        onClick={() => setTab('certs')}
                    >
                        認定 & バッジ
                    </button>
                </div>
            </div>

            {tab === 'profile' ? (
                <>
                    {/* Radar Chart */}
                    <div className="px-5 pb-3">
                        <div className="glass-card p-4">
                            <h3 className="font-heading font-bold text-sm mb-2 text-center">スキルレーダー</h3>
                            <RadarChart skills={skills} />
                            <div className="grid grid-cols-5 gap-1 mt-2">
                                {skills.map(sk => (
                                    <div key={sk.name} className="text-center">
                                        <div className="w-full h-1.5 rounded-full bg-nagara-card mb-1">
                                            <div className="h-full rounded-full" style={{ width: `${sk.value}%`, backgroundColor: sk.color }} />
                                        </div>
                                        <p className="text-[9px] font-semibold" style={{ color: sk.color }}>{sk.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="px-5 pb-3">
                        <div className="glass-card p-4">
                            <h3 className="font-heading font-bold text-sm mb-2">プロフィール</h3>
                            <p className="text-xs text-nagara-gray-light leading-relaxed">{partnerProfile.bio}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Badges */}
                    <div className="px-5 pb-3">
                        <h3 className="font-heading font-bold text-sm mb-3">認定バッジ</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {badges.map((b, i) => (
                                <div key={b.name} className="glass-card p-3 text-center animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                                    <div className={`w-10 h-10 mx-auto mb-2 rounded-full ${getBadgeColor(b.level)} flex items-center justify-center`}>
                                        <span className="text-lg">{b.icon}</span>
                                    </div>
                                    <p className="text-[10px] font-semibold">{b.name}</p>
                                    <p className="text-[8px] text-nagara-gray mt-0.5">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cert Progress */}
                    <div className="px-5 pb-3">
                        <h3 className="font-heading font-bold text-sm mb-3">認定試験の進捗</h3>
                        {certProgress.map((cert, i) => (
                            <div key={cert.name} className="glass-card p-3 mb-2 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <p className="text-xs font-medium">{cert.name}</p>
                                    <span className={`text-[10px] font-bold ${cert.progress === 100 ? 'text-nagara-green' : 'text-nagara-gray'}`}>
                                        {cert.progress === 100 ? '✓ 合格' : `${cert.progress}%`}
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-nagara-card">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${cert.progress === 100 ? 'gradient-green' : ''}`}
                                        style={{
                                            width: `${cert.progress}%`,
                                            backgroundColor: cert.progress < 100 ? '#00e676' : undefined,
                                            opacity: cert.progress < 100 ? 0.7 : 1,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
