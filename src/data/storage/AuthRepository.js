import jwt_decode from "jwt-decode";

import { ACCESS_TOKEN_KEY } from "../../lib/Constants";

export default class AuthRepository {
  saveAccessToken(jwt) {
    localStorage.setItem(ACCESS_TOKEN_KEY, jwt);
  }

  deleteAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getAuthenticatedUser() {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!accessToken) {
        return null;
      }
      const decodedToken = jwt_decode(accessToken);
      if (this._isTokenExpired(decodedToken.exp)) { // expired
        this.deleteAccessToken();
        return null;
      }
      return this._decodeUser(decodedToken, accessToken);
    } catch (error) {
      console.error("Error while trying to retrieve user info from jwt: ", error);
    }
  }

  _decodeUser(decodedToken, rawToken) {
    delete decodedToken.iat;
    decodedToken.accessToken = rawToken;
    return decodedToken;
  }

  _isTokenExpired(tokenExpiration) {
    return Date.now() > (tokenExpiration * 1000);
  }
}
