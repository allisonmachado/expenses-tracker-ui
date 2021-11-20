import ConnectivityError from "../../lib/ConnectivityError";
import ResponseStatusMap from "../../lib/ResponseStatusMap";

export default class BaseFetch {
  constructor(baseUrl, defaultErrorMapper) {
    this.baseUrl = baseUrl;
    this.defaultErrorMapper = defaultErrorMapper;
  }

  async fetch({ path, options, errorMapper }) {
    let response;
    try {
      response = await fetch(this.baseUrl + (path ?? ""), options);
    } catch (e) {
      throw new ConnectivityError("It was not possible to communicate with our servers. Please, try again later.");
    }
    ResponseStatusMap.assertSuccess(response, errorMapper ?? this.defaultErrorMapper);
    return response;
  }
}
