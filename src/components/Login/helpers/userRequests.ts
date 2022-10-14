import { api } from "@/utils/axios";

interface updateInfo {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

const updateUser = async (updateInfo: updateInfo) => {
  return await api("/user", {
    method: "put",
    requestData: { ...updateInfo },
  });
};

export { updateUser };
