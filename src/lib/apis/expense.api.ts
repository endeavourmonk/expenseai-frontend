import {
  CreateExpenseDTO,
  toUtcMidnightISOString,
  UpdateExpenseDTO,
} from "@expenseai/expenseai-shared";

import { SERVER_URL } from "../constants";

export const getExpenseFn = async () => {
  const response = await fetch(`${SERVER_URL}/expenses`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return response.json();
};

export const createExpenseFn = async (data: CreateExpenseDTO) => {
  const payload = {
    ...data,
    date: toUtcMidnightISOString(data.date),
    // date:
    //   data.date instanceof Date
    //     ? new Date(
    //         Date.UTC(
    //           data.date.getFullYear(),
    //           data.date.getMonth(),
    //           data.date.getDate()
    //         )
    //       ).toISOString()
    //     : data.date,
  };

  console.log("data ------>", payload);
  // return data;

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
