/**
 * Configuration options for the AiApiWrapper
 */
export interface AiApiWrapperOptions {
  /**
   * The base URL for the API.
   * Defaults to "https://ai.hackclub.com"
   */
  baseUrl?: string;

  /**
   * The API key for authentication
   */
  apiKey?: string;
}

/**
 * Represents a model returned by the API
 */
export interface Model {
  id: string;
  canonical_slug: string;
  hugging_face_id: string;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: Topprovider;
  per_request_limits?: any;
  supported_parameters: string[];
  default_parameters: Defaultparameters;
}

export interface Defaultparameters {
  temperature?: number;
  top_p?: number;
  frequency_penalty?: any;
}

export interface Topprovider {
  context_length: number;
  max_completion_tokens?: number;
  is_moderated: boolean;
}

export interface Pricing {
  prompt: string;
  completion: string;
  request: string;
  image: string;
  web_search: string;
  internal_reasoning: string;
  input_cache_read?: string;
  input_cache_write?: string;
}

export interface Architecture {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type?: string;
}
/**
 * Response format for the models endpoint
 */
export interface ModelsResponse {
  data: Model[];
}

export interface EmbeddingProps {
  model: string;
  input: string | string[];
  user?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  user?: string;
  [key: string]: any;
}

export interface ChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface EmbeddingsResponse {
  object: "list";
  data: {
    object: "embedding";
    index: number;
    embedding: number[];
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export interface ModerationRequest {
  input: string | string[];
  model?: string;
}

export interface ModerationResponse {
  id: string;
  model: string;
  results: {
    flagged: boolean;
    categories: {
      sexual: boolean;
      hate: boolean;
      harassment: boolean;
      "self-harm": boolean;
      "sexual/minors": boolean;
      "hate/threatening": boolean;
      "violence/graphic": boolean;
      "self-harm/intent": boolean;
      "self-harm/instructions": boolean;
      harassment_threatening: boolean;
      violence: boolean;
    };
    category_scores: {
      sexual: number;
      hate: number;
      harassment: number;
      "self-harm": number;
      "sexual/minors": number;
      "hate/threatening": number;
      "violence/graphic": number;
      "self-harm/intent": number;
      "self-harm/instructions": number;
      harassment_threatening: number;
      violence: number;
    };
  }[];
}

export interface StatsResponse {
  totalRequests: number;
  totalTokens: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
}

export interface CreateKeyRequest {
  name: string;
}

export interface CreateKeyResponse {
  key: string;
  name: string;
  id: string;
}

export interface DeleteKeyResponse {
  success: boolean;
}
