import Link from "next/link";

// The empty state: why it is empty, and what to do next (always a link).
export default function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{children}</p>
      {action && <Link href={action.href} className="button">{action.label}</Link>}
    </div>
  );
}
