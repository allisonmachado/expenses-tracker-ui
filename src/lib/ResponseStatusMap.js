import ClientError from "./ClientError";
import StatusCode from "./StatusCode";

export default class ResponseStatusMap {
  static DEFAULT_ERROR_MAP = {
    400: "Verify all mandatory fields and formats",
    401: "User needs to be authenticated to perform this action",
    403: "You are not authorized to perform this action",
    404: "Requested resource not found",
    409: "The email provided is not unique in the system"
  }

  static AUTH_ERROR_MAP = {
    400: "Invalid email or password",
  }

  static assertSuccess(response, errorMap) {
    const error = errorMap[response.status];
    if (error) {
      throw new ClientError(response.status, error);
    }
    if (!response.ok || !StatusCode.isSuccess(response.status)) {
      throw new Error("An error occurred, please try again later");
    }
  }
}
