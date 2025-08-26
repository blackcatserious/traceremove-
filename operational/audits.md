# Website Audit

Date: 2024-08-26

## Summary
- Site lacks multilingual support (French version /fr missing and returns 404).
- Numerous internal links return 404 or 403 (see links_report.md).
- Missing canonical URLs, hreflang tags, and sitemap entries for different locales.
- HTTP requests not redirected to HTTPS consistently.
- Assets missing (favicon, apple-touch-icon).
- Social media links and contact pages show 404/400 errors.
- Need to externalize localized text to language files.

## Next Steps
1. Implement localization framework (EN/FR) with language switcher and separate URLs.
2. Fix broken links and missing assets.
3. Configure HTTP→HTTPS redirects and update certificates.
4. Update meta tags, OpenGraph, canonical, and hreflang values.
5. Validate forms, reCAPTCHA/Turnstile, and general site performance (CLS/LCP).
