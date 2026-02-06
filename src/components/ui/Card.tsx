import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export const Card = ({ children, className, hover = true, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'bg-slate-900 border border-white/5 rounded-2xl p-6 transition-all',
                hover && 'hover:border-slate-500 hover:bg-slate-800/80',
                onClick && 'cursor-pointer active:scale-[0.98]',
                className
            )}
        >
            {children}
        </div>
    );
};
