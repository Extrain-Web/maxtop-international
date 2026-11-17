"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { api, errMsg } from "../_lib/client";
import { Button, Input } from "../_components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // already logged in → go to dashboard
  useEffect(() => {
    api("/auth/me")
      .then(() => router.replace("/admin"))
      .catch(() => {});
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/auth/login", { body: { email, password } });
      router.replace("/admin");
    } catch (err) {
      setError(errMsg(err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-[#071D2E] text-white p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center font-black">M</div>
          <span className="font-bold">Maxtop International</span>
        </div>
        <div className="relative space-y-4 max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Website er sob kichu ek jaygay theke control korun.</h1>
          <p className="text-slate-300">Products, services, chobi, 4 bhashar text, SEO ar buyer der inquiry — sob ekhane.</p>
        </div>
        <p className="relative text-xs text-slate-400">© Maxtop International Ltd.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-sm text-slate-500">Apnar admin email ar password din.</p>
          </div>

          {error && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5">{error}</div>}

          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">Email</span>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">Password</span>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-11"
                />
              </div>
            </label>
          </div>
          <Button type="submit" loading={loading} className="w-full h-11">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
