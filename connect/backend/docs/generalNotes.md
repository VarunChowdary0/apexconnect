# Gmail API Notes

## Key Identifiers

### `id` (Gmail internal id)
- Unique id for each **individual message** (e.g., `19c9f54d661477aa`)
- **Different** for sender and receiver — each Gmail account assigns its own `id`
- Used for API calls: `messages.get()`, `messages.modify()`, reply, mark_as_important, etc.
- Referred to as `gmail_id` in our functions to avoid confusion

### `threadId`
- Unique id for the **conversation/thread** (stays the same across all messages/replies)
- When a new conversation starts, `id == threadId` for the first message
- All replies in the thread share the same `threadId` but get their own `id`
- Example:
  ```
  Thread: "yo" conversation (threadId: 19c9f542cb767061)
  ├── id: 19c9f54d661477aa  →  "yo" (original)
  ├── id: 19c9f55a8fe7920f  →  "wasup dude" (reply)
  └── id: 19ca02d370bf491a  →  "Got you" (reply)
  ```

### `Message-ID` (email header)
- Universal identifier set by the **sender's mail server** (e.g., `<CABx28Yv=abc@mail.gmail.com>`)
- **Same** for both sender and receiver — the only shared identifier across accounts
- Every email (including replies) gets its own unique `Message-ID`
- Used in `In-Reply-To` and `References` headers to link replies to originals

## Reply Threading Headers
- `In-Reply-To` — the `Message-ID` of the direct parent email
- `References` — the `Message-ID` chain of all ancestors in the thread
- Original emails don't have these headers, only replies do

## Important Labels
- Gmail **auto-assigns** labels like `IMPORTANT`, `CATEGORY_PERSONAL`, `CATEGORY_UPDATES` using its ML classifier
- These are not set by our code unless explicitly called (e.g., `mark_as_important`)

## Still to Explore (for instantly.ai-like system)
- `users.watch()` with Pub/Sub — real-time notifications instead of polling
- Batch requests — multiple API calls in one HTTP request (critical at scale)
- `messages.list(q="...")` — Gmail search syntax for filtering
- `threads.list()` / `threads.get()` — fetch entire conversations in one call
- Drafts API — create/schedule drafts before sending
- Rate limits — Gmail API has per-user and per-project quotas
- Explore other providers (Outlook/Microsoft Graph API, SMTP/IMAP) before designing the abstraction layer


---------------------
# Providers

- Google (largest user base) -> Gmail API -> Fallback to SMTP/IMAP
- Microsoft Outlook (Second largest, enterprise market
) -> Graph API -> Fallback to SMTP/IMAP
- SMTP/IMAP	(Works with any email provider)
- SendGrid/SES	()