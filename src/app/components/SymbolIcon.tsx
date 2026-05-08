type Props = {
  name: string;
  className?: string;
};

const glyphs: Record<string, string> = {
  menu: "☰",
  expand_more: "⌄",
  spa: "✦",
  king_bed: "🛏",
  shower: "🛁",
  groups: "👥",
  wifi: "Wi‑Fi",
  countertops: "⌂",
  thermostat: "❋",
  checkroom: "◇",
  directions_walk: "↗",
  waves: "≈",
  arrow_back_ios: "←",
  arrow_forward_ios: "→",
  calendar_month: "◫",
  close: "✕",
  star: "★",
};

export default function SymbolIcon({ name, className }: Props) {
  return (
    <span aria-hidden="true" className={className}>
      {glyphs[name] ?? "•"}
    </span>
  );
}
