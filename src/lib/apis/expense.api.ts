import {
  BaseTransactionParams,
  CreateExpenseDTO,
  toUtcMidnightISOString,
  UpdateExpenseDTO,
} from "@expenseai/expenseai-shared";

import { SERVER_URL } from "../constants";

export const getExpenseFn = async ({
  startDate,
  endDate,
  limit = 1000,
}: BaseTransactionParams) => {
  console.log("params getExpenseFn ------>", startDate, endDate, limit);

  const response = await fetch(
    `${SERVER_URL}/expenses?startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return response.json();
};

export const createExpenseFn = async (data: CreateExpenseDTO) => {
  const payload = {
    ...data,
    date: toUtcMidnightISOString(data.date),
  };

  console.log("data ------>", payload);

  const response = await fetch(`${SERVER_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const updateExpenseFn = async (id: string, data: UpdateExpenseDTO) => {
  const payload = {
    ...data,
    ...(data.date && { date: toUtcMidnightISOString(data.date) }),
  };

  const response = await fetch(`/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json();
};
