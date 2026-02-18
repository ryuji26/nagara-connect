import React from 'react';

// 艶アイコン（Gloss）
export function GlossIcon({ size = 24, color = '#00e676' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
            <path d="M7 12c0-2.76 2.24-5 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="9" r="1.5" fill={color} opacity="0.6" />
            <circle cx="12" cy="7" r="1" fill={color} opacity="0.4" />
            <path d="M15 15c-1 1-2.5 1.5-4 1" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

// 撥水アイコン（Water Repellent）
export function WaterRepellentIcon({ size = 24, color = '#42a5f5' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 5 10 5 14.5C5 18.64 8.13 22 12 22C15.87 22 19 18.64 19 14.5C19 10 12 2 12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 14c0-1.66 1.34-3 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <circle cx="10" cy="12.5" r="0.8" fill={color} opacity="0.5" />
        </svg>
    );
}

// コーティングアイコン（Coating）
export function CoatingIcon({ size = 24, color = '#ffa726' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="10" rx="3" stroke={color} strokeWidth="1.5" />
            <path d="M4 12h16" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <path d="M8 5l2 3M14 5l2 3M11 4l1 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M6 15c2-1 4-1 6 0s4 1 6 0" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        </svg>
    );
}

// 洗浄力アイコン（Cleaning Power）
export function CleaningPowerIcon({ size = 24, color = '#ab47bc' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" />
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M5.64 18.36l2.83-2.83M15.54 8.46l2.83-2.83" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

// スピードアイコン（Speed）
export function SpeedIcon({ size = 24, color = '#ef5350' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

// 接客アイコン（Service）
export function ServiceIcon({ size = 24, color = '#ffd54f' }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={color} strokeWidth="1.5" />
        </svg>
    );
}

// 星評価アイコン
export function StarIcon({ size = 16, filled = false, color = '#ffd54f' }: { size?: number; filled?: boolean; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

// ながら洗車ロゴマーク
export function NagaraLogo({ size = 40 }: { size?: number }) {
    return (
        <div
            className="gradient-green rounded-xl flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <span className="font-heading font-black text-nagara-black" style={{ fontSize: size * 0.4 }}>N</span>
        </div>
    );
}
