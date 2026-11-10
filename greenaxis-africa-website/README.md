# GreenAxis Africa Limited website

Static, no-build, SEO and SEM optimized website for GreenAxis Africa Limited, an environmental and development approvals consultancy in Kenya. Plain HTML, CSS and a small JavaScript file, so it is fast and cheap to host.

## Deploy: GitHub + Netlify

1. Create an empty GitHub repository (for example `greenaxis-africa-website`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial GreenAxis Africa website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/greenaxis-africa-website.git
   git push -u origin main
   ```
3. In Netlify choose **Add new site > Import an existing project**, pick the repository, leave the build command empty and set the publish directory to `.` (already set in `netlify.toml`).
4. After the first deploy, note your live address (for example `https://something.netlify.app`) and do the **domain replacement** below.

## Domain replacement (do this once)

The site uses the placeholder address `https://greenaxisafrica.netlify.app` in canonical tags, Open Graph tags, JSON-LD schema, `sitemap.xml` and `robots.txt`. Replace it with your real address (Netlify subdomain or custom domain) in every file:

```bash
grep -rl "greenaxisafrica.netlify.app" . | xargs sed -i 's#https://greenaxisafrica.netlify.app#https://YOUR-REAL-DOMAIN#g'
```

Then commit and push.

## Contact form (Netlify Forms)

Forms are already wired for Netlify Forms (`quote-request` and `lp-quote-request`) with a honeypot field. After the first deploy go to **Site configuration > Forms > Form notifications** and add the email address that should receive enquiries. Netlify detects the forms automatically at deploy time.

## After launch checklist (SEO)

- Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Create and verify a Google Business Profile, and keep name, phone number and address identical everywhere (NAP consistency).
- Add the business address, opening hours, social links and registration details to the footer, the Contact page and the JSON-LD in `index.html` once available (LocalBusiness `address`, `geo`, `openingHoursSpecification`, `sameAs`).
- Replace the illustrated placeholder images with real project photos (see below) and add genuine client reviews when you have them. Only mark up reviews with schema if they are real.
- Add the business to Kenyan directories with the same details.

## SEM / Google Ads

- `lp/environmental-approvals-kenya/` is a focused landing page (set to `noindex`) for paid campaigns: one offer, one form, call and WhatsApp buttons.
- Clicks on call, WhatsApp and quote buttons, plus form submissions and the thank-you page view, are pushed to `window.dataLayer` as `click_call`, `click_whatsapp`, `click_quote`, `form_submit` and `generate_lead`. Add your Google tag or GTM snippet in the `<head>` (look for the comment "Analytics / Google Ads") on each page and mark `generate_lead` as a conversion.
- If you add Google tags, the Content Security Policy in `_headers` already allows the common Google domains.
- A starter keyword and ad copy plan is provided separately in `SEM-starter-plan.md`.

## Replacing placeholder images

Images in `assets/img/` are original illustrations. To use real photos, save them with the same file names or update the `<img>` tags, keep descriptive `alt` text, include `width` and `height`, and compress them (WebP or JPEG under about 200 KB each).

| File | Used for |
| --- | --- |
| `hero.svg` | Home page hero |
| `about.svg` | Home and About page |
| `og-image.png` | Social sharing image (1200x630) |
| `logo-mark.svg`, `favicon.svg`, `*.png` icons | Logo, favicon, app icons |

## Structure

```
index.html                     Home
about/  services/  contact/  faq/  insights/  privacy/
services/<service>/            11 service pages (Service + FAQ + Breadcrumb schema)
insights/<article>/            3 guides (Article schema)
lp/environmental-approvals-kenya/   Google Ads landing page (noindex)
thank-you/  404.html           Form confirmation (noindex) and error page
assets/css  assets/js  assets/img
sitemap.xml  robots.txt  site.webmanifest  _headers  _redirects  netlify.toml
```

## Notes

- Service and article text is general information, not legal advice. Please have the team confirm the regulatory wording against current NEMA and county requirements before publishing.
- Phone number used across the site: 0718 991 272 (`+254718991272`). Search for `254718991272` to change the phone and WhatsApp links.
