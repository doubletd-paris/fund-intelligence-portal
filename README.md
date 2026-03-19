# Fund Intelligence Portal

Fund Intelligence Portal is a synthetic demonstration app for a fictional pan-European core real estate fund manager. It showcases a modern internal operating portal and external investor portal layered over fragmented legacy workflows, with role-based visibility, portfolio exploration, structured conversational search, and business-friendly data ingestion views.

## How to run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Demo routes

- `/`
- `/fund-overview`
- `/portfolio-explorer`
- `/asset/asset-4`
- `/performance`
- `/data-management`
- `/query?q=Show%20logistics%20assets%20in%20Germany%20with%20vacancy%20above%2010%25`
- `/investors`
- `/debt`
- `/transactions`
- `/esg`
- `/documents`
- `/admin`

## Roles to test

- `Fund Manager`
- `Asset Manager`
- `Investor Relations`
- `Senior Management`
- `Existing Investor`
- `Prospect`
- `Admin`

Use the role switcher in the top bar to move between internal and external experiences without logging in.

## Example query prompts

- `Show logistics assets in Germany with vacancy above 10%`
- `Compare fund performance vs benchmark over 5 years`
- `List debt maturing in the next 24 months`
- `Which assets had the largest valuation increase this year?`
- `Show office assets in Paris`
- `What changed this quarter?`

## Notes

- All names, figures, assets, investors, documents, and operating details are fictional and synthetic.
- Mock data is file-based in `data/mock-data.ts`.
- Shared types are defined in `types/index.ts`.
