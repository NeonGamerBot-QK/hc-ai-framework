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
  /**
   * 
   * @param {import("../types").EmbeddingProps} data 
   * @returns {Promise<import("../types").EmbeddingsResponse>}
   */
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
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
  }

  /**
   * 
   * @param {import("../types").ChatCompletionRequest} data 
   * @returns {Promise<import("../types").ChatCompletionResponse>}
   */
  async chatCompletions(data) {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    if (!data) {
      throw new Error("I need some data!");
    }
    return await fetch(`${this.baseUrl}/proxy/v1/chat/completions`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
  }

  /**
   * 
   * @param {import("../types").ModerationRequest} data 
   * @returns {Promise<import("../types").ModerationResponse>}
   */
  async moderations(data) {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    if (!data) {
      throw new Error("I need some data!");
    }
    return await fetch(`${this.baseUrl}/proxy/v1/moderations`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
  }

  /**
   * 
   * @returns {Promise<import("../types").StatsResponse>}
   */
  async getStats() {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    return await fetch(`${this.baseUrl}/proxy/v1/stats`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
      },
    }).then((r) => r.json());
  }

  /**
   * 
   * @param {import("../types").CreateKeyRequest} data 
   * @returns {Promise<import("../types").CreateKeyResponse>}
   */
  async createKey(data) {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    if (!data) {
      throw new Error("I need some data!");
    }
    return await fetch(`${this.baseUrl}/api/keys`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
  }

  /**
   * 
   * @param {string} id 
   * @returns {Promise<import("../types").DeleteKeyResponse>}
   */
  async deleteKey(id) {
    if (!this.apiKey) {
      throw new Error("No api key!");
    }
    if (!id) {
      throw new Error("I need an id!");
    }
    return await fetch(`${this.baseUrl}/api/keys/${id}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Bearer ${this.apiKey}`,
      },
      method: "DELETE",
    }).then((r) => r.json());
  }
}
