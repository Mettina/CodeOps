// No directive: only imported by FilterShell, which is already a client component.
export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {["All", ...categories].map((c) => (
        <button
          key={c}
          type="button"
          className={c === selected ? "chip active" : "chip"}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
