'use client';

import React from 'react';

interface HeaderProps {
    title?: string;
    showNotification?: boolean;
}

export default function Header({ title, showNotification = true }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 w-full">
            <div className="glass-card rounded-none border-t-0 border-x-0 px-5 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                <path d="M8 12s1.5 2 4 2 4-2 4-2" />
                                <path d="M9 8.5c0 .28-.22.5-.5.5S8 8.78 8 8.5 8.22 8 8.5 8s.5.22.5.5z" fill="#0a0a0a" />
                                <path d="M16 8.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5z" fill="#0a0a0a" />
                            </svg>
                        </div>
                        {title ? (
                            <h1 className="font-heading text-lg font-bold text-nagara-white">{title}</h1>
                        ) : (
                            <div>
                                <span className="font-heading text-sm font-bold text-nagara-white tracking-wide">NAGARA</span>
                                <span className="font-heading text-sm font-bold text-nagara-green tracking-wide ml-1">CONNECT</span>
                            </div>
                        )}
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-3">
                        {showNotification && (
                            <button className="relative p-2 rounded-xl hover:bg-nagara-card transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-nagara-green rounded-full" />
                            </button>
                        )}
                        <button className="w-8 h-8 rounded-full bg-nagara-card border border-nagara-border overflow-hidden flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
