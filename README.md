# TaskFlow - Task Management Dashboard (Mini Trello-like)

A professional Task Management Dashboard built with **React**, **Vite**, and **Zustand**. This project was developed as part of a technical assignment to demonstrate proficiency in modern React patterns, state management, and UI/UX design.

## 🌐 Live Demo & Repository

- **Live Demo:** [https://nxl-tech.vercel.app/](https://nxl-tech.vercel.app/)
- **GitHub Repository:** [https://github.com/muhammedanasm/nxl-tech](https://github.com/muhammedanasm/nxl-tech)

---

## Features

### Authentication (Mocked)

- Custom-designed Login Page.
- Stores user info in **Zustand** store with **persistence** (localStorage).
- Protected routes (Dashboard is only accessible after login).
- Professional Logout with **SweetAlert2** confirmation.

### Task Management (Kanban Board)

- **Fetch API:** Initial tasks are fetched from `JSONPlaceholder`.
- **Three Columns:** Organized into _Todo_, _In Progress_, and _Completed_.
- **CRUD Operations:**
  - Create new tasks with a title and description.
  - Edit existing tasks (disabled for 'Completed' tasks for better UX).
  - Delete tasks with immediate state update.
- **Move Logic:** Easily move tasks between status columns using directional buttons.

### Search & Filter

- Search tasks by title.
- **Debounce Logic:** Implemented a custom `useDebounce` hook to optimize search performance (Point 6 in PDF).

### UI/UX & Design

- **Premium Look:** Clean, modern SaaS-style interface.
- **Responsive Layout:** Sidebar and Navbar work seamlessly on Mobile and Desktop.
- **Feedback:** Loading spinners, error alerts, and empty state illustrations.
- **Glassmorphism:** Modal overlays and premium shadow effects.

---

## Tech Stack

- **Framework:** React 18 (Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS & External CSS
- **State Management:** Zustand (with Persist Middleware)
- **API Client:** Axios
- **Icons:** Lucide React
- **Notifications:** SweetAlert2

---

## Folder Structure

```text
src/
├── components/
│   ├── layout/       # Sidebar, Navbar
│   ├── tasks/        # TaskCard, TaskModal
│   └── ui/           # Reusable Button, Input
├── hooks/            # useDebounce
├── layouts/          # Main Dashboard Layout
├── pages/            # Login, Dashboard
├── services/         # Axios API calls
├── store/            # Zustand Store (useTaskStore)
└── styles/           # Global & Sidebar CSS
```
