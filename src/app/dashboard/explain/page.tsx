import { DashboardLayout } from "@/components/DashboardLayout";
import { ExplainabilityCard } from "@/components/ExplainabilityCard";

export default function ExplainPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <ExplainabilityCard />
      </div>
    </DashboardLayout>
  );
}