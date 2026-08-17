import React from 'react';

interface RadarProps {
  dimensions: {
    academic: number;
    background: number;
    language: number;
    experience: number;
    alignment: number;
  };
}

export const ProfileRadar: React.FC<RadarProps> = ({ dimensions }) => {
  const size = 260;
  const center = size / 2;
  const radius = 95;

  const axes = [
    { label: '学术均分 (GPA)', value: dimensions.academic },
    { label: '院校背景平台', value: dimensions.background },
    { label: '语言能力水平', value: dimensions.language },
    { label: '实践与科研', value: dimensions.experience },
    { label: '专业竞争优势', value: dimensions.alignment },
  ];

  const totalAxes = axes.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // 计算多边形顶点坐标
  const getCoordinates = (value: number, index: number, maxVal = 100) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // 生成同心圆网格点
  const levels = [0.25, 0.5, 0.75, 1.0];

  // 生成学生数据多边形路径
  const polygonPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.value, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* 背景网格多边形 */}
        {levels.map((level, levelIdx) => {
          const gridPoints = axes
            .map((_, i) => {
              const angle = i * angleSlice - Math.PI / 2;
              const r = level * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');

          return (
            <polygon
              key={levelIdx}
              points={gridPoints}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={levelIdx < 3 ? '3 3' : 'none'}
            />
          );
        })}

        {/* 轴线 */}
        {axes.map((_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* 学生数据区域 (Filled Area) */}
        <polygon
          points={polygonPoints}
          fill="rgba(217, 119, 6, 0.25)"
          stroke="#d97706"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* 顶点圆点 */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.value, i);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#b45309"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-700"
              />
            </g>
          );
        })}

        {/* 维度文字标签 */}
        {axes.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const labelRadius = radius + 24;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);

          let textAnchor: "end" | "middle" | "start" = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          if (Math.cos(angle) < -0.3) textAnchor = 'end';

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor={textAnchor}
              dominantBaseline="central"
              className="text-[11px] font-medium fill-slate-700 select-none"
            >
              {axis.label}
              <tspan className="font-bold fill-amber-700 text-[11px]" dx="3">
                {axis.value}
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
};
