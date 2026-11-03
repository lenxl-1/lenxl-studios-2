import React from "react";

interface LenxlLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function LenxlLogo({ size = 28, className = "", ...props }: LenxlLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      {...props}
    >
      <defs>
        {/* Purple gradient for the 3D loop ribbon fold */}
        <linearGradient
          id="lenxl-purple-front"
          x1="105"
          y1="130"
          x2="160"
          y2="155"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="25%" stopColor="#6b21a8" />
          <stop offset="60%" stopColor="#9333ea" />
          <stop offset="85%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>

        <linearGradient
          id="lenxl-purple-back"
          x1="125"
          y1="95"
          x2="155"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2e1065" />
          <stop offset="40%" stopColor="#581c87" />
          <stop offset="80%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <linearGradient
          id="lenxl-purple-sheen"
          x1="110"
          y1="148"
          x2="155"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
        </linearGradient>

        {/* Soft shadow for depth under the fold */}
        <filter id="lenxl-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#9333ea" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#lenxl-glow)">
        {/* Rear shaded loop turning behind */}
        <path
          d="M 132 94 C 132 94, 142 108, 149 122 C 153 130, 153 138, 148 144 C 143 150, 134 153, 124 149 C 117 146, 105 137, 102 135 L 115 125 C 118 127, 126 133, 131 135 C 135 137, 139 135, 141 132 C 143 128, 140 120, 135 112 C 131 106, 127 100, 127 100 Z"
          fill="url(#lenxl-purple-back)"
        />

        {/* Dynamic purple front ribbon fold */}
        <path
          d="M 102 135 C 112 142, 128 152, 140 148 C 149 145, 154 135, 151 124 C 147 110, 136 94, 136 94 L 144 102 C 152 118, 157 131, 151 143 C 145 153, 130 158, 115 151 C 106 147, 98 141, 98 141 Z"
          fill="url(#lenxl-purple-front)"
        />

        {/* Purple ribbon specular sheen */}
        <path
          d="M 104 137 C 115 145, 128 151, 138 147 C 145 144, 149 137, 148 129 C 145 121, 139 111, 139 111 C 139 111, 145 120, 147 127 C 148 133, 145 139, 138 142 C 129 145, 117 141, 104 137 Z"
          fill="url(#lenxl-purple-sheen)"
        />

        {/* Main Triangular Delta Loop Contour */}
        {/* Outer path */}
        <path
          d="M 98 46 
             C 102 38, 114 38, 118 46
             L 142 98
             C 144 103, 143 109, 139 113
             L 125 125
             C 120 129, 113 131, 107 129
             L 74 121
             C 65 119, 61 109, 66 101
             Z"
          className="fill-none stroke-foreground"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Smooth Inner cutout line for the hollow triangle loop */}
        <path
          d="M 108 58 
             L 126 95
             C 127 98, 126 101, 123 103
             L 112 111
             C 109 113, 106 113, 103 112
             L 81 106
             C 78 105, 76 102, 78 99
             L 100 60
             C 102 56, 106 55, 108 58 Z"
          className="fill-background stroke-foreground/40"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default LenxlLogo;
