import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function SignUpPage() {
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
              Create your YouBid account
            </h1>
            <p className="text-sm text-gray-400">
              Set up in a few seconds. Start running auctions with live
              visibility and guardrails.
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-400"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#101117] px-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-500 focus:border-[#867afe] focus:outline-none"
                placeholder="Alex Rivera"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-400"
              >
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#101117] px-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-500 focus:border-[#867afe] focus:outline-none"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-gray-400"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#101117] px-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-500 focus:border-[#867afe] focus:outline-none"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              className={`${dmSerif.className} mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#867afe] px-4 py-2.5 text-[0.95rem] font-normal text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.55)] transition hover:bg-[#a193ff]`}
            >
              Create account
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

