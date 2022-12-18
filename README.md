# nc-challenge

Frontend:

- Angular 14 + TypeScript + firebaseui-angular (Phone auth) + TailwindCss
- Deployable to Netlify

Backend:

- Express.js + TypeScript + Firebase Firestore + Firebase Auth (SMS)
- Deployable to Firebase Functions

## Setup

Clone this repo.

Make sure you have at least node version 16 installed.

To run frontend in dev mode towards deployed Firebase Function backend:

```bash
cd angular
npm install
npm start
```

'Access-Control-Allow-Origin' is set to '\*' on backend on purpose

Visit https://strong-mermaid-3f2f54.netlify.app/ for deployed app
