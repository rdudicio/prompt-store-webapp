# Promptstore Application - TDD Plan (Hono + TypeScript + React + Vite)

This plan outlines the development of the Promptstore application using a Test-Driven Development (TDD) approach. Each feature will follow the cycle: Write Failing Test -> Write Minimal Code -> Refactor.

## I. Backend Development (Hono + TypeScript + SQLite)

### A. Project Setup

1.0 [ ] **Objective:** Initialize Hono project with TypeScript and configure for Wrangler/SQLite.
    *   1.1 [ ] **Tests:**
        *   `test_hono_setup.test.ts`: Verify basic Hono app runs and returns a simple response.
    *   1.2 [ ] **Code:**
        *   `backend/package.json`: Hono, TypeScript, Wrangler dependencies.
        *   `backend/tsconfig.json`: TypeScript configuration.
        *   `backend/wrangler.toml`: Wrangler configuration for SQLite.
        *   `backend/src/index.ts`: Basic Hono app setup.

### B. Database Setup

2.0 [ ] **Objective:** Define database schema and establish connection to SQLite, supporting both local development (non-D1) and D1 for deployment.
    *   2.1 [ ] **Tests:**
        *   `test_database_connection.test.ts`: Verify successful connection to local SQLite database.
        *   `test_database_connection.test.ts`: Verify successful connection to D1 (if applicable in test environment).
        *   `test_prompt_schema.test.ts`: Test Prompt schema definition (id, title, text, tags, created_at, updated_at). `tags` will be stored as a JSON string.
    *   2.2 [ ] **Code:**
        *   `backend/src/db/schema.ts`: Define Drizzle/SQL schema for `prompts` table.
        *   `backend/src/db/index.ts`: Database connection setup (conditional logic for `better-sqlite3` for local dev and D1 for deployment).
        *   `backend/src/db/migrations/`: Initial migration file for `prompts` table.

### C. CRUD Operations (backend/src/handlers/prompts.ts or similar)

3.0 [ ] **Objective:** Implement `createPrompt` function.
    *   3.1 [ ] **Tests:**
        *   `test_prompts_handler.test.ts`: Test `createPrompt` successfully adds a prompt to the database with correct attributes, including tags as a JSON string.
    *   3.2 [ ] **Code:**
        *   `backend/src/handlers/prompts.ts`: `createPrompt` function.
        *   `backend/src/types.ts`: Define TypeScript interfaces for Prompt data (e.g., `Prompt`, `PromptCreate`).

4.0 [ ] **Objective:** Implement `getPrompts` function (all and filtered).
    *   4.1 [ ] **Tests:**
        *   `test_prompts_handler.test.ts`: Test `getPrompts` retrieves all prompts.
        *   `test_prompts_handler.test.ts`: Test `getPrompts` filters by `q` (title/text search).
        *   `test_prompts_handler.test.ts`: Test `getPrompts` filters by `tags`.
    *   4.2 [ ] **Code:**
        *   `backend/src/handlers/prompts.ts`: `getPrompts` function.

5.0 [ ] **Objective:** Implement `getPromptById` function.
    *   5.1 [ ] **Tests:**
        *   `test_prompts_handler.test.ts`: Test `getPromptById` retrieves a specific prompt by ID.
        *   `test_prompts_handler.test.ts`: Test `getPromptById` returns null/undefined for non-existent ID.
    *   5.2 [ ] **Code:**
        *   `backend/src/handlers/prompts.ts`: `getPromptById` function.

6.0 [ ] **Objective:** Implement `updatePrompt` function.
    *   6.1 [ ] **Tests:**
        *   `test_prompts_handler.test.ts`: Test `updatePrompt` successfully updates prompt attributes.
        *   `test_prompts_handler.test.ts`: Test `updatePrompt` handles non-existent prompt.
    *   6.2 [ ] **Code:**
        *   `backend/src/handlers/prompts.ts`: `updatePrompt` function.

7.0 [ ] **Objective:** Implement `deletePrompt` function.
    *   7.1 [ ] **Tests:**
        *   `test_prompts_handler.test.ts`: Test `deletePrompt` successfully removes a prompt.
        *   `test_prompts_handler.test.ts`: Test `deletePrompt` handles non-existent prompt.
    *   7.2 [ ] **Code:**
        *   `backend/src/handlers/prompts.ts`: `deletePrompt` function.

### D. API Endpoints (backend/src/index.ts)

8.0 [ ] **Objective:** Expose CRUD operations via Hono routes.
    *   8.1 [ ] **Tests:**
        *   `test_api_endpoints.test.ts`: Test `POST /api/prompts` (create).
        *   `test_api_endpoints.test.ts`: Test `GET /api/prompts` (get all).
        *   `test_api_endpoints.test.ts`: Test `GET /api/prompts?q=...&tags=...` (get filtered).
        *   `test_api_endpoints.test.ts`: Test `GET /api/prompts/:id` (get by ID).
        *   `test_api_endpoints.test.ts`: Test `PUT /api/prompts/:id` (update).
        *   `test_api_endpoints.test.ts`: Test `DELETE /api/prompts/:id` (delete).
    *   8.2 [ ] **Code:**
        *   `backend/src/index.ts`: Hono application, routes, and integration with handlers.

## II. Frontend Development (React + Material-UI + Vite)

### A. Project Setup Vite + React + TypeScript, using pnpm

9.0 [x] **Objective:** Initialize Vite project with React and TypeScript.
    *   9.1 [x] **Tests:**
        *   `App.test.tsx`: Verify basic Vite app renders.
    *   9.2 [x] **Code:**
        *   `frontend/package.json`: React, TypeScript, Vite dependencies.
        *   `frontend/tsconfig.json`: TypeScript configuration.
        *   `frontend/vite.config.ts`: Vite configuration.
        *   `frontend/src/main.tsx`: Entry point for React app.
        *   `frontend/src/App.tsx`: Basic React component.

### B. Component Development

10.0 [x] **Objective:** Design and implement `PromptCard` component.
    *   10.1 [x] **Tests:**
        *   `PromptCard.test.tsx`: Test `PromptCard` renders prompt title, text, and tags.
    *   10.2 [x] **Code:**
        *   `frontend/src/components/PromptCard.tsx`: React component for displaying a single prompt.

11.0 [x] **Objective:** Design and implement `PromptList` component.
    *   11.1 [x] **Tests:**
        *   `PromptList.test.tsx`: Test `PromptList` renders a list of `PromptCard` components.
        *   `PromptList.test.tsx`: Test `PromptList` handles empty list.
    *   11.2 [x] **Code:**
        *   `frontend/src/components/PromptList.tsx`: React component for displaying a collection of prompts.

12.0 [x] **Objective:** Design and implement `PromptForm` component (for create/edit).
    *   12.1 [x] **Tests:**
        *   `PromptForm.test.tsx`: Test `PromptForm` renders input fields for title, text, and tags.
        *   `PromptForm.test.tsx`: Test `PromptForm` handles form submission (new prompt).
        *   `PromptForm.test.tsx`: Test `PromptForm` handles form submission (edit existing prompt).
        *   `PromptForm.test.tsx`: Test `PromptForm` displays validation errors.
    *   12.2 [x] **Code:**
        *   `frontend/src/components/PromptForm.tsx`: React component for creating/editing prompts.

13.0 [x] **Objective:** Design and implement `FilterBar` component.
    *   13.1 [x] **Tests:**
        *   `FilterBar.test.tsx`: Test `FilterBar` renders search input and tag filter.
        *   `FilterBar.test.tsx`: Test `FilterBar` triggers filter/search events.
    *   13.2 [x] **Code:**
        *   `frontend/src/components/FilterBar.tsx`: React component for filtering prompts.

### C. API Integration (frontend/src/services/api.ts)

14.0 [x] **Objective:** Create API service for interacting with backend.
    *   14.1 [x] **Tests:**
        *   `api.test.ts`: Test `api.getPrompts` fetches prompts correctly.
        *   `api.test.ts`: Test `api.createPrompt` sends data correctly.
        *   `api.test.ts`: Test `api.updatePrompt` sends data correctly.
        *   `api.test.ts`: Test `api.deletePrompt` sends delete request correctly.
    *   14.2 [x] **Code:**
        *   `frontend/src/services/api.ts`: Functions for making API calls (using `axios` or `fetch`).

### D. Pages and Routing (frontend/src/pages)

15.0 [x] **Objective:** Implement `HomePage` to display prompts, filter bar, and a button to create new prompts.
    *   15.1 [x] **Tests:**
        *   `HomePage.test.tsx`: Test `HomePage` renders `FilterBar` and `PromptList`.
        *   `HomePage.test.tsx`: Test `HomePage` renders a "New Prompt" button.
        *   `HomePage.test.tsx`: Test `HomePage` fetches and displays prompts on load.
        *   `HomePage.test.tsx`: Test `HomePage` applies filters.
    *   15.2 [x] **Code:**
        *   `frontend/src/pages/HomePage.tsx`: Main page for viewing prompts, including a button to navigate to the new prompt creation page.

16.0 [x] **Objective:** Implement `NewPromptPage` for creating new prompts.
    *   16.1 [x] **Tests:**
        *   `NewPromptPage.test.tsx`: Test `NewPromptPage` renders `PromptForm`.
        *   `NewPromptPage.test.tsx`: Test `NewPromptPage` handles successful prompt creation.
    *   16.2 [x] **Code:**
        *   `frontend/src/pages/NewPromptPage.tsx`: Page for creating new prompts.

17.0 [x] **Objective:** Implement `PromptDetailPage` for viewing and editing a single prompt.
    *   17.1 [x] **Tests:**
        *   `PromptDetailPage.test.tsx`: Test `PromptDetailPage` fetches and displays a single prompt.
        *   `PromptDetailPage.test.tsx`: Test `PromptDetailPage` renders `PromptForm` for editing.
        *   `PromptDetailPage.test.tsx`: Test `PromptDetailPage` handles successful prompt update.
        *   `PromptDetailPage.test.tsx`: Test `PromptDetailPage` handles prompt deletion.
    *   17.2 [x] **Code:**
        *   `frontend/src/pages/PromptDetailPage.tsx`: Page for viewing/editing a specific prompt.

18.0 [x] **Objective:** Set up React Router for navigation.
    *   18.1 [x] **Tests:**
        *   `App.test.tsx`: Test routing to different pages (`/`, `/new`, `/prompts/:id`).
    *   18.2 [x] **Code:**
        *   `frontend/src/App.tsx`: Main application component with React Router setup.

### E. Material-UI Integration

19.0 [x] **Objective:** Integrate Material-UI components for a modern and consistent UI.
    *   19.1 [x] **Tests:**
        *   `App.test.tsx`: Verify Material-UI theme is applied.
        *   `PromptCard.test.tsx`: Test `PromptCard` uses Material-UI Card, Typography, and Chip components.
        *   `PromptList.test.tsx`: Test `PromptList` uses Material-UI List and ListItem components.
        *   `PromptForm.test.tsx`: Test `PromptForm` uses Material-UI TextField, Button components.
        *   `FilterBar.test.tsx`: Test `FilterBar` uses Material-UI TextField and Button components, and a search button.
    *   19.2 [x] **Code:**
        *   `frontend/src/App.tsx`: Implement Material-UI ThemeProvider.
        *   `frontend/src/components/PromptCard.tsx`: Replace native HTML with Material-UI Card, Typography, Chip.
        *   `frontend/src/components/PromptList.tsx`: Replace native HTML with Material-UI List, ListItem.
        *   `frontend/src/components/PromptForm.tsx`: Replace native HTML with Material-UI TextField, Button.
        *   `frontend/src/components/FilterBar.tsx`: Replace native HTML with Material-UI TextField, Button, and add a search button.
        *   `frontend/src/pages/HomePage.tsx`: Use Material-UI `Grid` for layout and add a Material-UI `Button` for "New Prompt".

## III. General TDD Workflow for each step:

1.0 [ ] **Write a failing test:** Create a new test file or add a new test case to an existing file that describes a small piece of functionality. Run the tests and ensure it fails (red phase).
2.0 [ ] **Write minimal code:** Implement just enough code to make the failing test pass. Do not add any extra functionality (green phase).
3.0 [ ] **Refactor:** Improve the code's design, readability, and maintainability without changing its external behavior. Run tests again to ensure nothing broke.
4.0 [ ] **Repeat:** Move to the next small piece of functionality and repeat the cycle.
