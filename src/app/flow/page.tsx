'use client';

import React from 'react';
import Header from '@/components/layout/Header';

const flowSteps = [
    {
        step: 1,
        title: 'アプリを開く',
        desc: 'ホーム画面でパートナー情報と施工履歴を確認',
        icon: '📱',
        color: '#00e676',
        actor: 'customer',
    },
    {
        step: 2,
        title: '場所を選択',
        desc: '自宅出張 または 提携GSを選択',
        icon: '📍',
        color: '#42a5f5',
        actor: 'customer',
    },
    {
        step: 3,
        title: 'パートナーを選択',
        desc: 'マップ上で近くのパートナーを選び、評価やスキルを確認',
        icon: '👤',
        color: '#00e676',
        actor: 'customer',
    },
    {
        step: 4,
        title: 'メニュー & 日時を決定',
        desc: '洗車メニューと希望日時を選択して予約を確定',
        icon: '📋',
        color: '#ffa726',
        actor: 'customer',
    },
    {
        step: 5,
        title: 'パートナーが受諾',
        desc: '通知を受信し、チャットで詳細を確認',
        icon: '✅',
        color: '#00e676',
        actor: 'partner',
    },
    {
        step: 6,
        title: '施工開始',
        desc: 'パートナーが到着、施工前の写真撮影',
        icon: '🚿',
        color: '#ab47bc',
        actor: 'partner',
    },
    {
        step: 7,
        title: '施工完了',
        desc: '施工後の写真撮影、使用製品を自動記録',
        icon: '✨',
        color: '#ffd54f',
        actor: 'partner',
    },
    {
        step: 8,
        title: 'レポート確認',
        desc: 'Before/After写真と使用製品を確認',
        icon: '📊',
        color: '#42a5f5',
        actor: 'customer',
    },
    {
        step: 9,
        title: 'レビュー投稿',
        desc: '星評価とコメントでパートナーを評価',
        icon: '⭐',
        color: '#ffd54f',
        actor: 'customer',
    },
    {
        step: 10,
        title: '決済完了',
        desc: '自動決済でスムーズに完了',
        icon: '💳',
        color: '#00e676',
        actor: 'system',
    },
];

export default function FlowPage() {
    return (
        <div className="pb-24">
            <Header title="UXフロー" />

            <div className="px-5 pt-4 pb-3">
                <div className="glass-card-green p-4 text-center mb-4">
                    <h2 className="font-heading font-bold text-base mb-1">予約 → 施工完了 → レビュー</h2>
                    <p className="text-nagara-gray text-xs">顧客体験のエンドツーエンドフロー</p>
                </div>

                {/* Legend */}
                <div className="flex gap-3 mb-4 justify-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-nagara-green" />
                        <span className="text-[10px] text-nagara-gray">顧客</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-nagara-purple" />
                        <span className="text-[10px] text-nagara-gray">パートナー</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-nagara-blue" />
                        <span className="text-[10px] text-nagara-gray">システム</span>
                    </div>
                </div>

                {/* Flow Steps */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[22px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-nagara-green via-nagara-purple to-nagara-green opacity-30" />

                    {flowSteps.map((s, i) => (
                        <div
                            key={s.step}
                            className="flex gap-4 mb-3 animate-fade-in-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Step indicator */}
                            <div className="relative flex-shrink-0">
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg z-10 relative"
                                    style={{
                                        background: `${s.color}15`,
                                        border: `2px solid ${s.color}`,
                                        boxShadow: `0 0 12px ${s.color}30`,
                                    }}
                                >
                                    {s.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`glass-card flex-1 p-3 ${s.actor === 'partner' ? 'border-l-2 border-l-nagara-purple' :
                                    s.actor === 'system' ? 'border-l-2 border-l-nagara-blue' : ''
                                }`}>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">{s.title}</p>
                                    <span className="text-[9px] text-nagara-gray bg-nagara-card px-1.5 py-0.5 rounded-full">
                                        STEP {s.step}
                                    </span>
                                </div>
                                <p className="text-xs text-nagara-gray-light">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary diagram */}
                <div className="glass-card p-4 mt-4">
                    <h3 className="font-heading font-bold text-sm mb-3 text-center">画面遷移サマリー</h3>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                        {[
                            { label: 'ホーム', color: '#00e676' },
                            { label: '→' },
                            { label: 'マップ予約', color: '#42a5f5' },
                            { label: '→' },
                            { label: 'メニュー選択', color: '#ffa726' },
                            { label: '→' },
                            { label: '日時確認', color: '#ffd54f' },
                            { label: '→' },
                            { label: '予約完了', color: '#00e676' },
                        ].map((item, i) =>
                            item.color ? (
                                <span
                                    key={i}
                                    className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                                    style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <span key={i} className="text-nagara-gray text-xs">→</span>
                            )
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-1 flex-wrap mt-2">
                        {[
                            { label: '施工開始', color: '#ab47bc' },
                            { label: '→' },
                            { label: '施工完了', color: '#ffd54f' },
                            { label: '→' },
                            { label: 'レポート', color: '#42a5f5' },
                            { label: '→' },
                            { label: 'レビュー', color: '#ffd54f' },
                            { label: '→' },
                            { label: '決済', color: '#00e676' },
                        ].map((item, i) =>
                            item.color ? (
                                <span
                                    key={i}
                                    className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                                    style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <span key={i} className="text-nagara-gray text-xs">→</span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
