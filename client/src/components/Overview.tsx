import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Янв",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Фев",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Мар",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Апр",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Май",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Июнь",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Июль",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Авг",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Сен",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Окт",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Ноя",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Дек",
    total: Math.floor(Math.random() * 500) + 100,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#646cff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
