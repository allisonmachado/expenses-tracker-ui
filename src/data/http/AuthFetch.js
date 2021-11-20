import ResponseStatusMap from "../../lib/ResponseStatusMap";
import BaseFetch from "./BaseFetch";

export default class AuthFetch extends BaseFetch {
  constructor(baseUrl) {
    super(baseUrl + "/auth", ResponseStatusMap.AUTH_ERROR_MAP);
  }

  async authenticateUser(email, password, recaptchaToken) {
    const method = "POST";
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify({ email, password, recaptchaToken });

    const response = await this.fetch({ options: { method, headers, body } });
    return response.json();
  }
}
