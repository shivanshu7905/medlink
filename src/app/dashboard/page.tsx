import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as any).role;

  if (role === "doctor") {
    redirect("/doctor");
  }

  if (role === "patient") {
    redirect("/patient");
  }

  // Fallback for any other role (e.g. admin)
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="bg-white rounded-2xl shadow p-8 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-600">
          Welcome <span className="font-semibold">{session.user.name}</span>
        </p>
        <p className="text-sm text-zinc-400">{session.user.email}</p>
      </div>
    </div>
  );
}
