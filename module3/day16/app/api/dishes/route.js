import { getDishPage } from "@/lib/data";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const data = await getDishPage(
    params.get("page") ?? 1,
    params.get("search") ?? "",
    params.get("category") ?? ""
  );

  return Response.json(data);
}