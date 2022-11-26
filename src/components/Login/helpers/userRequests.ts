import { api } from "@/utils/axios";

interface updateInfo {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  profileImgUrl?: string;
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error;
  return Object(error);
};

const updateUser = async (updateInfo: updateInfo) => {
  try {
    return await api("/user", {
      method: "put",
      requestData: { ...updateInfo },
    });
  } catch (err) {
    return getErrorMessage(err).response;
  }
};

export { updateUser };
