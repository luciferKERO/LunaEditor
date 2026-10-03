# Deploy Luna

## Required production secrets

Set all as Vercel Secret variables. Never prefix secrets with `NEXT_PUBLIC_`.

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `GROQ_API_KEY`

## Storage

`POST /api/upload-url` accepts a project ID, video filename, and `video/*` content type. It returns an R2 PUT URL valid for 15 minutes. Browser uploads directly to R2; server never receives full video bytes.

Configure R2 CORS to allow `PUT` from production URL and localhost during development. Keep bucket private. Use this Cloudflare R2 CORS rule:

```json
[
  {
    "AllowedOrigins": ["https://luna-editor-six.vercel.app", "http://localhost:3000"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

Do not log or share presigned URLs. They grant short-lived upload access.

## AI

`POST /api/transcribe` accepts audio as multipart field `file`; it forwards to Groq Whisper. API key remains server-side.

## Verification

```bash
npm run typecheck
npm test
npm run build
vercel deploy --prod
```

Test upload URL with a valid authenticated production deployment. Do not log or disclose upload URLs or secrets.
