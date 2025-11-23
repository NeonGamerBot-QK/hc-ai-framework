# HC Ai framework wrapper thing

A simple, typed Node.js wrapper for the [Hack Club AI](https://ai.hackclub.com) API.

## Installation

```bash
npm install hc-ai
# or
pnpm add hc-ai
# or
yarn add hc-ai
```

## Usage

Import the wrapper and initialize it with your API key.

```javascript
import { AiApiWrapper } from "hc-ai";

const client = new AiApiWrapper({
  apiKey: "sk-api-key", // Optional if only using public endpoints like getModels
  baseUrl: "https://ai.hackclub.com", // Optional, defaults to this URL
});
```

### Get Available Models

List all models available on the API. This endpoint does not require authentication.

```javascript
const models = await client.v1.getModels();
console.log(models);
```

### Chat Completions

Generate chat responses. Supports all parameters from the OpenAI Chat Completions API.

```javascript
const response = await client.v1.chatCompletions({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ],
});

console.log(response.choices[0].message.content);
```

### Embeddings

Generate vector embeddings for text.

```javascript
const embedding = await client.v1.getEmbeddings({
  model: "text-embedding-3-small",
  input: "Hack Club is a nonprofit network of high school coding clubs.",
});

console.log(embedding.data[0].embedding);
```

### Moderations

Check text for inappropriate content.

```javascript
const result = await client.v1.moderations({
  input: "Text to check",
});

if (result.results[0].flagged) {
  console.warn("Content flagged!");
}
```

### Usage Statistics

Get token usage statistics for your account.

```javascript
const stats = await client.v1.getStats();
console.log(`Total tokens used: ${stats.totalTokens}`);
```

### API Key Management

Create and delete API keys programmatically.

```javascript
// Create a new key
const newKey = await client.v1.createKey({ name: "My New Key" });
console.log(`Created key: ${newKey.key}`);

// Delete a key
await client.v1.deleteKey(newKey.id);
```

## TypeScript Support

This package includes TypeScript definitions. Types are automatically inferred when using the client.

```typescript
import { AiApiWrapper, ChatCompletionRequest } from "hc-ai";

// ...
```

## License

MIT
