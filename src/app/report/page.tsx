'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { StarIcon, GlossIcon, WaterRepellentIcon, CoatingIcon, CleaningPowerIcon } from '@/components/ui/BrandIcons';

const reportData = {
    id: 'RPT-2025-0215',
    date: '2025年2月15日 14:00〜15:05',
    partner: 'TAKA',
    car: 'レクサス RX 450h',
    carColor: 'ソニッククオーツ（ホワイト）',
    service: 'プレミアム洗車',
    duration: '65分',
    location: '自宅出張',
};

const usedProducts = [
    { name: '阿修羅', type: '仕上げ剤', usage: '15ml', icon: 'gloss' },
    { name: 'スノーシャンプー', type: 'シャンプー', usage: '30ml', icon: 'water' },
    { name: 'プラズマ', type: 'コーティング剤', usage: '10ml', icon: 'coating' },
    { name: 'ホイールクリーナー', type: '洗浄剤', usage: '20ml', icon: 'cleaning' },
];

const checklist = [
    { name: 'ボディ洗浄', done: true },
    { name: 'ホイール洗浄', done: true },
    { name: '鉄粉除去', done: true },
    { name: '阿修羅仕上げ', done: true },
    { name: 'ガラス撥水', done: true },
    { name: 'タイヤワックス', done: true },
    { name: 'ドアヒンジ清掃', done: true },
    { name: '拭き上げ', done: true },
];

function ProductIcon({ type }: { type: string }) {
    switch (type) {
        case 'gloss': return <GlossIcon size={18} />;
        case 'water': return <WaterRepellentIcon size={18} />;
        case 'coating': return <CoatingIcon size={18} />;
        case 'cleaning': return <CleaningPowerIcon size={18} />;
        default: return null;
    }
}

export default function ReportPage() {
    const [sliderPos, setSliderPos] = useState(50);
    const [reviewStars, setReviewStars] = useState(0);
    const [reviewText, setReviewText] = useState('');

    return (
        <div className="pb-24">
            <Header title="施工レポート" />

            {/* Report Header */}
            <div className="px-5 pt-4 pb-3">
                <div className="glass-card-green p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-nagara-gray">{reportData.id}</span>
                        <span className="text-[10px] text-nagara-green bg-nagara-green-subtle px-2 py-0.5 rounded-full">完了</span>
                    </div>
                    <h2 className="font-heading font-bold text-base mb-1">{reportData.car}</h2>
                    <p className="text-nagara-gray text-xs mb-2">{reportData.carColor}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-nagara-gray">パートナー：</span><span className="text-nagara-green font-semibold">{reportData.partner}</span></div>
                        <div><span className="text-nagara-gray">メニュー：</span><span>{reportData.service}</span></div>
                        <div><span className="text-nagara-gray">所要時間：</span><span>{reportData.duration}</span></div>
                        <div><span className="text-nagara-gray">場所：</span><span>{reportData.location}</span></div>
                    </div>
                </div>
            </div>

            {/* Before/After Slider */}
            <div className="px-5 pb-3">
                <h3 className="font-heading font-bold text-sm mb-2">施工 Before / After</h3>
                <div className="glass-card overflow-hidden relative" style={{ height: 200 }}>
                    {/* Before */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-full h-full absolute inset-0 opacity-30">
                                {/* Simulated dirty car surface */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(150,120,80,0.4)_0%,transparent_50%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,80,60,0.3)_0%,transparent_40%)]" />
                            </div>
                            <span className="text-4xl">🚗</span>
                            <p className="text-xs text-gray-400 mt-2">施工前</p>
                        </div>
                    </div>

                    {/* After */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                        <div className="text-center">
                            <div className="absolute inset-0 opacity-20">
                                {/* Simulated clean/glossy surface */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,230,118,0.3)_0%,transparent_60%)]" />
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.1)_45%,transparent_50%)]" />
                            </div>
                            <span className="text-4xl">✨🚗✨</span>
                            <p className="text-xs text-nagara-green mt-2">施工後</p>
                        </div>
                    </div>

                    {/* Slider handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-nagara-green z-10"
                        style={{ left: `${sliderPos}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full gradient-green flex items-center justify-center glow-green cursor-pointer">
                            <span className="text-nagara-black text-xs font-bold">⟺</span>
                        </div>
                    </div>

                    {/* Slider input */}
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={sliderPos}
                        onChange={e => setSliderPos(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    {/* Labels */}
                    <span className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 bg-black/50 px-2 py-0.5 rounded-full z-10">BEFORE</span>
                    <span className="absolute top-2 right-3 text-[10px] font-bold text-nagara-green bg-black/50 px-2 py-0.5 rounded-full z-10">AFTER</span>
                </div>
            </div>

            {/* Used Products */}
            <div className="px-5 pb-3">
                <h3 className="font-heading font-bold text-sm mb-2">使用製品 <span className="text-nagara-green text-[10px] font-normal">ながら洗車公式</span></h3>
                <div className="grid grid-cols-2 gap-2">
                    {usedProducts.map((p, i) => (
                        <div key={p.name} className="glass-card p-3 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                            <div className="flex items-center gap-2 mb-1">
                                <ProductIcon type={p.icon} />
                                <div>
                                    <p className="text-xs font-semibold">{p.name}</p>
                                    <p className="text-[9px] text-nagara-gray">{p.type}</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-nagara-green font-medium">使用量: {p.usage}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checklist */}
            <div className="px-5 pb-3">
                <h3 className="font-heading font-bold text-sm mb-2">施工チェックリスト</h3>
                <div className="glass-card p-3">
                    <div className="grid grid-cols-2 gap-1.5">
                        {checklist.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded flex items-center justify-center ${item.done ? 'gradient-green' : 'border border-nagara-border'}`}>
                                    {item.done && <span className="text-[8px] text-nagara-black font-bold">✓</span>}
                                </div>
                                <span className={`text-xs ${item.done ? 'text-nagara-white' : 'text-nagara-gray'}`}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="px-5 pb-6">
                <h3 className="font-heading font-bold text-sm mb-2">レビューを投稿</h3>
                <div className="glass-card p-4">
                    {/* Star Rating */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setReviewStars(star)} className="transition-transform hover:scale-125">
                                <StarIcon size={28} filled={star <= reviewStars} />
                            </button>
                        ))}
                    </div>
                    {reviewStars > 0 && (
                        <p className="text-center text-xs text-nagara-gold mb-3">
                            {reviewStars === 5 ? '最高！' : reviewStars === 4 ? '満足！' : reviewStars === 3 ? 'まあまあ' : reviewStars === 2 ? 'いまいち' : '不満'}
                        </p>
                    )}
                    {/* Comment */}
                    <textarea
                        placeholder="コメントを入力..."
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        className="w-full bg-nagara-card border border-nagara-border rounded-xl p-3 text-xs text-nagara-white placeholder:text-nagara-gray resize-none focus:outline-none focus:border-nagara-green transition-colors"
                        rows={3}
                    />
                    <button className="w-full gradient-green text-nagara-black font-semibold text-sm py-2.5 rounded-xl mt-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        レビューを送信
                    </button>
                </div>
            </div>
        </div>
    );
}
