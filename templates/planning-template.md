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

1.  **Objective:** Initialize {{Backend Technology}} project with {{Language/Framework}} and configure for {{Deployment/DB, e.g., Wrangler/SQLite}}.
    *   **Tests:**
        *   `test_backend_setup.test.{{ext}}`: Verify basic backend app runs and returns a simple response.
    *   **Code:**
        *   `backend/package.json` (or equivalent): Dependencies.
        *   `backend/tsconfig.json` (or equivalent): Configuration.
        *   `backend/src/index.{{ext}}` (or equivalent): Basic app setup.

### B. Database Setup

1.  **Objective:** Define database schema and establish connection to {{Database Technology}}.
    *   **Tests:**
        *   `test_database_connection.test.{{ext}}`: Verify successful connection to database.
        *   `test_schema.test.{{ext}}`: Test schema definition for `{{main_table}}` table.
    *   **Code:**
        *   `backend/src/db/schema.{{ext}}` (or equivalent): Define schema for `{{main_table}}` table.
        *   `backend/src/db/index.{{ext}}` (or equivalent): Database connection setup.
        *   `backend/src/db/migrations/` (or equivalent): Initial migration file.

### C. CRUD Operations (backend/src/handlers/{{resource}}.{{ext}} or similar)

1.  **Objective:** Implement `create{{Resource}}` function.
    *   **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `create{{Resource}}` successfully adds a {{resource}} to the database.
    *   **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `create{{Resource}}` function.
        *   `backend/src/types.{{ext}}`: Define interfaces/models for {{Resource}} data.

2.  **Objective:** Implement `get{{Resource}}s` function (all and filtered).
    *   **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}s` retrieves all {{resource}}s.
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}s` filters by `q` (search).
    *   **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `get{{Resource}}s` function.

3.  **Objective:** Implement `get{{Resource}}ById` function.
    *   **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `get{{Resource}}ById` retrieves a specific {{resource}} by ID.
    *   **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `get{{Resource}}ById` function.

4.  **Objective:** Implement `update{{Resource}}` function.
    *   **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `update{{Resource}}` successfully updates {{resource}} attributes.
    *   **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `update{{Resource}}` function.

5.  **Objective:** Implement `delete{{Resource}}` function.
    *   **Tests:**
        *   `test_{{resource}}_handler.test.{{ext}}`: Test `delete{{Resource}}` successfully removes a {{resource}}.
    *   **Code:**
        *   `backend/src/handlers/{{resource}}.{{ext}}`: `delete{{Resource}}` function.

### D. API Endpoints (backend/src/index.{{ext}} or similar)

1.  **Objective:** Expose CRUD operations via {{Backend Framework}} routes.
    *   **Tests:**
        *   `test_api_endpoints.test.{{ext}}`: Test `POST /api/{{resource}}s` (create).
        *   `test_api_endpoints.test.{{ext}}`: Test `GET /api/{{resource}}s` (get all).
        *   `test_api_endpoints.test.{{ext}}`: Test `GET /api/{{resource}}s/:id` (get by ID).
    *   **Code:**
        *   `backend/src/index.{{ext}}`: {{Backend Framework}} application, routes, and integration with handlers.

## II. Frontend Development ({{Frontend Technology}})

### A. Project Setup {{Frontend Framework}} + {{Language}} + {{Build Tool}}, using {{Package Manager}}

1.  **Objective:** Initialize {{Build Tool}} project with {{Frontend Framework}} and {{Language}}.
    *   **Tests:**
        *   `App.test.{{ext}}`: Verify basic app renders.
    *   **Code:**
        *   `frontend/package.json` (or equivalent): Dependencies.
        *   `frontend/tsconfig.json` (or equivalent): Configuration.
        *   `frontend/src/main.{{ext}}` (or equivalent): Entry point for app.
        *   `frontend/src/App.{{ext}}` (or equivalent): Basic component.

### B. Component Development

For each component, tests will be written to cover rendering, user interactions, and state changes before implementation.

1.  **Objective:** Design and implement `{{Component Name}}` component.
    *   **Tests:**
        *   `{{Component Name}}.test.{{ext}}`: Test `{{Component Name}}` renders correctly.
    *   **Code:**
        *   `frontend/src/components/{{Component Name}}.{{ext}}`: Component file.

    *(Repeat for other key components: e.g., List, Form, FilterBar)*

### C. API Integration (frontend/src/services/api.{{ext}} or similar)

1.  **Objective:** Create API service for interacting with backend.
    *   **Tests:**
        *   `api.test.{{ext}}`: Test `api.get{{Resource}}s` fetches data correctly.
    *   **Code:**
        *   `frontend/src/services/api.{{ext}}`: Functions for making API calls.

### D. Pages and Routing (frontend/src/pages)

1.  **Objective:** Implement `{{Page Name}}` to display {{content}}.
    *   **Tests:**
        *   `{{Page Name}}.test.{{ext}}`: Test `{{Page Name}}` renders correctly.
    *   **Code:**
        *   `frontend/src/pages/{{Page Name}}.{{ext}}`: Page file.

    *(Repeat for other key pages: e.g., New{{Resource}}Page, {{Resource}}DetailPage)*

2.  **Objective:** Set up {{Routing Library}} for navigation.
    *   **Tests:**
        *   `App.test.{{ext}}`: Test routing to different pages.
    *   **Code:**
        *   `frontend/src/App.{{ext}}`: Main application component with routing setup.

### E. UI Framework Integration ({{UI Framework, e.g., Material-UI}})

1.  **Objective:** Integrate {{UI Framework}} components for a modern and consistent UI.
    *   **Tests:**
        *   `App.test.{{ext}}`: Verify {{UI Framework}} theme is applied.
        *   `{{Component Name}}.test.{{ext}}`: Test `{{Component Name}}` uses {{UI Framework}} components.
    *   **Code:**
        *   `frontend/src/App.{{ext}}`: Implement {{UI Framework}} ThemeProvider.
        *   `frontend/src/components/{{Component Name}}.{{ext}}`: Replace native HTML with {{UI Framework}} components.

## III. General Development Workflow:

1.  **Write a failing test:** Create a new test file or add a new test case to an existing file that describes a small piece of functionality. Run the tests and ensure it fails (red phase).
2.  **Write minimal code:** Implement just enough code to make the failing test pass. Do not add any extra functionality (green phase).
3.  **Refactor:** Improve the code's design, readability, and maintainability without changing its external behavior. Run tests again to ensure nothing broke.
4.  **Repeat:** Move to the next small piece of functionality and repeat the cycle.