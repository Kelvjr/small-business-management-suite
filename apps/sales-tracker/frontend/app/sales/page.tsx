import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SalesPageContent } from "@/components/sales/sales-page-content";
import { Topbar } from "@/components/dashboard/topbar";
import { fetchSales } from "@/lib/api";

type SalesPageProps = {
  searchParams: Promise<{
    category?: string;
    paymentStatus?: string;
    search?: string;
  }>;
};

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const params = await searchParams;

  const sales = await fetchSales({
    category: params.category,
    paymentStatus: params.paymentStatus,
    search: params.search,
  });

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <div className="flex-1 p-4 lg:p-6">
            <SalesPageContent sales={sales} />
          </div>
        </div>
      </div>
    </main>
  );
}
