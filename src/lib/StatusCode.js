export default class StatusCode {
  static isSuccess(code) {
    return code >= 200 && code <= 226;
  }
}