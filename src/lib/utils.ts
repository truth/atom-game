import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(category: string) {
  switch (category) {
    case 'alkali-metal': return 'bg-red-500/20 border-red-500 text-white hover:bg-red-500/40';
    case 'alkaline-earth-metal': return 'bg-amber-500/20 border-amber-500 text-white hover:bg-amber-500/40';
    case 'transition-metal': return 'bg-pink-500/20 border-pink-500 text-white hover:bg-pink-500/40';
    case 'post-transition-metal': return 'bg-blue-400/20 border-blue-400 text-white hover:bg-blue-400/40';
    case 'metalloid': return 'bg-emerald-500/20 border-emerald-500 text-white hover:bg-emerald-500/40';
    case 'nonmetal': return 'bg-sky-500/20 border-sky-500 text-white hover:bg-sky-500/40';
    case 'halogen': return 'bg-indigo-400/20 border-indigo-400 text-white hover:bg-indigo-400/40';
    case 'noble-gas': return 'bg-purple-500/20 border-purple-500 text-white hover:bg-purple-500/40';
    case 'lanthanide': return 'bg-teal-500/20 border-teal-500 text-white hover:bg-teal-500/40';
    case 'actinide': return 'bg-fuchsia-500/20 border-fuchsia-500 text-white hover:bg-fuchsia-500/40';
    default: return 'bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700';
  }
}
