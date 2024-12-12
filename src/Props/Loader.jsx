import React from "react";

const PercentageRing = ({ percentage }) => {
  const radius = 80;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e0e0e0"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ 
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.35s',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className={`
          ${percentage > 70 ? 'text-red-500' : 
            percentage > 40 ? 'text-yellow-500' : 
            'text-green-500'}
        `}
      />
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        className="text-2xl font-bold"
      >
        {percentage}%
      </text>
    </svg>
  );
};
export default PercentageRing