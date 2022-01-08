import ResponseStatusMap from "../../lib/ResponseStatusMap";
import BaseFetch from "./BaseFetch";

export default class ExpenseFetch extends BaseFetch {
  constructor(baseUrl) {
    super(baseUrl + "/expenses", ResponseStatusMap.DEFAULT_ERROR_MAP);
  }

  async getAll(accessToken) {
    const method = "GET";
    const headers = new Headers({
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });

    const response = await this.fetch({ options: { method, headers } });

    return response.json();
  }

  async getById(id, accessToken) {
    const method = "GET";
    const headers = new Headers({
      "Authorization": `Bearer ${accessToken}`
    });

    const response = await this.fetch({
      path: `/${id}`,
      options: { method, headers }
    });

    return response.json();
  }

  async create(user, accessToken) {
    const method = "POST";
    const headers = new Headers({
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });
    const body = JSON.stringify(user);

    const response = await this.fetch({ options: { method, headers, body } });

    return response.json();
  }

  async update(expense, accessToken) {
    const { _id, ...expenseRest } = expense;
    const method = "PUT";
    const headers = new Headers({
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });
    const body = JSON.stringify(expenseRest);

    await this.fetch({
      path: `/${_id}`,
      options: { method, headers, body }
    });
  }

  async delete(id, accessToken) {
    const method = "DELETE";
    const headers = new Headers({ "Authorization": `Bearer ${accessToken}` });

    await this.fetch({
      path: `/${id}`,
      options: { method, headers }
    });
  }

  async clone({ sourceDate, targetDate }, accessToken) {
    const method = "POST";
    const headers = new Headers({
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });
    const body = JSON.stringify({ sourceDate, targetDate });

    await this.fetch({
      path: "/clone",
      options: { method, headers, body }
    });
  }
}
