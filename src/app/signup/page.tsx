import { AuthCard } from "@/components/AuthCard";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-sky-400 to-emerald-300">
      <AuthCard mode="signup" />
    </main>
  );
}