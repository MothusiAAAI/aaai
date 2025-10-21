# AAAI — Export & Compliance (MVP)

## Run locally
```bash
npm i
npm run dev
# http://localhost:3000

Key pages
	•	/ home
	•	/export – agreements, goods, sensitive products, Export Potential, Licences & Forms + Full Country Guide
	•	/compliance – per-country compliance items
	•	/about, /products

Data you can edit
	•	src/app/export/page.tsx – UI
	•	src/data/procedures.ts – licences/forms + country guides
	•	src/data/exportPotential.ts – mock fetcher (ready to swap to ITC API)
