import TransactionForm from "@/components/forms/TransactionForm";
// import DashboardPage from "@/pages/DashboardPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  // return <DashboardPage />;
  return (
    <div className="space-y-6">
      <TransactionForm />
    </div>
  );
}
