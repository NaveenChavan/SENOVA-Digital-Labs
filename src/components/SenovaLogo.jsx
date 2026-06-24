import React from "react";

const SenovaLogo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Hexagon */}
      <path
        d="M24 2.5L42.1865 13V35L24 45.5L5.81346 35V13L24 2.5Z"
        stroke="url(#hexGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner 'S' */}
      <path
        d="M30 18H21.5C19.0147 18 17 20.0147 17 22.5C17 24.9853 19.0147 27 21.5 27H26.5C28.9853 27 31 29.0147 31 31.5C31 33.9853 28.9853 36 26.5 36H18"
        stroke="url(#sGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing Nodes */}
      <circle cx="30" cy="18" r="2.5" fill="#B3CFE5" />
      <circle
        cx="18"
        cy="36"
        r="2.5"
        fill="#50C878"
        className="animate-pulse"
      />

      {/* Gradients */}
      <defs>
        <linearGradient
          id="hexGradient"
          x1="5.8"
          y1="2.5"
          x2="42.1"
          y2="45.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A7FA7" stopOpacity="0.8" />
          <stop offset="1" stopColor="#1A3D63" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id="sGradient"
          x1="17"
          y1="18"
          x2="31"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6FAFD" />
          <stop offset="1" stopColor="#B3CFE5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SenovaLogo;
