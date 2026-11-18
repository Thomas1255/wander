// Application liveness only: this does not check a database or external service.
export function GET() {
  return Response.json(
    { status: "ok", name: "Wander" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
