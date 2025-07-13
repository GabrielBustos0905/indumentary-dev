export type UserType = "ADMIN" | "CLIENT";

export type User = {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
};
