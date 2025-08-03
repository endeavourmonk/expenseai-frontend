import {
  BaseTransactionParams,
  CreateIncomeDTO,
  UpdateIncomeDTO,
  toUtcMidnightISOString,
} from "@expenseai/expenseai-shared";
import { SERVER_URL } from "../constants";

export const getIncomeFn = async ({
  startDate,
  endDate,
  limit = 1000,
}: BaseTransactionParams) => {
  console.log("params getIncomeeFn ------>", startDate, endDate, limit);

  const response = await fetch(
    `${SERVER_URL}/incomes?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch incomes");
  return response.json();
};

export const createIncomeFn = async (data: CreateIncomeDTO) => {
  const payload = {
    ...data,
    date: toUtcMidnightISOString(data.date),
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
    ...(data.date && { date: toUtcMidnightISOString(data.date) }),
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
