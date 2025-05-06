"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/hooks/useAppStore";

interface AuthCardProps {
  mode: "login" | "signup";
}

export function AuthCard({ mode }: AuthCardProps) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; form?: string }>({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);

  function validate() {
    const errs: typeof errors = {};
    if (mode === "signup" && !form.name.trim()) {
      errs.name = "Name is required.";
    }
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password || form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (mode === "signup" && form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          ...(mode === "signup" ? { name: form.name } : {})
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        // Set a session token cookie for middleware protection
        document.cookie = `token=mock-jwt-token; path=/;`;
        router.replace("/dashboard");
      } else {
        setErrors({ form: data.message || "Authentication failed." });
      }
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">
        {mode === "login" ? "Sign in to GradientSentimentAI" : "Create your account"}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {mode === "signup" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            {errors.name && <span className="text-sm text-red-600 mt-1">{errors.name}</span>}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          {errors.email && <span className="text-sm text-red-600 mt-1">{errors.email}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          {errors.password && <span className="text-sm text-red-600 mt-1">{errors.password}</span>}
        </div>
        {mode === "signup" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              required
            />
            {errors.confirmPassword && <span className="text-sm text-red-600 mt-1">{errors.confirmPassword}</span>}
          </div>
        )}
        {errors.form && <div className="text-sm text-red-600 text-center">{errors.form}</div>}
        <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
          {loading ? (mode === "login" ? "Signing in..." : "Creating account...") : (mode === "login" ? "Sign In" : "Sign Up")}
        </Button>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Don&apos;t have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
          </>
        ) : (
          <>
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
          </>
        )}
      </div>
    </div>
  );
}