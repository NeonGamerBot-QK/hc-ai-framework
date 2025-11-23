import { jest } from "@jest/globals";
import { AiApiWrapper } from "../src/index.js";
import { DEFAULT_BASE_URL } from "../src/constants.js";

describe("AiApiWrapper", () => {
  let client;
  const apiKey = "test-api-key";

  beforeEach(() => {
    // Reset mocks before each test
    global.fetch = jest.fn();
    client = new AiApiWrapper({ apiKey });
  });

  test("initializes with default base URL", () => {
    expect(client.baseUrl).toBe(DEFAULT_BASE_URL);
    expect(client.apiKey).toBe(apiKey);
  });

  test("initializes with custom base URL", () => {
    const customUrl = "https://custom-api.com";
    const customClient = new AiApiWrapper({ apiKey, baseUrl: customUrl });
    expect(customClient.baseUrl).toBe(customUrl);
  });

  describe("V1Api", () => {
    test("getModels calls correct endpoint", async () => {
      const mockResponse = { data: [{ id: "model-1" }] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.v1.getModels();

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/proxy/v1/models`,
        expect.objectContaining({
          headers: expect.objectContaining({
            "User-Agent": expect.stringContaining("Hackclub-Ai-Framework"),
          }),
        }),
      );
      expect(result).toEqual(mockResponse.data);
    });

    test("chatCompletions calls correct endpoint with data", async () => {
      const mockResponse = { id: "chat-1" };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const requestData = {
        model: "test-model",
        messages: [{ role: "user", content: "hello" }],
      };

      const result = await client.v1.chatCompletions(requestData);

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/proxy/v1/chat/completions`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(requestData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("getEmbeddings calls correct endpoint with data", async () => {
      const mockResponse = { data: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const requestData = {
        model: "embed-model",
        input: "test input",
      };

      const result = await client.v1.getEmbeddings(requestData);

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/proxy/v1/embeddings`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(requestData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("moderations calls correct endpoint with data", async () => {
      const mockResponse = { results: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const requestData = { input: "test" };

      const result = await client.v1.moderations(requestData);

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/proxy/v1/moderations`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(requestData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("getStats calls correct endpoint", async () => {
      const mockResponse = { totalRequests: 10 };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.v1.getStats();

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/proxy/v1/stats`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${apiKey}`,
          }),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("createKey calls correct endpoint with data", async () => {
      const mockResponse = { key: "sk-hc-v1-new", name: "new-key", id: "123" };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const requestData = { name: "new-key" };

      const result = await client.v1.createKey(requestData);

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/api/keys`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(requestData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("deleteKey calls correct endpoint with id", async () => {
      const mockResponse = { success: true };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const keyId = "123";

      const result = await client.v1.deleteKey(keyId);

      expect(global.fetch).toHaveBeenCalledWith(
        `${DEFAULT_BASE_URL}/api/keys/${keyId}`,
        expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            Authorization: `Bearer ${apiKey}`,
          }),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    test("methods throw error if apiKey is missing", async () => {
      const noAuthClient = new AiApiWrapper({ apiKey: undefined });

      await expect(noAuthClient.v1.chatCompletions({})).rejects.toThrow(
        "No api key!",
      );
      await expect(noAuthClient.v1.getEmbeddings({})).rejects.toThrow(
        "No api key!",
      );
      await expect(noAuthClient.v1.moderations({})).rejects.toThrow(
        "No api key!",
      );
      await expect(noAuthClient.v1.getStats()).rejects.toThrow("No api key!");
      await expect(noAuthClient.v1.createKey({ name: "test" })).rejects.toThrow(
        "No api key!",
      );
      await expect(noAuthClient.v1.deleteKey("123")).rejects.toThrow(
        "No api key!",
      );
    });
  });
});
