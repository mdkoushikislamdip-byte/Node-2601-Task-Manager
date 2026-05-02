import React, { useEffect, useRef, useState } from "react";

const OTPVerification = () => {
  const length = 4;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // 🚀 Auto submit when complete
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerify(otp.join(""));
    }
  }, [otp]);

  // Handle change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // Paste full OTP
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });
  };

  // Verify OTP
  const handleVerify = async (code) => {
    if (code.length < 4) return;

    setLoading(true);

    // fake API delay
    setTimeout(() => {
      setLoading(false);
      alert("OTP Verified ✅");
    }, 1500);
  };

  // Resend OTP
  const handleResend = () => {
    setTimer(30);
    setOtp(Array(length).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
      
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-sm text-center">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verify Code
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div
          className="flex justify-center gap-4 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className={`w-14 h-14 text-center text-xl font-bold rounded-xl border
                transition-all duration-200
                ${
                  digit
                    ? "border-blue-500 bg-blue-50 scale-105"
                    : "border-gray-300"
                }
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none`}
            />
          ))}
        </div>

        {/* Loader / Status */}
        {loading && (
          <p className="text-blue-600 text-sm mb-3 animate-pulse">
            Verifying...
          </p>
        )}

        {/* Verify Button (fallback) */}
        <button
          onClick={() => handleVerify(otp.join(""))}
          className="w-full bg-blue-500 text-white py-2.5 rounded-xl font-semibold
                     hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          Verify Manually
        </button>

        {/* Resend */}
        <p className="mt-4 text-sm text-gray-500">
          {timer > 0 ? (
            <>
              Resend in{" "}
              <span className="text-blue-600 font-medium">
                {timer}s
              </span>
            </>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline"
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;