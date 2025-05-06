import { DashboardLayout } from "@/components/DashboardLayout";
import { UploadCard } from "@/components/UploadCard";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <UploadCard />
      </div>
    </DashboardLayout>
  );
}