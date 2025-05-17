import React, { useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF4C4C'];
const HOVER_COLORS = ['#00e6b8', '#ffd24d', '#ff6666'];

function PieChart({ data}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const pieData = [
    { name: 'Good', value: data.good },
    { name: 'Neutral', value: data.neutral },
    { name: 'Bad', value: data.bad },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsPieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                  (activeIndex === index ? HOVER_COLORS[index] : COLORS[index])
              }
            />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;