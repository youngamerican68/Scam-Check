# Scam-Check One-Shot (The Granny Guard)

**A second opinion for your panic. Antivirus for social engineering.**

## Overview

Scam-Check One-Shot is an MVP web application that helps non-technical users (especially adult children of elderly parents) check suspicious messages for scam indicators. The app uses AI to analyze emails, SMS messages, and chat transcripts for social engineering patterns and provides clear, actionable advice.

## Features

- **Single-shot scam checking**: Paste or type suspicious content for instant analysis
- **Image upload support**: Upload screenshots of suspicious messages
- **AI-powered analysis**: Uses advanced AI models to detect social engineering tactics
- **Conservative approach**: Errs on the side of caution - false positives are acceptable, false negatives are not
- **Clear, age-friendly UI**: Large text, simple language, accessible design
- **Detailed explanations**: Shows detected tactics and provides safe next steps
- **Multiple AI provider support**: Works with OpenAI, Mistral, Nemotron/vLLM, or mock mode

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm (npm and yarn also work)
- **AI Integration**: Generic, swappable AI provider interface

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Scam-Check
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your AI provider in `.env`:

   **For Mock Mode (Development):**
   ```env
   AI_PROVIDER=mock
   ```

   **For OpenRouter (Recommended - Best Value):**
   ```env
   AI_PROVIDER=openrouter
   OPENROUTER_API_KEY=your_api_key_here
   OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
   ```

   OpenRouter gives you access to 100+ models through one API:
   - **Claude 3.5 Sonnet**: Best reasoning ($3/$15 per 1M tokens)
   - **Llama 3.1 70B**: Cost-effective ($0.35/$0.40 per 1M tokens)
   - **Gemini Flash 1.5**: Fastest ($0.075/$0.30 per 1M tokens)
   - **GPT-4o**: Versatile ($2.50/$10 per 1M tokens)

   Sign up at [openrouter.ai](https://openrouter.ai) for $5 credit

   **For OpenAI:**
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4-turbo-preview
   ```

   **For Mistral:**
   ```env
   AI_PROVIDER=mistral
   MISTRAL_API_KEY=your_api_key_here
   MISTRAL_MODEL=mistral-large-latest
   ```

   **For Nemotron/Custom vLLM:**
   ```env
   AI_PROVIDER=nemotron
   CUSTOM_AI_ENDPOINT=https://your-endpoint.com/v1
   CUSTOM_AI_API_KEY=your_api_key_here
   CUSTOM_AI_MODEL=nvidia/nemotron-70b
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter suspicious message**: Paste the email, SMS, or chat message you want to check
2. **Upload screenshot (optional)**: Provide an image of the message for additional context
3. **Select context**: Choose who the check is for (yourself, parent, or someone else)
4. **Click "Check this for scams"**: Wait 5-15 seconds for analysis
5. **Review results**: Read the verdict, detected tactics, and safe next steps

## Project Structure

```
Scam-Check/
├── app/
│   ├── api/
│   │   └── check-scam/
│   │       └── route.ts          # API endpoint for scam checking
│   ├── components/
│   │   ├── Disclaimer.tsx        # Privacy and safety notice
│   │   ├── Footer.tsx            # Footer with disclaimers
│   │   ├── Header.tsx            # App header
│   │   ├── LoadingSpinner.tsx    # Loading state component
│   │   ├── ResultPanel.tsx       # Analysis results display
│   │   └── ScamCheckForm.tsx     # Main input form
│   ├── globals.css               # Global styles and Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── aiClient.ts               # Generic AI provider interface
│   ├── scamPrompt.ts             # System prompts and instructions
│   └── validation.ts             # Input validation utilities
├── types/
│   └── scamCheck.ts              # TypeScript type definitions
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Key Design Decisions

### Conservative Approach

The app is designed to be **extremely conservative** in its analysis:

- Defaults to "suspicious" when uncertain
- Uses "high scam" for any strong red flags
- Prefers false positives (over-warning) over false negatives (missing scams)
- Always recommends verification through official channels

### Social Engineering Focus

The AI is specifically trained to detect:

- Urgency and time pressure
- Authority impersonation (banks, government, tech support)
- Unusual payment requests (gift cards, crypto, wire transfers)
- Personal information requests
- Emotional manipulation (fear, shame, greed)
- Communication red flags (grammar errors, suspicious links, etc.)

### Age-Friendly Design

- Large, readable text
- Simple, clear language
- High-contrast colors
- Accessible buttons and inputs
- Prominent disclaimers
- No technical jargon

## Future Enhancements

This MVP is structured to support:

- **Email/WhatsApp forwarding**: Endpoints to ingest messages directly
- **Authentication**: User accounts and history
- **Subscription paywall**: Premium features
- **Batch processing**: Check multiple messages at once
- **Reporting system**: Flag and report confirmed scams
- **Database integration**: Store and analyze patterns
- **Multi-language support**: Translate UI and analysis

## Security & Privacy

- **No data storage**: Messages are analyzed in real-time and not stored
- **Privacy-first**: No tracking, no user accounts (in MVP)
- **Client-side warnings**: Detects sensitive data patterns and warns users
- **Secure API calls**: All AI requests are server-side only
- **Environment-based config**: API keys never exposed to client

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
# Build
docker build -t scam-check .

# Run
docker run -p 3000:3000 -e AI_PROVIDER=mock scam-check
```

### Self-hosted

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Contributing

This is an MVP. Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests (when testing infrastructure is added)
5. Submit a pull request

## License

[Your License Here]

## Disclaimer

**This tool does NOT guarantee safety or accuracy.** It is designed to provide a "second opinion" and help users make more informed decisions. Users should:

- Never rely solely on this tool for decisions about payments or sensitive information
- Always verify unexpected messages through official channels
- Contact companies directly using known, official contact information
- Report suspected scams to appropriate authorities

When in doubt, **do not interact with the message**.

## Support

For questions or issues:
- Create an issue in this repository
- Contact: [your-email@example.com]

---

**Built with ❤️ to protect those we love.**
