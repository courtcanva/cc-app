/* eslint-disable require-jsdoc */
interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

interface IUserInfo {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  tokens: IUserToken;
}
class UserTokenService {
  getUserInfo(): IUserInfo | undefined {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(window.localStorage.getItem("UserInfo") as string);
      return userInfo;
    }
  }

  getLocalRefreshToken(): string | undefined {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(window.localStorage.getItem("UserInfo") as string);
      return userInfo?.tokens.refreshToken;
    }
  }

  getLocalAccessToken(): string | undefined {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(window.localStorage.getItem("UserInfo") as string);
      return userInfo?.tokens.refreshToken;
    }
  }

  updateLocalAccessToken(accessToken: string): void {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(window.localStorage.getItem("UserInfo") as string);
      userInfo.tokens.accessToken = accessToken;
      window.localStorage.setItem("UserInfo", JSON.stringify(userInfo));
    }
  }

  removeUser(): void {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("UserInfo");
    }
  }

  setUserToken(userToken: IUserToken | object) {
    if (typeof window !== "undefined") {
      const userInfo = JSON.parse(window.localStorage.getItem("UserInfo") as string);
      userInfo.tokens = userToken;
      window.localStorage.setItem("UserInfo", JSON.stringify(userInfo));
    }
  }
}

export default new UserTokenService();
