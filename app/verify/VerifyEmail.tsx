"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please use the link from your email.");
      return;
    }

    setStatus("loading");

    fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message ?? "Your email has been verified!");
        } else {
          setStatus("error");
          setMessage(data.error ?? "Verification failed. Please try again.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      });
  }, [token]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="space-y-3">
        <div className="flex justify-center">
          <span className="inline-block w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
        <p className="text-gray-500">Verifying your email…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <div className="text-green-500 text-5xl">✓</div>
        <p className="text-lg font-medium text-gray-900">Email verified!</p>
        <p className="text-gray-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-red-500 text-5xl">✗</div>
      <p className="text-lg font-medium text-gray-900">Verification failed</p>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
