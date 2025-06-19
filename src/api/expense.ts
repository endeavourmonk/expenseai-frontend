import { SERVER_URL } from "@/lib/constants";
import { CreateExpenseDTO, UpdateExpenseDTO } from "@/types/Expnese.type";

export const createExpense = async (data: CreateExpenseDTO) => {
  const response = await fetch(`${SERVER_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateExpense = async (id: string, data: UpdateExpenseDTO) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
};
