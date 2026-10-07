import { errorResponse } from "@/lib/errors";
import { validate } from "@/lib/validate";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return errorResponse(422, "VALIDATION_ERROR", "Request body must be valid JSON.", {
      body: "Request body must be valid JSON.",
    });
  }

  const fieldErrors = validate(body);
  if (Object.keys(fieldErrors).length > 0) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Please correct the highlighted fields.",
      fieldErrors
    );
  }

  return Response.json({ order: body }, { status: 201 });
}
