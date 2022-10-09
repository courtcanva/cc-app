import { useHandleLocalStorageItem } from "@/hooks/useHandleLocalStorage";

/* eslint-disable require-jsdoc */
interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } =
  useHandleLocalStorageItem();

// avoid using any type at catch-error
const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error;
  return Object(error);
};
class UserTokenService {
  getLocalRefreshToken(): string | undefined {
    try {
      const userInfo = getLocalStorageItem("UserInfo");
      return userInfo.tokens.refreshToken;
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  }

  getLocalAccessToken(): string | undefined {
    try {
      const userInfo = getLocalStorageItem("UserInfo");
      return userInfo.tokens.accessToken;
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  }

  updateLocalAccessToken(accessToken: string): void {
    try {
      const userInfo = getLocalStorageItem("UserInfo");
      userInfo.tokens.accessToken = accessToken;
      setLocalStorageItem("UserInfo", userInfo);
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  }

  removeUser(): void {
    try {
      removeLocalStorageItem("UserInfo");
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  }

  setUserToken(userToken: IUserToken | object) {
    try {
      const userInfo = getLocalStorageItem("UserInfo");
      userInfo.tokens = userToken;
      setLocalStorageItem("UserInfo", userInfo);
    } catch (error) {
      const err = getErrorMessage(error);
      return err.response;
    }
  }
}

export default new UserTokenService();
