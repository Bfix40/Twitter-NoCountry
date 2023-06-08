const Pie = ({ percentage, colour, size }) => {
  const pct = (percentage / 280) * 100
  const r = size / (pct > 92.5 ? 2.7 : 4)
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - pct) * circ) / 100

  if (!percentage) {
    return null
  }

  return (
    <svg width={size} height={size}>
      <circle
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke={(percentage > 259 && percentage < 280) ? "rgb(255, 212, 0)" : strokePct !== circ ? pct >= 100 ? "#FF0000" : colour : ""}
        strokeWidth={size / 10}
        strokeDasharray={circ}
        strokeDashoffset={pct <= 100 ? strokePct : 0}
      ></circle>
      <circle
        className={strokePct !== circ ? "dark:stroke-white/20 stroke-black/[7%]" : ""}
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        strokeWidth={size / 10}
        strokeDasharray={circ}
        strokeDashoffset={0}
      ></circle>
      <text
        className="dark:fill-white"
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={pct > 100 || (percentage > 259 && percentage <= 280) ? size / 3.5 : size / 6}
      >
        {percentage > 259 && percentage <= 280 ? 280 - percentage : pct > 100 ? -(percentage - 280) : ""}
      </text>
    </svg>
  );
};

export default Pie;
