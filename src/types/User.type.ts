export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
