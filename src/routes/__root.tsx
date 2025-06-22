import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { Toaster } from "sonner";
import { CircleCheck, CircleX } from "lucide-react";
import { queryClient } from "@/lib/tanstackQuery";
import { getUserFn } from "@/lib/apis/user";

const RootComponent = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
        <Navbar />
        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: { zIndex: 9999 }, // ensure it floats above everything
          }}
          icons={{
            success: <CircleCheck size={24} className="text-green-500" />,
            error: <CircleX size={24} className="text-red-500" />,
            // you can also override info, warning, loading, close…
          }}
        />
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async ({ location }) => {
    const { user } = useAuthStore.getState();

    if (!user) {
      try {
        const user = await queryClient.fetchQuery({
          queryKey: ["auth", "currentUser"],
          queryFn: () => getUserFn(),
        });
        useAuthStore.getState().setUser(user);
      } catch (error) {
        console.log("error", error);
        useAuthStore.getState().clearUser();
        if (location.pathname !== "/signin") {
          throw redirect({
            to: "/signin",
            search: { redirect: location.pathname },
          });
        }
      }
    }
  },
});
