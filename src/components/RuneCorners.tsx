import React from 'react';

interface RuneCornersProps {
  className?: string;
  color?: string;
}

export const RuneCorners: React.FC<RuneCornersProps> = ({ color = '#B99668', className = '' }) => {
  return (
    <>
      {/* Top-Left Rune Corner */}
      <svg
        className={`absolute top-1 left-1 w-5 h-5 pointer-events-none opacity-40 text-[${color}] ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 2 12 V 2 H 12" />
        <path d="M 2 2 L 8 8" />
        <circle cx="8" cy="8" r="1.5" fill={color} />
      </svg>

      {/* Top-Right Rune Corner */}
      <svg
        className={`absolute top-1 right-1 w-5 h-5 pointer-events-none opacity-40 text-[${color}] ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22 12 V 2 H 12" />
        <path d="M 22 2 L 16 8" />
        <circle cx="16" cy="8" r="1.5" fill={color} />
      </svg>

      {/* Bottom-Left Rune Corner */}
      <svg
        className={`absolute bottom-1 left-1 w-5 h-5 pointer-events-none opacity-40 text-[${color}] ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 2 12 V 22 H 12" />
        <path d="M 2 22 L 8 16" />
        <circle cx="8" cy="16" r="1.5" fill={color} />
      </svg>

      {/* Bottom-Right Rune Corner */}
      <svg
        className={`absolute bottom-1 right-1 w-5 h-5 pointer-events-none opacity-40 text-[${color}] ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22 12 V 22 H 12" />
        <path d="M 22 22 L 16 16" />
        <circle cx="16" cy="16" r="1.5" fill={color} />
      </svg>
    </>
  );
};
