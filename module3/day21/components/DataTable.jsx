// Server component: a plain table of chart data, for anyone who cannot see the SVG.
// columns: [{ key, label, numeric?, format? }]. The first column is the row header.
export default function DataTable({ caption, columns, rows }) {
  return (
    <div className="table-scroll" role="region" aria-label={caption} tabIndex={0}>
      <table className="data-table compact">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={col.numeric ? "num" : undefined}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((col, c) => {
                const value = col.format ? col.format(row[col.key]) : row[col.key];
                return c === 0 ? (
                  <th key={col.key} scope="row">{value}</th>
                ) : (
                  <td key={col.key} className={col.numeric ? "num" : undefined}>{value}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
