import { SERVER_URL } from "@/lib/constants";
import { CreateIncomeDTO, UpdateIncomeDTO } from "@/types/Income.type";

export const createIncome = async (data: CreateIncomeDTO) => {
  const response = await fetch(`${SERVER_URL}/incomes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateIncome = async (id: string, data: UpdateIncomeDTO) => {
  const response = await fetch(`/api/incomes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
};
