# Algoryx Frontend Internship — Week 1

## React Admin Dashboard

A production-style SaaS admin dashboard built for **ALGORYX Frontend Internship – Task 1**.

### Requirements covered

- Responsive sidebar
- Top navigation
- Dashboard KPI cards
- Recent activity feed
- Recent orders table
- User profile card
- Notifications
- Search/filter bar
- Light UI animations
- Fully responsive layout
- React + Vite
- Functional React components
- React hooks (`useState`, `useMemo`)
- Reusable components
- Organized source structure
- Lucide React icons

The Week 1 brief specifies React (Vite/CRA), functional components, React Hooks, reusable components, an organized folder structure, Tailwind CSS as preferred, and React Icons/Lucide. Submission requires a GitHub repository, live deployment, README, screenshots, and LinkedIn post.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy

### Netlify
1. Push this project to GitHub.
2. In Netlify, select **Add new site → Import an existing project**.
3. Choose the GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

### Vercel
1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`.

## Suggested GitHub repository name

`algoryx-week1-react-dashboard`

## Suggested LinkedIn post

> 🚀 Completed Week 1 of my Frontend Internship at Algoryx!
>
> Built a responsive SaaS-style Admin Dashboard using React + Vite with reusable components, React Hooks, responsive navigation, KPI cards, revenue visualization, recent orders, notifications, search, profile interactions and responsive layouts.
>
> This task helped me strengthen component architecture, state management and production-style frontend practices.
>
> #ReactJS #FrontendDevelopment #Vite #JavaScript #WebDevelopment #Internship #Algoryx

## Project structure

```text
algoryx-week1-react-dashboard/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Notes

This implementation uses CSS for the responsive UI rather than Tailwind. Tailwind was listed as preferred in the internship brief, not as a mandatory requirement. Lucide React is used for icons.
