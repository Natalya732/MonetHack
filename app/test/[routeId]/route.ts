import { NextRequest, NextResponse } from "next/server";

export const GET = (
  request: NextRequest,
  { params }: { params: { routeId: string } }
) => {
  return NextResponse.json({
    name: "Nikita",
    id: params.routeId,
  });
};
