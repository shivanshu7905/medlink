import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function PatientPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { name?: string; email?: string; role?: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
      <div className="bg-white rounded-2xl shadow-[0px_20px_40px_rgba(13,28,46,0.06)] p-10 space-y-4 text-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-2">
          <span className="text-2xl">🏥</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0d1c2e]">Patient Dashboard</h1>
        <p className="text-[#464555]">
          Welcome back, <span className="font-semibold">{user.name}</span>
        </p>
        <p className="text-sm text-zinc-400">{user.email}</p>
        <div className="pt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
