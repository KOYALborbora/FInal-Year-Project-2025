import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to the Upload page by default
  redirect("/dashboard/upload");

  return null;
}