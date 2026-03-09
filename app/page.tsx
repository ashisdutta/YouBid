"use client";
import { useState } from "react";
import SendOtp from "@/components/SendOtp";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="relative isolate min-h-screen overflow-hidden font-sans">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
        >
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-5rem] h-96 w-96 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
          <div className="absolute inset-x-0 top-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-12 pt-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#867afe] text-xs font-semibold tracking-tight text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.55)]">
                YB
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                YouBid
              </span>
            </div>

            <div className="flex items-center gap-8">
              <nav className="hidden items-center gap-6 text-sm text-gray-400 md:flex">
                <a href="#" className="transition hover:text-white">
                  Home
                </a>
                <a
                  href="#how-it-works"
                  className="transition hover:text-white"
                >
                  live auctions
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="/signin"
                  className="hidden text-sm text-gray-400 transition hover:text-white md:inline"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className={`${dmSerif.className} inline-flex items-center justify-center rounded-lg bg-[#867afe] px-4 py-2 text-[0.95rem] font-normal text-white shadow-md shadow-[0_0_25px_rgba(134,122,254,0.55)] transition hover:bg-[#a193ff]`}
                >
                  Get started
                </a>
              </div>
            </div>
          </header>

          <main className="mt-10 grid flex-1 gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)] lg:items-center">
            <section className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#0f1012] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-gray-400 shadow-sm backdrop-blur">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Real-time auction insights
              </div>

              <div className="space-y-4">
                <h1
                  className={`${dmSerif.className} max-w-xl text-[clamp(2.8rem,5.5vw,3.8rem)] leading-[1.08] font-normal tracking-[-0.02em] text-white`}
                >
                  Bidding experiences that actually close.
                </h1>
                <p className="max-w-xl text-base text-gray-400 sm:text-lg">
                  Run high-converting auctions with live analytics, guardrails,
                  and automated follow-ups. Catch broken flows and failed bids
                  before your sellers do.
                </p>
              </div>

              <div className="min-h-[60px] w-full max-w-xl"> 
                
                {isOtpOpen ? (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <SendOtp isOpen={isOtpOpen} onClose={() => setIsOtpOpen(false)} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center animate-in fade-in duration-300">
                    <button 
                      onClick={() => setIsOtpOpen(true)}
                      className={`${dmSerif.className} inline-flex items-center justify-center rounded-lg bg-[#867afe] px-8 py-3 text-[1.1rem] font-normal text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.4)] transition hover:bg-[#a193ff]`}
                    >
                      Lets bid
                    </button>
                    
                    <a
                      href="/signin"
                      className={`${dmSerif.className} inline-flex items-center justify-center rounded-lg border border-[#867afe]/50 bg-[#0a0a0b] px-8 py-3 text-[1.1rem] font-normal text-white transition hover:bg-white/5`}
                    >
                      How it works
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Powering auctions for teams at
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-400">MarketSquare</span>
                  <span className="font-medium text-gray-400">BidFlow</span>
                  <span className="font-medium text-gray-400">Hammer.io</span>
                  <span className="font-medium text-gray-400">
                    Northstar Auctions
                  </span>
                </div>
              </div>
            </section>

            <section className="relative">
              <div
                className="pointer-events-none absolute -inset-12 rounded-[2.5rem] bg-[rgba(134,122,254,0.15)] blur-3xl"
                aria-hidden="true"
              />

              <div className="relative rounded-[1.75rem] border border-[rgba(255,255,255,0.08)] bg-[#0f1012] p-4 shadow-[0_0_60px_rgba(15,23,42,0.9)] backdrop-blur">
                <div className="mb-3 flex items-center justify-between rounded-xl bg-[#121318] px-4 py-3 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-medium">Live auction · Luxury watch</span>
                  </div>
                  <span className="rounded-full bg-[#181922] px-2 py-0.5 text-[0.65rem] font-medium text-gray-300">
                    ENDS IN 02:13
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                  <div className="space-y-3 rounded-xl bg-[#101117] p-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Current bid</span>
                      <span># of bidders</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-semibold text-white">
                          $12,450
                        </p>
                        <p className="text-xs text-emerald-400">
                          +18% vs last auction
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-300">32</p>
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-[0.7rem] text-gray-400">
                        <span>Conversion to paid</span>
                        <span>84%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-4/5 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl bg-[#101117] p-3 text-xs text-gray-300">
                    <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Live signals
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2 rounded-lg bg-[#14151d] px-2 py-1.5">
                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <div className="flex-1">
                          <p className="text-[0.7rem] font-medium">
                            High-intent bidder joined
                          </p>
                          <p className="text-[0.65rem] text-gray-400">
                            Auto-extend window enabled
                          </p>
                        </div>
                        <span className="text-[0.6rem] text-gray-500">
                          00:14
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2 rounded-lg bg-[#14151d]/80 px-2 py-1.5">
                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <div className="flex-1">
                          <p className="text-[0.7rem] font-medium">
                            Drop-off detected on payment step
                          </p>
                          <p className="text-[0.65rem] text-gray-400">
                            Triggering backup payment flow
                          </p>
                        </div>
                        <span className="text-[0.6rem] text-gray-500">
                          03:02
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2 rounded-lg bg-[#14151d]/60 px-2 py-1.5">
                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <div className="flex-1">
                          <p className="text-[0.7rem] font-medium">
                            New cohort experiment
                          </p>
                          <p className="text-[0.65rem] text-gray-400">
                            Reserve price variant shipped
                          </p>
                        </div>
                        <span className="text-[0.6rem] text-gray-500">
                          12:27
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
