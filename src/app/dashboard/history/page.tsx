import { DashboardLayout } from "@/components/DashboardLayout";
import { HistoryTable } from "@/components/HistoryTable";

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <HistoryTable />
      </div>
    </DashboardLayout>
  );
}