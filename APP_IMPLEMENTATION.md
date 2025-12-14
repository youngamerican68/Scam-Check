# Scam Shield - App Implementation Guide

**Last Updated:** December 14, 2025

---

## Sprint to Launch Checklist

### Step 1: Deploy Backend to Vercel (5 minutes)

```bash
cd "/Users/paulsowell/Scam Check/Scam-Check"
vercel
```

Answer the prompts:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Your account
3. **Link to existing project?** → No (create new)
4. **Project name?** → `scam-check`
5. **Directory?** → `./` (default)

After deploy, add environment variables in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `AI_PROVIDER` | `openrouter` |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` (your key) |
| `OPENROUTER_MODEL` | `google/gemini-2.0-flash-001` |

Then redeploy:
```bash
vercel --prod
```

**Verify:** Visit `https://your-project.vercel.app/api/scans` - should return JSON.

---

### Step 2: Point iOS App to Production

Edit `/Users/paulsowell/Scam Check/ScamShield/ScamShield/Services /APIConfig.swift`:

```swift
// Change the prod URL to your Vercel deployment
case .prod:
    return URL(string: "https://scam-check.vercel.app")!  // ← Your actual Vercel URL

// Change current environment to prod
#if DEBUG
static let current: APIEnvironment = .prod  // ← Change from .dev to .prod
#else
static let current: APIEnvironment = .prod
#endif
```

---

### Step 3: Install on Real iPhone

**Prerequisites:**
- iPhone plugged into Mac via USB/Lightning cable
- Apple ID signed into Xcode (free is fine)

**Steps:**
1. Open `/Users/paulsowell/Scam Check/ScamShield/ScamShield.xcodeproj` in Xcode
2. Select your iPhone from the device dropdown (top bar)
3. Go to **Signing & Capabilities** tab
4. Under **Team**, select your Personal Team (your Apple ID)
5. If prompted, trust the developer on your iPhone:
   - iPhone → Settings → General → VPN & Device Management → Trust
6. Click **Run** (▶️) to build and install

**Note:** With free Apple ID, app expires after 7 days. Just reinstall when needed.

---

### Step 4: Configure Mailgun (for real email forwarding)

**While waiting for DNS propagation, do this in parallel:**

1. **Create Mailgun Account:** https://www.mailgun.com/
2. **Add Domain:** `scamshield.app` (or your domain)
3. **Configure DNS Records:**
   - MX record: `mxa.mailgun.org` (priority 10)
   - MX record: `mxb.mailgun.org` (priority 20)
   - TXT record for SPF
   - CNAME for tracking (optional)

4. **Create Inbound Route:**
   - Match: `match_recipient(".*@scamshield.app")`
   - Action: `forward("https://your-vercel-url.vercel.app/api/mailgun/inbound")`

5. **Add Signing Key to Vercel:**
   - Get from Mailgun Dashboard → Settings → API Keys → HTTP Webhook Signing Key
   - Add to Vercel: `MAILGUN_SIGNING_KEY` = `key-...`

**Test:** Forward a real email to `u_k9Xm2pL8nQ@scamshield.app` and check app history.

---

### Step 5: Administrative Blockers

#### Apple Developer Account
- **For testing:** Free Apple ID works
- **For App Store:** $99/year at https://developer.apple.com/programs/
- **Timeline:** Verification can take 24-48 hours, start early

#### Privacy Policy (Required for App Store)
Create a simple privacy policy page. Options:
- Notion page (free, easy)
- Add `/privacy` route to your Vercel app
- Use a generator: https://www.privacypolicygenerator.info/

Minimum content:
- What data you collect (email content for scanning - not stored)
- How it's used (AI analysis only)
- Data retention (scan results stored, raw content discarded)
- Contact info

---

## Real Device Test Flow

Once Steps 1-3 are complete, test the full flow:

### Test A: Manual Paste Scan
1. Copy suspicious text on iPhone
2. Open Scam Shield app
3. Tap "Scan Message I Copied"
4. Verify result appears

### Test B: Share Extension
1. In Messages, select suspicious text
2. Tap Share → Scam Shield
3. Verify app opens and scans automatically

### Test C: Email Forward (after Mailgun setup)
1. Open Settings in app
2. Tap "Save Scam Shield to Contacts"
3. Go to Mail, forward suspicious email
4. In To: field, type "Scam" → autocomplete to Scam Shield
5. Send
6. Open app → History → Pull to refresh
7. Verify scan result appears

---

## Environment URLs

| Environment | URL | Use |
|-------------|-----|-----|
| Dev | `http://localhost:3000` | Simulator only |
| Staging | `http://192.168.x.x:3000` | LAN testing (avoid) |
| **Prod** | `https://scam-check.vercel.app` | Real device + production |

---

## Troubleshooting

### "Untrusted Developer" on iPhone
Settings → General → VPN & Device Management → Tap your Apple ID → Trust

### App won't install - "Unable to install"
- Check Signing & Capabilities has your Team selected
- Try: Product → Clean Build Folder, then Run again

### API calls failing on device
- Verify `APIConfig.swift` points to `.prod`
- Verify Vercel deployment is live
- Check Vercel logs for errors

### Email forwarding not working
- DNS propagation can take up to 48 hours
- Verify MX records with: `dig MX scamshield.app`
- Check Mailgun logs for inbound emails
- Verify route is forwarding to correct webhook URL

---

## File Locations

| File | Purpose |
|------|---------|
| `ScamShield/Services /APIConfig.swift` | API URL configuration |
| `Scam-Check/.env.local` | Local environment variables |
| `Scam-Check/app/api/mailgun/inbound/route.ts` | Email webhook |
| `Scam-Check/app/api/scans/route.ts` | Scan history API |

---

## Quick Commands

```bash
# Start local dev server
cd "/Users/paulsowell/Scam Check/Scam-Check" && npm run dev

# Deploy to Vercel
cd "/Users/paulsowell/Scam Check/Scam-Check" && vercel --prod

# Check Vercel logs
vercel logs

# Simulate email (local testing)
curl -X POST http://localhost:3000/api/mailgun/inbound \
  -d "recipient=u_k9Xm2pL8nQ@scamshield.app" \
  -d "from=test@example.com" \
  -d "subject=Test Email" \
  -d "body-plain=This is a test message" \
  -d "Message-Id=test_$(date +%s)" \
  -d "timestamp=1234567890" \
  -d "token=test" \
  -d "signature=test"
```

---

*Next step: Run `vercel` to deploy the backend.*
