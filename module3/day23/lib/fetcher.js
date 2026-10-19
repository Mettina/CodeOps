export default async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? `Request failed with status ${response.status}`);
  }

  return data;
}
