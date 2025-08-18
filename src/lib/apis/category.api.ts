import { CreateCategoryDTO } from "@expenseai/expenseai-shared";

import { SERVER_URL } from "../constants";

export const createCategoryFn = async (data: CreateCategoryDTO) => {
  const response = await fetch(`${SERVER_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const searchCategoriesFn = async (name: string) => {
  const response = await fetch(`${SERVER_URL}/categories?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};
