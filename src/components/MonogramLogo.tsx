import React from "react";

interface MonogramLogoProps {
  size?: number;
  showBg?: boolean;
  className?: string;
}

export default function MonogramLogo({
  size = 48,
  showBg = false,
  className = "",
}: MonogramLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Background Gradient */}
        <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f1016" />
          <stop offset="100%" stop-color="#06070a" />
        </linearGradient>

        {/* Glowing Monogram Gradient */}
        <linearGradient id="logoMonogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="50%" stop-color="#818cf8" />
          <stop offset="100%" stop-color="#60a5fa" />
        </linearGradient>

        {/* Outer Glow Filter */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Optional Rounded Square Background */}
      {showBg && (
        <rect
          width="512"
          height="512"
          rx="128"
          fill="url(#logoBgGrad)"
          stroke="#ffffff0d"
          strokeWidth="4"
        />
      )}

      {/* Monogram Path */}
      <g filter="url(#logoGlow)" opacity="0.95">
        <path
          d="M 150 145 L 150 367
             M 150 256 L 256 256
             M 256 145 L 256 367
             M 256 145 L 312 265 L 368 145
             M 368 145 L 368 367"
          fill="none"
          stroke="url(#logoMonogramGrad)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
