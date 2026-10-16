import { getDishes } from "@/lib/data";

export async function GET(request) {
  const dishes = await getDishes();
  const search = new URL(request.url).searchParams.get("search")?.trim();

  if (!search) {
    return Response.json(dishes);
  }

  const query = search.toLocaleLowerCase();
  const matches = dishes.filter((dish) =>
    `${dish.name} ${dish.category} ${dish.description}`.toLocaleLowerCase().includes(query)
  );

  return Response.json(matches);
}