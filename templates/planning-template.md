# {{Application Name}} Application Plan

This document outlines the plan for building the {{Application Name}} application, a full-stack {{Application Type, e.g., CRUD}} application for {{Application Purpose}}.

## Tech Stack

*   **Backend:** {{Backend Technology, e.g., Python FastAPI, Hono + TypeScript}}
*   **Frontend:** {{Frontend Technology, e.g., React with Material-UI, React + Vite}}
*   **Database:** {{Database Technology, e.g., SQLite}}

## Development Approach

This plan emphasizes a {{Development Approach, e.g., Test-Driven Development (TDD)}} approach. Each feature will follow the cycle: Write Failing Test -> Write Minimal Code -> Refactor.

## I. Backend Development ({{Backend Technology}})

### A. Project Setup

1.0 [ ] **Objective:** Initialize {{Backend Technology}} project with {{Language/Framework}} and configure for {{Deployment/DB, e.g., Wrangler/SQLite}}.
    *   1.1 [ ] **Tests:**
        *   `test_backend_setup.test.{{ext}}`: Verify basic backend app runs and returns a simple response.
    *   1.2 [ ] **Code:**
        *   `backend/package.json` (or equivalent): Dependencies.
        *   `backend/tsconfig.json` (or equivalent): Configuration.
        *   `backend/src/index.{{ext}}` (or equivalent): Basic app setup.

### B. Database Setup

2.0 [ ] **Objective:** Define database schema and establish connection to {{Database Technology}}.
    *   2.1 [ ] **Tests:**
        *   `test_database_connection.test.{{ext}}`: Verify successful connection to database.
        *   `test_schema.test.{{ext}}`: Test schema definition for `{{main_table}}` table.
    *   2.2 [ ] **Code:**
        *   `backend/src/db/schema.{{ext}}` (or equivalent): Define schema for `{{main_table}}` table.
        *   `backend/src/db/index.{{ext}}` (or equivalent): Database connection setup.
        *   `backend/src/db/migrations/` (or equivalent): Initial migration file.

### C. CRUD Operations (backend/src/handlers/{{resource}}.{{ext}} or similar)

3.0 [ ] **Objective:** Implement `create{{Resource}}` function.
    *   3.1 [ ] **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `create{{Resource}}` successfully adds a {{resource}} to the database.
    *   3.2 [ ] **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `create{{Resource}}` function.
        *   `backend/src/types.{{ext}}`: Define interfaces/models for {{Resource}} data.

4.0 [ ] **Objective:** Implement `get{{Resource}}s` function (all and filtered).
    *   4.1 [ ] **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}s` retrieves all {{resource}}s.
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}s` filters by `q` (search).
    *   4.2 [ ] **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `get{{Resource}}s` function.

5.0 [ ] **Objective:** Implement `get{{Resource}}ById` function.
    *   5.1 [ ] **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}ById` retrieves a specific {{resource}} by ID.
    *   5.2 [ ] **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `get{{Resource}}ById` function.

6.0 [ ] **Objective:** Implement `update{{Resource}}` function.
    *   6.1 [ ] **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `update{{Resource}}` successfully updates {{resource}} attributes.
    *   6.2 [ ] **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `update{{Resource}}` function.

7.0 [ ] **Objective:** Implement `delete{{Resource}}` function.
    *   7.1 [ ] **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `delete{{Resource}}` successfully removes a {{resource}}.
    *   7.2 [ ] **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `delete{{Resource}}` function.

### D. API Endpoints (backend/src/index.{{ext}} or similar)

8.0 [ ] **Objective:** Expose CRUD operations via {{Backend Framework}} routes.
    *   8.1 [ ] **Tests:**
        *   `test_api_endpoints.test.{{ext}}`: Test `POST /api/{{resource}}s` (create).
        *   `test_api_endpoints.test.{{ext}}`: Test `GET /api/{{resource}}s` (get all).
        *   `test_api_endpoints.test.{{ext}}`: Test `GET /api/{{resource}}s/:id` (get by ID).
    *   8.2 [ ] **Code:**
        *   `backend/src/index.{{ext}}`: {{Backend Framework}} application, routes, and integration with handlers.

## II. Frontend Development ({{Frontend Technology}})

### A. Project Setup {{Frontend Framework}} + {{Language}} + {{Build Tool}}, using {{Package Manager}}

9.0 [ ] **Objective:** Initialize {{Build Tool}} project with {{Frontend Framework}} and {{Language}}.
    *   9.1 [ ] **Tests:**
        *   `App.test.{{ext}}`: Verify basic app renders.
    *   9.2 [ ] **Code:**
        *   `frontend/package.json` (or equivalent): Dependencies.
        *   `frontend/tsconfig.json` (or equivalent): Configuration.
        *   `frontend/src/main.{{ext}}` (or equivalent): Entry point for app.
        *   `frontend/src/App.{{ext}}` (or equivalent): Basic component.

### B. Component Development

For each component, tests will be written to cover rendering, user interactions, and state changes before implementation.

10.0 [ ] **Objective:** Design and implement `{{Component Name}}` component.
    *   10.1 [ ] **Tests:**
        *   `{{Component Name}}.test.{{ext}}`: Test `{{Component Name}}` renders correctly.
    *   10.2 [ ] **Code:**
        *   `frontend/src/components/{{Component Name}}.{{ext}}`: Component file.

    *(Repeat for other key components: e.g., List, Form, FilterBar)*

### C. API Integration (frontend/src/services/api.{{ext}} or similar)

11.0 [ ] **Objective:** Create API service for interacting with backend.
    *   11.1 [ ] **Tests:**
        *   `api.test.{{ext}}`: Test `api.get{{Resource}}s` fetches data correctly.
    *   11.2 [ ] **Code:**
        *   `frontend/src/services/api.{{ext}}`: Functions for making API calls.

### D. Pages and Routing (frontend/src/pages)

12.0 [ ] **Objective:** Implement `{{Page Name}}` to display {{content}}.
    *   12.1 [ ] **Tests:**
        *   `{{Page Name}}.test.{{ext}}`: Test `{{Page Name}}` renders correctly.
    *   12.2 [ ] **Code:**
        *   `frontend/src/pages/{{Page Name}}.{{ext}}`: Page file.

    *(Repeat for other key pages: e.g., New{{Resource}}Page, {{Resource}}DetailPage)*

13.0 [ ] **Objective:** Set up {{Routing Library}} for navigation.
    *   13.1 [ ] **Tests:**
        *   `App.test.{{ext}}`: Test routing to different pages.
    *   13.2 [ ] **Code:**
        *   `frontend/src/App.{{ext}}`: Main application component with routing setup.

### E. UI Framework Integration ({{UI Framework, e.g., Material-UI}})

14.0 [ ] **Objective:** Integrate {{UI Framework}} components for a modern and consistent UI.
    *   14.1 [ ] **Tests:**
        *   `App.test.{{ext}}`: Verify {{UI Framework}} theme is applied.
        *   `{{Component Name}}.test.{{ext}}`: Test `{{Component Name}}` uses {{UI Framework}} components.
    *   14.2 [ ] **Code:**
        *   `frontend/src/App.{{ext}}`: Implement {{UI Framework}} ThemeProvider.
        *   `frontend/src/components/{{Component Name}}.{{ext}}`: Replace native HTML with {{UI Framework}} components.

## III. General Development Workflow:

1.0 [ ] **Write a failing test:** Create a new test file or add a new test case to an existing file that describes a small piece of functionality. Run the tests and ensure it fails (red phase).
2.0 [ ] **Write minimal code:** Implement just enough code to make the failing test pass. Do not add any extra functionality (green phase).
3.0 [ ] **Refactor:** Improve the code's design, readability, and maintainability without changing its external behavior. Run tests again to ensure nothing broke.
4.0 [ ] **Repeat:** Move to the next small piece of functionality and repeat the cycle.