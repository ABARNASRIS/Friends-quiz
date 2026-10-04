# How Well Do You Know Me?

A personalized 12-question friends quiz built with React, TypeScript, and Vite. Friends enter a name, answer one question at a time, see their score and friendship level, review every answer, and share or copy their result.

## Run locally

```sh
npm install
npm run dev
```

## Validate

```sh
npm run build
npm run lint
```

## Edit the quiz

Update the question text, four options, or correct answer in `src/quiz/questions.ts`. Score calculation and friendship-result bands live in `src/quiz/scoring.ts`; the interface is in `src/App.tsx` and its responsive styles are in `src/App.css`.

The quiz keeps answers in local component state until submission. It does not store personal information in local storage or send quiz responses to a server.
