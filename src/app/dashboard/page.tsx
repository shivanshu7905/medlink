import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-600 text-lg">Not logged in.</p>
      </div>
    );
  }

  const user = session.user as { name?: string; email?: string; role?: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="bg-white rounded-2xl shadow p-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-600">
          Welcome <span className="font-semibold">{user.name}</span>{" "}
          <span className="text-zinc-400">({user.role})</span>
        </p>
        <p className="text-sm text-zinc-400">{user.email}</p>
      </div>
    </div>
  );
}
