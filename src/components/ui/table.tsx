import * as React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full text-sm text-left border-separate border-spacing-y-2">{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-indigo-100 dark:bg-indigo-900">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="bg-white dark:bg-black/60 rounded-xl shadow border-b last:border-b-0">{children}</tr>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2 font-semibold text-indigo-700 dark:text-indigo-300">{children}</th>;
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-2 ${className ?? ""}`}>{children}</td>;
}

export function TableCaption({ children }: { children: React.ReactNode }) {
  return <caption className="text-xs text-muted-foreground mb-2 text-left">{children}</caption>;
}