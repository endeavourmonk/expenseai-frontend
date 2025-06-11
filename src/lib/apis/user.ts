import { SERVER_URL } from "../constants";

export const getUserFn = async () => {
  const res = await fetch(`${SERVER_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  const data = await res.json();
  return data.user;
};
