import React from "react";

const PercentageRing = ({ percentage }) => {
  // Function to determine dynamic color
  const getRingColor = (percentage) => {
    const hue = (percentage / 100) * 120; // Calculate hue from red (0) to green (120)
    return `hsl(${hue}, 100%, 50%)`;
  };

  const radius = 75; // Radius of the circle
  const stroke = 10; // Stroke width
  const normalizedRadius = radius - stroke / 2; // Adjusted radius
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Calculate stroke offset

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2} className="block">
        {/* Background Circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Dynamic Circle */}
        <circle
          stroke={getRingColor(percentage)}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Percentage Text */}
      <span className="mt-4 text-xl font-bold text-black dark:text-white" style={{ color: getRingColor(percentage) }}>
        {`${percentage ? percentage : 0}%`}
      </span>
    </div>
  );
};

export default PercentageRing;
