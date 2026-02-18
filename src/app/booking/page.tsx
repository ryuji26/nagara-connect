'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { StarIcon } from '@/components/ui/BrandIcons';

const partners = [
    { id: 1, name: 'TAKA', rating: 4.9, reviews: 128, x: 45, y: 35, badge: 'gold', style: 'スピード重視型' },
    { id: 2, name: 'RYU', rating: 4.8, reviews: 95, x: 65, y: 55, badge: 'silver', style: 'こだわり仕上げ型' },
    { id: 3, name: 'SORA', rating: 4.7, reviews: 67, x: 25, y: 60, badge: 'gold', style: 'オールラウンダー' },
    { id: 4, name: 'KEI', rating: 5.0, reviews: 42, x: 70, y: 25, badge: 'master', style: 'コーティング特化' },
    { id: 5, name: 'YUKI', rating: 4.6, reviews: 31, x: 35, y: 75, badge: 'silver', style: 'ガラスコート職人' },
];

const gsStations = [
    { id: 1, name: 'ENEOS 渋谷店', x: 55, y: 45 },
    { id: 2, name: 'コスモ石油 目黒店', x: 30, y: 40 },
    { id: 3, name: 'Apollo 世田谷店', x: 75, y: 65 },
];

const menuItems = [
    { name: 'ベーシック洗車', price: '¥3,500', duration: '45分', desc: '手洗い洗車 + 拭き上げ' },
    { name: 'プレミアム洗車', price: '¥5,800', duration: '60分', desc: '手洗い + 阿修羅仕上げ + ホイール洗浄' },
    { name: 'コーティングメンテ', price: '¥8,500', duration: '90分', desc: 'プラズマコート + 撥水メンテナンス' },
    { name: 'フル施工パック', price: '¥15,000', duration: '120分', desc: '研磨 + コーティング + 室内清掃' },
];

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export default function BookingPage() {
    const [locationType, setLocationType] = useState<'home' | 'gs'>('home');
    const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const partner = partners.find(p => p.id === selectedPartner);

    return (
        <div className="pb-24">
            <Header title="予約" />

            {/* Step Indicator */}
            <div className="px-5 py-3">
                <div className="flex items-center justify-between mb-2">
                    {['場所 & パートナー', 'メニュー', '日時確認'].map((label, i) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? 'gradient-green text-nagara-black' :
                                    step === i + 1 ? 'border-2 border-nagara-green text-nagara-green' :
                                        'border border-nagara-border text-nagara-gray'
                                }`}>
                                {step > i + 1 ? '✓' : i + 1}
                            </div>
                            <span className={`text-[10px] font-medium ${step === i + 1 ? 'text-nagara-white' : 'text-nagara-gray'}`}>
                                {label}
                            </span>
                            {i < 2 && <div className={`w-6 h-[1px] mx-1 ${step > i + 1 ? 'bg-nagara-green' : 'bg-nagara-border'}`} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 1: Map & Partner Selection */}
            {step === 1 && (
                <>
                    {/* Location Toggle */}
                    <div className="px-5 pb-3">
                        <div className="glass-card p-1 flex">
                            <button
                                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${locationType === 'home' ? 'gradient-green text-nagara-black' : 'text-nagara-gray'
                                    }`}
                                onClick={() => setLocationType('home')}
                            >
                                🏠 自宅出張
                            </button>
                            <button
                                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${locationType === 'gs' ? 'gradient-green text-nagara-black' : 'text-nagara-gray'
                                    }`}
                                onClick={() => setLocationType('gs')}
                            >
                                ⛽ 提携GS
                            </button>
                        </div>
                    </div>

                    {/* Mock Map */}
                    <div className="px-5 pb-3">
                        <div className="glass-card overflow-hidden relative" style={{ height: 280 }}>
                            {/* Map Background */}
                            <div className="absolute inset-0 bg-nagara-card">
                                {/* Grid lines */}
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <React.Fragment key={i}>
                                        <div className="absolute h-full w-px bg-nagara-border opacity-30" style={{ left: `${(i + 1) * 10}%` }} />
                                        <div className="absolute w-full h-px bg-nagara-border opacity-30" style={{ top: `${(i + 1) * 10}%` }} />
                                    </React.Fragment>
                                ))}
                                {/* Roads */}
                                <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-nagara-border opacity-60" />
                                <div className="absolute top-[60%] left-0 right-0 h-[2px] bg-nagara-border opacity-40" />
                                <div className="absolute left-[40%] top-0 bottom-0 w-[3px] bg-nagara-border opacity-60" />
                                <div className="absolute left-[70%] top-0 bottom-0 w-[2px] bg-nagara-border opacity-40" />

                                {/* Your location */}
                                <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <div className="w-4 h-4 rounded-full bg-nagara-blue border-2 border-white animate-pulse-green" style={{ boxShadow: '0 0 15px rgba(66,165,245,0.5)' }} />
                                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-nagara-blue font-semibold whitespace-nowrap">現在地</div>
                                </div>

                                {/* GS Stations */}
                                {locationType === 'gs' && gsStations.map(gs => (
                                    <div key={gs.id} className="absolute cursor-pointer group" style={{ left: `${gs.x}%`, top: `${gs.y}%`, transform: 'translate(-50%, -50%)' }}>
                                        <div className="w-6 h-6 rounded-lg bg-nagara-orange flex items-center justify-center text-[10px] group-hover:scale-125 transition-transform">
                                            ⛽
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-nagara-orange whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                            {gs.name}
                                        </div>
                                    </div>
                                ))}

                                {/* Partners */}
                                {partners.map(p => (
                                    <button
                                        key={p.id}
                                        className={`absolute cursor-pointer transition-all duration-200 ${selectedPartner === p.id ? 'scale-125 z-10' : 'hover:scale-110'}`}
                                        style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                                        onClick={() => setSelectedPartner(p.id)}
                                    >
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${selectedPartner === p.id
                                                ? 'gradient-green text-nagara-black ring-2 ring-nagara-green ring-offset-2 ring-offset-nagara-dark'
                                                : 'bg-nagara-card border border-nagara-border text-nagara-white'
                                            }`}>
                                            {p.name[0]}
                                        </div>
                                        {selectedPartner === p.id && (
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] text-nagara-green font-semibold">{p.name}</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Selected Partner Card */}
                    {partner && (
                        <div className="px-5 pb-3 animate-fade-in-up">
                            <div className="glass-card-green p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center">
                                            <span className="font-heading font-bold text-nagara-black text-lg">{partner.name[0]}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-heading font-bold">{partner.name}</p>
                                                <span className={`badge-${partner.badge} text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white`}>
                                                    {partner.badge.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-nagara-gray text-xs">{partner.style}</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <StarIcon size={12} filled />
                                                <span className="text-nagara-gold text-xs font-semibold">{partner.rating}</span>
                                                <span className="text-nagara-gray text-[10px]">({partner.reviews}件)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="gradient-green text-nagara-black font-semibold text-xs px-4 py-2 rounded-xl"
                                        onClick={() => setStep(2)}
                                    >
                                        選択 →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Partner List */}
                    <div className="px-5">
                        <h3 className="font-heading font-bold text-sm mb-2">パートナー一覧</h3>
                        {partners.map(p => (
                            <button
                                key={p.id}
                                className={`w-full glass-card p-3 mb-2 flex items-center justify-between transition-all ${selectedPartner === p.id ? 'border-nagara-green' : ''
                                    }`}
                                onClick={() => setSelectedPartner(p.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedPartner === p.id ? 'gradient-green text-nagara-black' : 'bg-nagara-card text-nagara-white'
                                        }`}>{p.name[0]}</div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium">{p.name}</p>
                                        <p className="text-[10px] text-nagara-gray">{p.style}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <StarIcon size={10} filled />
                                    <span className="text-xs text-nagara-gold">{p.rating}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Step 2: Menu Selection */}
            {step === 2 && (
                <div className="px-5">
                    <button onClick={() => setStep(1)} className="text-nagara-gray text-xs mb-3 hover:text-nagara-green transition-colors">
                        ← 戻る
                    </button>
                    <h3 className="font-heading font-bold text-base mb-3">メニューを選択</h3>
                    {menuItems.map((menu, i) => (
                        <button
                            key={menu.name}
                            className={`w-full glass-card p-4 mb-3 text-left transition-all animate-fade-in-up ${selectedMenu === i ? 'border-nagara-green glow-green-sm' : ''
                                }`}
                            style={{ animationDelay: `${i * 80}ms` }}
                            onClick={() => setSelectedMenu(i)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm">{menu.name}</p>
                                <p className="text-nagara-green font-heading font-bold">{menu.price}</p>
                            </div>
                            <p className="text-nagara-gray text-xs mb-2">{menu.desc}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-nagara-gray bg-nagara-card px-2 py-0.5 rounded-full">⏱ {menu.duration}</span>
                            </div>
                        </button>
                    ))}
                    {selectedMenu !== null && (
                        <button
                            className="w-full gradient-green text-nagara-black font-semibold py-3 rounded-xl mt-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => setStep(3)}
                        >
                            日時を選択 →
                        </button>
                    )}
                </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
                <div className="px-5">
                    <button onClick={() => setStep(2)} className="text-nagara-gray text-xs mb-3 hover:text-nagara-green transition-colors">
                        ← 戻る
                    </button>
                    <h3 className="font-heading font-bold text-base mb-3">日時を選択</h3>

                    {/* Date selector */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-4">
                        {['今日', '明日', '2/20', '2/21', '2/22', '2/23', '2/24'].map((date, i) => (
                            <button
                                key={date}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${i === 0 ? 'gradient-green text-nagara-black' : 'glass-card text-nagara-gray hover:text-nagara-white'
                                    }`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>

                    {/* Time grid */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                className={`py-3 rounded-xl text-xs font-medium transition-all ${selectedTime === time
                                        ? 'gradient-green text-nagara-black'
                                        : 'glass-card text-nagara-gray hover:text-nagara-white'
                                    }`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    {/* Summary */}
                    {selectedTime && partner && selectedMenu !== null && (
                        <div className="glass-card-green p-4 mb-4 animate-fade-in-up">
                            <h4 className="font-heading font-bold text-sm mb-3 text-nagara-green">予約内容</h4>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between"><span className="text-nagara-gray">パートナー</span><span>{partner.name}</span></div>
                                <div className="flex justify-between"><span className="text-nagara-gray">メニュー</span><span>{menuItems[selectedMenu].name}</span></div>
                                <div className="flex justify-between"><span className="text-nagara-gray">場所</span><span>{locationType === 'home' ? '自宅出張' : '提携GS'}</span></div>
                                <div className="flex justify-between"><span className="text-nagara-gray">日時</span><span>今日 {selectedTime}</span></div>
                                <div className="border-t border-nagara-border pt-2 flex justify-between font-semibold">
                                    <span>合計</span>
                                    <span className="text-nagara-green">{menuItems[selectedMenu].price}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTime && (
                        <button
                            className="w-full gradient-green text-nagara-black font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => setShowConfirm(true)}
                        >
                            予約を確定する
                        </button>
                    )}
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5" onClick={() => setShowConfirm(false)}>
                    <div className="glass-card p-6 w-full max-w-[380px] text-center animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-green flex items-center justify-center">
                            <span className="text-3xl">✓</span>
                        </div>
                        <h3 className="font-heading font-bold text-xl mb-2">予約完了！</h3>
                        <p className="text-nagara-gray text-sm mb-4">パートナーに通知が送信されました。<br />確認後、チャットで連絡が届きます。</p>
                        <button
                            className="w-full gradient-green text-nagara-black font-semibold py-3 rounded-xl"
                            onClick={() => setShowConfirm(false)}
                        >
                            ホームに戻る
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
