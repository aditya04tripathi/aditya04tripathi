# Aditya Tripathi — Engineering Journey

A software engineering portfolio built with Next.js 16, React 19, TypeScript and React Three Fiber. Natural document scrolling evolves one persistent 3D world through identity, four engineering projects, experience, technical evidence, education and contact.

## Run locally

```bash
pnpm install
pnpm dev
```

The development server is available at http://localhost:3000. Run the production version with `pnpm build` followed by `pnpm start`.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Content and architecture

- `data/portfolio.ts` contains the verified profile, project architecture, experience, education and evidence-linked technology data.
- `data/writing.ts` preserves the five original technical articles and their publication dates.
- `data/SOURCES.md` records references and source conflicts. The live portfolio is the primary factual source; the supplied résumé is secondary. Current project source clarifies outdated architecture descriptions.
- `components/PortfolioExperience.tsx` coordinates chapters, natural scroll, persisted theme selection and animation controls.
- `components/experience/EngineeringWorld.tsx` owns the single lazy-loaded Canvas, procedural geometry, adaptive rendering, camera interpolation and theme-aware materials.
- `components/projects/ProjectJourney.tsx` presents each project as six horizontal stages, all fitting within the viewport without vertical scrolling.
- `components/contact/` provides the animated contact page and form; `app/api/contact/route.ts` validates requests and sends through the server-only Gmail SMTP helper.
- `components/seo/` provides semantic document layouts, structured data and original social previews.
- The public résumé is a corrected portfolio résumé; the original supplied document is unchanged.

The complete content renders as HTML before WebGL loads. Project and writing pages are independently crawlable. System theme and reduced-motion preferences are honored; visitors can select a theme and pause animation. Mobile uses simplified geometry, lower DPR and a text-first layout.

See `PORTFOLIO_REBUILD_PLAN.md`, `models.md` and `THIRD_PARTY_ASSETS.md` for the audit, camera journey, asset budgets and provenance. Additional Blender assets in `public/models` and their generation script are retained from concurrent work and are not loaded by the current experience.

## Contact email

The homepage’s “Let’s talk” and “Start a conversation” links open `/contact`. The form collects name, email, an optional subject and a message. Nodemailer sends a blue and graphite HTML email with a plain-text alternative to `CONTACT_EMAIL`, with the visitor as `Reply-To`.

A private `.env.local` is prepared locally. Fill in:

```dotenv
GMAIL_SMTP_USER=aditya.tripathi0404@gmail.com
GMAIL_SMTP_APP_PASSWORD=your-google-app-password
CONTACT_EMAIL=adityatripathi.at04@gmail.com
```

Use a [Google App Password](https://nodemailer.com/usage/using-gmail/) with two-step verification enabled. Restart `pnpm dev` after configuring it. On deployment, set the same server-side environment variables in the hosting environment. `.env.local` is ignored by Git; `.env.example` documents the names without credentials.

Gmail uses `smtp.gmail.com`, port 465 and TLS. Blank credentials produce an honest unavailable response; no success is shown until SMTP accepts the configured recipient. The handler limits request size, validates fields, escapes email HTML, checks origin and limits each IP to five attempts and each process to thirty attempts per ten minutes. That rate limit is held in each server process; distributed hosting should enforce a shared limit at its gateway if needed.

## Analytics and Firebase App Hosting

Production builds load Google Analytics stream `G-8QFJP7YRD2` through `@next/third-parties`. Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` before building; development runs do not send Analytics events. Contact form contents are never passed to Analytics.

The existing Firebase project is `adityatripathi-portfolio`, backend `adityatripathi-backend` in `asia-southeast1`. `apphosting.yaml` supplies the public Analytics ID at build time, and the Gmail sender, recipient, and permitted form origin at runtime. `CONTACT_ALLOWED_ORIGIN` allows the Firebase backend URL even when its proxy rewrites the host header. The SMTP password references the existing Secret Manager secret `smtp-pass`, available only at runtime. Its value is never stored in this repository. Private local environment files and build output are excluded from deployment uploads.

Deploy the current local source with:

```sh
npx -y firebase-tools@latest deploy --only apphosting --project adityatripathi-portfolio
```

The backend also has an existing GitHub connection. Direct source deployments use the local source; future deployments from that connection use its configured repository and branch.
