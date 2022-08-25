import { IGoogleUser } from "@/interfaces/user";

export const googleUserMapping = (item: IGoogleUser) => ({
  userId: item.googleId,
  email: item.email,
  firstName: item.firstName,
  lastName: item.lastName,
});