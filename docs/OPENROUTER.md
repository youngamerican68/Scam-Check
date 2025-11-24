# OpenRouter Integration Guide

## What is OpenRouter?

OpenRouter is a unified API gateway that provides access to 100+ AI models from various providers through a single interface. Instead of managing separate API keys for OpenAI, Anthropic, Google, Meta, etc., you can use one OpenRouter key to access them all.

**Benefits:**
- 💰 **Cost-effective**: Pay-as-you-go with competitive pricing
- 🔄 **Model flexibility**: Switch between models without code changes
- 📊 **Built-in analytics**: Track usage and costs per model
- 🚀 **No rate limits**: Unlike free tiers from individual providers
- 💳 **$5 free credit**: New accounts get starter credit

## Quick Start

### 1. Sign Up for OpenRouter

1. Visit [openrouter.ai](https://openrouter.ai)
2. Sign up with Google or GitHub
3. Get $5 free credit automatically
4. Go to [Keys](https://openrouter.ai/keys) to generate an API key

### 2. Configure Your App

Create `.env.local` in your project root:

```bash
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# Optional: For OpenRouter ranking/credits
SITE_URL=https://scamshield.app
SITE_NAME=Scam Shield
```

### 3. Restart Your Dev Server

```bash
npm run dev
```

That's it! Your app now uses OpenRouter.

---

## Recommended Models for Scam Detection

### 🥇 Best Overall: Claude 3.5 Sonnet

```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

**Pricing:** $3/1M input tokens, $15/1M output tokens
**Why:** Best reasoning, follows JSON structure perfectly, excellent at detecting nuance

**Cost per scam check:** ~$0.005-0.01 (half a penny)

---

### 💰 Most Cost-Effective: Llama 3.1 70B

```env
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct
```

**Pricing:** $0.35/1M input tokens, $0.40/1M output tokens
**Why:** 90% accuracy of Claude at 10% of the cost

**Cost per scam check:** ~$0.0005 (0.05 cents)

---

### ⚡ Fastest: Gemini Flash 1.5

```env
OPENROUTER_MODEL=google/gemini-flash-1.5
```

**Pricing:** $0.075/1M input tokens, $0.30/1M output tokens
**Why:** Sub-second response times, very cheap

**Cost per scam check:** ~$0.0002 (0.02 cents)

---

### 🎯 Best for Images: GPT-4o

```env
OPENROUTER_MODEL=openai/gpt-4o
```

**Pricing:** $2.50/1M input tokens, $10/1M output tokens
**Why:** Excellent vision capabilities for screenshot analysis

**Cost per scam check:** ~$0.003-0.007

---

## Full Model List

Browse all available models at [openrouter.ai/models](https://openrouter.ai/models)

**Other good options:**
- `anthropic/claude-3-opus` - Most capable, expensive ($15/$75)
- `openai/gpt-4-turbo` - Very capable ($10/$30)
- `google/gemini-pro-1.5` - Good balance ($1.25/$5)
- `mistralai/mistral-large` - European option ($2/$6)
- `deepseek/deepseek-chat` - Ultra-cheap ($0.14/$0.28)

---

## Cost Estimation

Based on average scam check (500 input + 200 output tokens):

| Model | Cost per Check | 1,000 Checks | 10,000 Checks |
|-------|---------------|--------------|---------------|
| **Gemini Flash 1.5** | $0.0002 | $0.20 | $2 |
| **Llama 3.1 70B** | $0.0005 | $0.50 | $5 |
| **GPT-4o** | $0.004 | $4 | $40 |
| **Claude 3.5 Sonnet** | $0.007 | $7 | $70 |
| **Claude 3 Opus** | $0.022 | $22 | $220 |

**Recommendation for MVP:** Start with **Llama 3.1 70B** - excellent quality at $5 per 10k checks.

**Recommendation for Production:** Use **Claude 3.5 Sonnet** - best accuracy is worth the cost for user trust.

---

## Advanced Features

### A/B Testing Multiple Models

You can dynamically switch models based on user tier:

```typescript
// lib/aiClient.ts
function getProviderConfig(): AIProviderConfig {
  const userTier = getUserTier(); // free, premium, etc.

  const modelMap = {
    free: "meta-llama/llama-3.1-70b-instruct",
    premium: "anthropic/claude-3.5-sonnet",
  };

  return {
    provider: "openrouter",
    apiKey: process.env.OPENROUTER_API_KEY,
    model: modelMap[userTier],
  };
}
```

### Fallback Chain

If one model is down, automatically fallback:

```typescript
const models = [
  "anthropic/claude-3.5-sonnet",
  "openai/gpt-4o",
  "meta-llama/llama-3.1-70b-instruct",
];

for (const model of models) {
  try {
    return await openRouterAnalyzeScam(input, { ...config, model });
  } catch (error) {
    console.warn(`${model} failed, trying next...`);
  }
}
```

### Usage Tracking

OpenRouter provides built-in analytics at [openrouter.ai/activity](https://openrouter.ai/activity):
- Cost per request
- Average latency
- Model performance
- Error rates

---

## Vision/Image Support

OpenRouter supports image analysis for these models:
- ✅ `anthropic/claude-3.5-sonnet`
- ✅ `openai/gpt-4o`
- ✅ `google/gemini-flash-1.5`
- ❌ `meta-llama/llama-3.1-70b-instruct` (text-only)

The implementation already handles images:

```typescript
// If image is provided, it's automatically included
if (input.imageBase64) {
  messages[1] = {
    role: "user",
    content: [
      { type: "text", text: userPrompt },
      {
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${input.imageBase64}`
        }
      }
    ]
  };
}
```

---

## Rate Limits

OpenRouter does **not enforce rate limits** by default. However, individual model providers may have their own limits:

- **OpenAI models**: 10,000 RPM (requests per minute)
- **Anthropic models**: 5,000 RPM
- **Google models**: 2,000 RPM
- **Meta models**: Unlimited

For production, consider implementing your own rate limiting to control costs.

---

## Troubleshooting

### Error: "Insufficient credits"

**Solution:** Add credits at [openrouter.ai/credits](https://openrouter.ai/credits)
- Minimum: $5
- Recommended for testing: $10-20
- Auto-reload available

### Error: "Model not found"

**Solution:** Check model name at [openrouter.ai/models](https://openrouter.ai/models)
- Format: `provider/model-name`
- Example: `anthropic/claude-3.5-sonnet` ✅
- Wrong: `claude-3.5-sonnet` ❌

### Error: "JSON parsing failed"

**Solution:** Some models don't support `response_format: { type: "json_object" }`
- Claude 3.5 Sonnet: ✅ Full support
- Llama 3.1: ⚠️ Partial (works but may need prompt tuning)
- Older models: ❌ May fail

Use fallback parsing in `parseAIResponse()` (already implemented).

### Slow responses

**Solution:**
1. Switch to faster model (Gemini Flash 1.5)
2. Reduce `max_tokens` in request
3. Check OpenRouter status at [status.openrouter.ai](https://openrouter.ai/status)

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Rotate keys regularly** - Generate new keys monthly
3. **Set spending limits** - Configure at [openrouter.ai/settings](https://openrouter.ai/settings)
4. **Monitor usage** - Check [openrouter.ai/activity](https://openrouter.ai/activity) daily
5. **Use environment variables** - Never hardcode keys

---

## Comparison vs. Direct APIs

| Feature | OpenRouter | Direct OpenAI | Direct Anthropic |
|---------|-----------|---------------|------------------|
| **Models** | 100+ | OpenAI only | Claude only |
| **Setup** | 1 API key | Separate keys | Separate keys |
| **Pricing** | Same or cheaper | Standard | Standard |
| **Rate limits** | Higher | Strict free tier | Strict free tier |
| **Fallback** | Easy | Manual | Manual |
| **Analytics** | Built-in | External | External |

**Winner:** OpenRouter for MVP (flexibility + simplicity)

---

## Migration from Other Providers

### From Mock Mode

Just change `.env.local`:
```bash
# Before
AI_PROVIDER=mock

# After
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct
```

### From OpenAI

```bash
# Before
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview

# After
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4-turbo  # Same model via OpenRouter!
```

### From Mistral

```bash
# Before
AI_PROVIDER=mistral
MISTRAL_API_KEY=...
MISTRAL_MODEL=mistral-large-latest

# After
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=mistralai/mistral-large  # Via OpenRouter
```

No code changes required!

---

## Production Deployment

### Environment Variables (Vercel/Netlify)

Add these to your hosting platform:

```bash
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
SITE_URL=https://yourdomain.com
SITE_NAME=Scam Shield
```

### Cost Monitoring

Set up alerts in OpenRouter dashboard:
1. Go to [Settings](https://openrouter.ai/settings)
2. Enable "Email alerts"
3. Set threshold (e.g., $50/month)
4. Add webhook for Slack notifications (optional)

### Rate Limiting Middleware

Implement user-based rate limiting:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const userId = getUserId(request);
  const usage = await getUsage(userId);

  if (usage.checksToday > 100) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  return NextResponse.next();
}
```

---

## Support

- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)
- **Discord Community**: [discord.gg/openrouter](https://discord.gg/openrouter)
- **GitHub Issues**: [github.com/youngamerican68/Scam-Check/issues](https://github.com/youngamerican68/Scam-Check/issues)

---

**Last Updated:** November 2025
**Integration Status:** ✅ Fully Implemented
