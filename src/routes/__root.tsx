import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { queryClient } from "@/lib/tanstackQuery";
import { getUserFn } from "@/lib/apis/user";

const RootComponent = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <div className="pt-20">
        <Outlet />
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
