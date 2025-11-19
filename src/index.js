import { DEFAULT_BASE_URL } from "./constants";
import { V1Api } from "./parts/normal";

export class AiApiWrapper {
  /**
   * @param {import("./types").AiApiWrapperOptions} options
   */
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;
    this.apiKey = apiKey;
    this.v1 = new V1Api(this.baseUrl, this.apiKey);
  }
}
