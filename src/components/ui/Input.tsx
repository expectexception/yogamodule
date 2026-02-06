import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="space-y-2 w-full">
                {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        'w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-slate-500 transition-all placeholder:text-slate-600',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
