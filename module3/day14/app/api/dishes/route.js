import { getDishes } from "@/lib/data";

export async function GET() {
  const dishes = await getDishes();
  return Response.json(dishes);
}