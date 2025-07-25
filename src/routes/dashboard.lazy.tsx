import { createLazyFileRoute } from "@tanstack/react-router";

import DashboardPage from "@/pages/DashboardPage";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardPage />;
}
