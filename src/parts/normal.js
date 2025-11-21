/**
 * POST /proxy/v1/chat/completions
 * POST /proxy/v1/embeddings
 * GET /proxy/v1/models (no auth)
 */

import { USER_AGENT } from "../constants.js";

export class V1Api {
  /**
   * @param {string} baseUrl
   * @param {string} apiKey
   */
  constructor(baseUrl, apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * @returns {Promise<import("../types").Model[]>}
   */
  async getModels() {
    return await fetch(`${this.baseUrl}/proxy/v1/models`, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    })
      .then((r) => r.json())
      .then((d) => d.data);
  }
  async getEmbeddings(data) {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    if (!data) {
      throw new Error("I need some data!");
    }
    return await fetch(`${this.baseUrl}/proxy/v1/embeddings`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
      },
      method: "POST",
    }).then((r) => r.json().then((d) => d.json()));
  }
}
