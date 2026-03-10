"use client"
import {useState} from "react"
import { DM_Serif_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/signin`, {email, password});
      router.push("/dashboard")
    } catch (error:any) {
      setError(error.response.data.error || "an error occured");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
        >
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-5rem] h-96 w-96 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#0f1012] p-6 shadow-[0_0_60px_rgba(15,23,42,0.9)] backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#867afe] text-xs font-semibold tracking-tight text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.55)]">
                YB
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                YouBid
              </span>
            </div>
            <a
              href="/"
              className="text-xs text-slate-400 transition hover:text-slate-200"
            >
              Back to homepage
            </a>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400">
              Sign in to manage your auctions, bidders, and payouts.
            </p>
          </div>

          <form className="mt-6 space-y-4"
          onSubmit={handleSignin}
          >
            <div className="space-y-1.5">
              {error?<p className="text-center text-red-400">{error}</p>:""}
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-400"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#101117] px-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-500 focus:border-[#867afe] focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-gray-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-400 transition hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#101117] px-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-500 focus:border-[#867afe] focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>

            <button
              type="submit"
              className={`${dmSerif.className} mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#867afe] px-4 py-2.5 text-[0.95rem] font-normal text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.55)] transition hover:bg-[#a193ff]`}
            >
              Sign in
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            New to YouBid?{" "}
            <a
              href="/"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

