"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-3xl border border-line/80 bg-panel shadow-card", className)}>{children}</div>;
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary" && "bg-accent text-white hover:bg-accent/90",
        variant === "secondary" && "border border-line bg-white text-ink hover:bg-accent.soft",
        variant === "ghost" && "text-slate-600 hover:bg-white",
        className
      )}
      {...props}
    />
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "success" | "warning" | "danger" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    accent: "bg-accent.soft text-accent",
    success: "bg-emerald-50 text-success",
    warning: "bg-amber-50 text-warning",
    danger: "bg-rose-50 text-danger"
  };
  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</div> : null}
        <div className="space-y-1">
          <h1 className="font-serif text-3xl text-ink lg:text-4xl">{title}</h1>
          {description ? <p className="max-w-3xl text-sm text-slate-600">{description}</p> : null}
        </div>
      </div>
      {actions}
    </div>
  );
}

export function StatCard({
  label,
  value,
  helper,
  onClick
}: {
  label: string;
  value: string;
  helper?: string;
  onClick?: string;
}) {
  const content = (
    <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-ink">{value}</div>
      {helper ? <div className="mt-2 text-sm text-slate-500">{helper}</div> : null}
    </Card>
  );
  return onClick ? <Link href={onClick}>{content}</Link> : content;
}

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="p-10 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{description}</p>
    </Card>
  );
}
