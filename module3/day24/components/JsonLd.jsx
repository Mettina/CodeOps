// [EXERCISE 5] Renders a JSON-LD <script> from a plain object.
// Server component: no client JS, nothing added to the browser bundle.
// "<" is escaped so text from data can never close the script tag early.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
