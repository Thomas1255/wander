import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col justify-center gap-4 px-6 py-12 sm:px-10">
      <Badge variant="outline">Phase 0</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">Wander</h1>
      <p className="text-base text-muted-foreground">
        Project foundation. Trip planning will follow in later phases.
      </p>
    </main>
  );
}
