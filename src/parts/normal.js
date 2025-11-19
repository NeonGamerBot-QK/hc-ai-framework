/**
 * POST /proxy/v1/chat/completions
 * POST /proxy/v1/embeddings
 * GET /proxy/v1/models (no auth)
 */

export class V1Api {
  constructor(baseUrl, apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  async getModels() {
    fetch(`${this.baseUrl}/`);
  }
}
