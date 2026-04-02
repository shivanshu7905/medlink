"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      setSuccess(true);
      setMessage("Login successful");
      router.push("/dashboard");
    } else {
      setSuccess(false);
      setMessage("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f8f9ff] text-[#0d1c2e] overflow-x-hidden">

      {/* Header */}
      <header className="w-full sticky top-0 z-50 bg-[#f8f9ff]">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">MedLink</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center w-full px-6 py-20 relative">

        {/* Background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3525cd]/5 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#58579b]/5 rounded-full blur-[128px] -z-10" />

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-extrabold mb-3">
              Welcome back.
            </h1>
            <p className="text-[#464555] text-lg">
              Login to access your MedLink dashboard.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-[0px_20px_40px_rgba(13,28,46,0.06)] overflow-hidden">
            <div className="p-8">

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#d5e3fc]/30 rounded-lg outline-none"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full px-4 py-3 bg-[#d5e3fc]/30 rounded-lg outline-none"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 bg-[#3525cd] text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              {/* Message */}
              {message && (
                <p
                  className={`text-sm text-center mt-4 font-medium ${success ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-[#464555] mt-6">
            Don&apos;t have an account?{" "}
            <a href="/register" className="font-bold text-[#3525cd]">
              Register
            </a>
          </p>

        </div>
      </main>
    </div>
  );
}