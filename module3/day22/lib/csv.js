// [DAY 47 · EXERCISE 7] CSV export. The escaping is the whole problem:
// any value containing a comma, a quote or a newline must be wrapped in
// quotes, and any quote inside it doubled.
// No "use client" here: toCsv is pure, the download helper only runs in a click handler.

const cell = (value) => {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

// toCsv([{ a: 1, b: 'x,y' }]) -> 'a,b\n1,"x,y"'
// Columns come from the first row's keys; the other rows are read by the same keys.
export function toCsv(rows) {
  if (rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  return [keys, ...rows.map((row) => keys.map((key) => row[key]))]
    .map((line) => line.map(cell).join(","))
    .join("\r\n"); // CRLF is what spreadsheets expect
}

// A Blob, a link, a click. Runs in the browser only.
export function download(text, filename) {
  // The BOM makes Excel read the file as UTF-8 (Amharic names, "·" etc.).
  const blob = new Blob(["\uFEFF", text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url); // release the memory
}
