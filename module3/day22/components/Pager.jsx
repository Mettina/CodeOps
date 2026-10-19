import Link from "next/link";

// Numbered pages made of real links: back button, middle-click and crawlers all work.
// hrefFor(page) builds the URL, so sort and other params are kept.
function pageList(page, pages) {
  const wanted = new Set([1, pages, page - 1, page, page + 1]);
  const list = [];
  for (let p = 1; p <= pages; p += 1) {
    if (wanted.has(p)) list.push(p);
    else if (list.at(-1) !== "gap") list.push("gap");
  }
  return list;
}

export default function Pager({ page, pages, total, from, to, noun = "orders", hrefFor }) {
  return (
    <div className="pager">
      <p className="meta">Showing {from}–{to} of {total} {noun}</p>
      {pages > 1 && (
        <nav aria-label="Pagination">
          <ul>
            <li>
              {page > 1 ? (
                <Link href={hrefFor(page - 1)} rel="prev" className="page-link">Previous</Link>
              ) : (
                <span className="page-link disabled" aria-disabled="true">Previous</span>
              )}
            </li>
            {pageList(page, pages).map((item, index) => (
              <li key={`${item}-${index}`}>
                {item === "gap" ? (
                  <span className="page-gap" aria-hidden="true">…</span>
                ) : (
                  <Link
                    href={hrefFor(item)}
                    className={item === page ? "page-link current" : "page-link"}
                    aria-current={item === page ? "page" : undefined}
                    aria-label={`Page ${item}`}
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}
            <li>
              {page < pages ? (
                <Link href={hrefFor(page + 1)} rel="next" className="page-link">Next</Link>
              ) : (
                <span className="page-link disabled" aria-disabled="true">Next</span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
