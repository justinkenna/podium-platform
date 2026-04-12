import { Suspense } from "react";
import VerifyEmail from "./VerifyEmail";

export const metadata = {
  title: "Verify Email — Podium",
  description: "Verify your email address to get started with Podium.",
};

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Podium
        </h1>
        <Suspense fallback={<p className="text-gray-500">Loading…</p>}>
          <VerifyEmail />
        </Suspense>
      </div>
    </main>
  );
}
