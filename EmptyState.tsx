import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-clinical-border bg-white px-6 py-14 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clinical-bg">
        <Icon className="h-5 w-5 text-clinical-muted" />
      </div>
      <p className="text-sm font-semibold text-clinical-ink">{title}</p>
      <p className="max-w-sm text-sm text-clinical-muted">{description}</p>
    </div>
  );
}
