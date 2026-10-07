import { NextResponse } from "next/server";

export function errorResponse(status, code, message, fieldErrors) {
  return NextResponse.json(
    { error: { code, message, ...(fieldErrors && { fieldErrors }) } },
    { status }
  );
}