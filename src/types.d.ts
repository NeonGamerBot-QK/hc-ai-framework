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
  apiKey: string;
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
