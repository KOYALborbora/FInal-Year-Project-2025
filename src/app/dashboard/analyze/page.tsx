import { DashboardLayout } from "@/components/DashboardLayout";
import { AnalyzeCard } from "@/components/AnalyzeCard";

export default function AnalyzePage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <AnalyzeCard />
      </div>
    </DashboardLayout>
  );
}