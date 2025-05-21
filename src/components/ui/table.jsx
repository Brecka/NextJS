// components/ui/table.jsx

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Table({ children, className }) {
  return <table className={`w-full caption-bottom text-sm ${className || ''}`}>{children}</table>;
}

export function TableHead({ children, className }) {
  return <thead className={`[&_tr]:border-b ${className || ''}`}>{children}</thead>;
}

export function TableRow({ children, className }) {
  return <tr className={`border-b transition-colors hover:bg-muted/50 ${className || ''}`}>{children}</tr>;
}

export function TableCell({ children, className }) {
  return <td className={`p-4 align-middle ${className || ''}`}>{children}</td>;
}

export function TableHeader({ children, className }) {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className || ''}`}>{children}</th>;
}

export function TableBody({ children, className }) {
  return <tbody className={`[&_tr:last-child]:border-0 ${className || ''}`}>{children}</tbody>;
}
