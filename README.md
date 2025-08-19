# PawHub – MERN Stack

Monorepo structure:

- server: Express + MongoDB (JWT auth, role-based access, REST APIs)
- client: React + Vite + Tailwind (pages, components, routing)

Quick start

1. Copy `.env.example` to `.env` and adjust values.
2. Start backend:
   - cd server && npm install
   - npm run dev
   - (optional) npm run seed
3. Start frontend:
   - cd client && npm install
   - npm run dev

Default URLs

- API: http://localhost:5000
- Web: http://localhost:5173

Demo accounts after seeding

- admin@pawhub.dev / password123
- vet@pawhub.dev / password123
- jane@pawhub.dev / password123

