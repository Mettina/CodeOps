export default function PanelSection({ id, eyebrow, title, children }) {
  return (
    <section className="panel-section" id={id}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}