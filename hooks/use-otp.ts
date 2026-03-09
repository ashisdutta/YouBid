import { useState } from "react";

export function useOtp() {
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleSendOtp = async (targetEmail: string) => {
        setEmail(targetEmail);
        // Logic to call your Hono API /auth/send-otp
        setStep('otp');
    };

    return { step, setStep, email, otp, setOtp, handleSendOtp };
}