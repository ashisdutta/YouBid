"use client";
import { useState } from "react";
import { DM_Serif_Display } from "next/font/google";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

export default function SendOtp({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    if (!isOpen) return null;

    return (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f1012] p-6 shadow-2xl backdrop-blur-sm transition-all">
        {step === 'email' ? (
            <div className="space-y-4">
            <h3 className={`${dmSerif.className} text-2xl text-white`}>Verify to Bid</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full sm:flex-1 h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white outline-none focus:border-[#867afe] transition-all placeholder:text-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                    onClick={() => setStep('otp')}
                    className="flex-1 sm:flex-none h-12 px-6 bg-[#867afe] hover:bg-[#a193ff] rounded-xl font-medium"
                >
                    Get Code
                </Button>
                <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-white h-12 px-4">
                    Cancel
                </Button>
                </div>
            </div>
            </div>
        ) : (
            <div className="space-y-4">
            <div className="flex items-baseline gap-2 mb-4">
                <h3 className={`${dmSerif.className} text-2xl text-white whitespace-nowrap`}>
                    Enter Code
                </h3>
                <p className="text-xs text-gray-500 truncate mt-2">
                    Sent to <span className="text-gray-300 font-medium">{email}</span>
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 flex justify-start">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot 
                        key={i} 
                        index={i} 
                        className="w-10 h-12 rounded-lg border-white/10 bg-black/40 text-lg font-bold text-[#867afe]" 
                        />
                    ))}
                    </InputOTPGroup>
                </InputOTP>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button className="flex-1 sm:flex-none h-12 px-8 bg-[#867afe] hover:bg-[#a193ff] rounded-xl font-medium">
                    Verify
                </Button>
                <button 
                    onClick={() => setStep('email')} 
                    className="text-xs text-gray-500 hover:text-white transition px-2"
                >
                    Resend
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}