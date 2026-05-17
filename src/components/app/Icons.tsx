import * as LucideIcons from "lucide-react";

const nameToComponent: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: string }>> = {};

function toPascalCase(name: string) {
  return name.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
}

export function Icon({ name, size = 16, strokeWidth = 1.75 }: { name: string; size?: number; strokeWidth?: number }) {
  const key = toPascalCase(name);
  if (!nameToComponent[key]) {
    nameToComponent[key] = (LucideIcons as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[key];
  }
  const Comp = nameToComponent[key];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={strokeWidth} aria-hidden="true" className="icon-glyph" />;
}
