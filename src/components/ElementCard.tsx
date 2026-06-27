import React from 'react';
import { Element } from '../data/elements';
import { cn, getCategoryColor } from '../lib/utils';
import { motion } from 'motion/react';

interface ElementCardProps {
  element: Element;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
}

export function ElementCard({ element, onClick, className, style, selected }: ElementCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={!onClick}
      style={style}
      className={cn(
        'relative flex flex-col items-center justify-center p-2 rounded-xl border-2 shadow-sm transition-colors text-left focus:outline-none w-20 h-24',
        getCategoryColor(element.category),
        selected ? 'ring-4 ring-offset-2 ring-indigo-500 ring-offset-slate-900' : '',
        !onClick && 'cursor-default hover:scale-100 hover:bg-opacity-20',
        className
      )}
    >
      <span className="absolute top-1 right-1 md:right-2 text-[9px] md:text-xs font-bold opacity-80 leading-none">
        {element.atomicNumber}
      </span>
      <span className="text-lg md:text-xl lg:text-2xl font-black my-0 flex-1 flex items-center justify-center drop-shadow-[0_0_8px_currentColor] brightness-125">
        {element.symbol}
      </span>
      <span className="text-[8px] md:text-[10px] lg:text-xs font-bold truncate w-full text-center opacity-90 leading-tight">
        {element.name}
      </span>
    </motion.button>
  );
}
