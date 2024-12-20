import React from 'react';

const BarChart = ({ data }) => {
  const maxDataValue = Math.max(...data.map(d => d.value || 0));

  return (
    <svg width="500" height="300" viewBox="0 0 500 300">
      {data.map((d, i) => {
        const barHeight = (d.value / maxDataValue) * 250;
        return (
          <g key={i} transform={`translate(${i * 60 + 50}, 0)`}>
            <rect
              x="0"
              y={300 - barHeight - 30}
              width="40"
              height={barHeight}
              fill="#F9CCB9"
            />
            <text
              x="20"
              y={300 - barHeight - 10}
              textAnchor="middle"
              fontSize="15"
              fill="#333"
            >
              {d.value || 0}
            </text>
            <text
              x="20"
              y="290"
              textAnchor="middle"
              fontSize="15"
              fill="#333"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChart;
