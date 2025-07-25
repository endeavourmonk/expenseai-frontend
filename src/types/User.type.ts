import { Currency } from "./Currency.type";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  defaultCurrencyId: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  profilePictureUrl: string | null;
  defaultCurrency: Currency;
}
