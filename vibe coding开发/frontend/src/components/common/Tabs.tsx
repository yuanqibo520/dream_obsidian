import { cn } from "../../lib/cn";

type TabItem<T extends string> = {
  label: string;
  value: T;
};

type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Tabs<T extends string>({ items, value, onChange }: TabsProps<T>) {
  return (
    <div className="inline-flex rounded-xl bg-white/60 p-1">
      {items.map((item) => (
        <button
          key={item.value}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition",
            item.value === value ? "bg-primary text-white shadow-soft" : "text-muted hover:text-ink",
          )}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
