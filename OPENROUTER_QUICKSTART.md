# 🚀 OpenRouter Quick Start (5 Minutes)

Get your scam detection app running with real AI in 5 minutes!

## Step 1: Get Your API Key (2 minutes)

1. Go to **[openrouter.ai](https://openrouter.ai)**
2. Click "Sign In" → Sign up with Google/GitHub
3. You get **$5 free credit** automatically! 🎉
4. Go to **[Keys](https://openrouter.ai/keys)** → Click "Create Key"
5. Copy your key (starts with `sk-or-v1-...`)

## Step 2: Configure Your App (1 minute)

Create a file named `.env.local` in your project root:

```bash
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-paste-your-key-here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

**That's it!** No other configuration needed.

## Step 3: Start Your App (1 minute)

```bash
npm run dev
```

Open **http://localhost:3001** and test it!

## Step 4: Test Scam Detection (1 minute)

Try this test scam in the scanner:

```
URGENT! Your bank account has been suspended due to suspicious activity.
Click here to verify your identity within 24 hours or your account will be
permanently closed. Wire $500 to confirm your identity.
```

**Expected result:** 🔴 High Scam (detects urgency, wire transfer, threats)

---

## 💰 Cost Breakdown

Your $5 free credit gets you:

| Model | Checks per $5 |
|-------|---------------|
| **Llama 3.1 70B** | 10,000 checks |
| **Gemini Flash 1.5** | 25,000 checks |
| **Claude 3.5 Sonnet** | 700 checks |
| **GPT-4o** | 1,200 checks |

**Recommendation:** Start with Claude 3.5 Sonnet for best accuracy, then switch to Llama 3.1 70B when you need volume.

---

## 🔄 Switching Models (30 seconds)

Just change one line in `.env.local`:

```bash
# Best accuracy
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# Most cost-effective
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct

# Fastest
OPENROUTER_MODEL=google/gemini-flash-1.5

# Best for images
OPENROUTER_MODEL=openai/gpt-4o
```

Restart your dev server and you're done!

---

## 📊 Monitor Usage

Check your usage at **[openrouter.ai/activity](https://openrouter.ai/activity)**:
- Cost per request
- Total spend
- Model performance
- Request logs

---

## 🆘 Troubleshooting

### "Insufficient credits"
**Fix:** Add $10 at [openrouter.ai/credits](https://openrouter.ai/credits)

### "Model not found"
**Fix:** Browse models at [openrouter.ai/models](https://openrouter.ai/models) and copy exact name

### "Server error"
**Fix:** Check your API key is correct in `.env.local`

---

## 🎓 Next Steps

- Read full guide: `docs/OPENROUTER.md`
- Browse 100+ models: [openrouter.ai/models](https://openrouter.ai/models)
- Join Discord: [discord.gg/openrouter](https://discord.gg/openrouter)

---

**Total setup time:** ~5 minutes
**Free credit:** $5
**Models available:** 100+
**Ready to deploy?** ✅
