import SignInPage from "@/pages/SigninPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/signin")({
  component: SignInPage,
});
