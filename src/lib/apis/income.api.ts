import dayjs from "dayjs";
import { CreateIncomeDTO, UpdateIncomeDTO } from "shared/dist";
import { SERVER_URL } from "../constants";

export const getIncomeFn = async () => {
  const response = await fetch(`${SERVER_URL}/incomes`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch incomes");
  return response.json();
};

export const createIncomeFn = async (data: CreateIncomeDTO) => {
  const payload = {
    ...data,
    date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ssZ"),
  };

  const response = await fetch(`${SERVER_URL}/incomes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateIncomeFn = async (id: string, data: UpdateIncomeDTO) => {
  const payload = {
    ...data,
    ...(data.date && { date: dayjs(data.date).format("YYYY-MM-DDTHH:mm:ssZ") }),
  };

  const response = await fetch(`/api/incomes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json();
};
