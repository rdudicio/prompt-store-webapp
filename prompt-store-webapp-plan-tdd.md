# Promptstore Application Plan (TDD Approach)

This document outlines the plan for building the Promptstore application, a full-stack CRUD application for managing coding prompts, with a strong emphasis on Test-Driven Development (TDD).

## Tech Stack

*   **Backend:** Python FastAPI
*   **Frontend:** React with Material-UI
*   **Database:** SQLite

## Backend (FastAPI)

### 1. API Endpoints

The backend will expose a RESTful API for managing prompts. For each endpoint, the TDD cycle will be applied:
1.  **Write a failing test:** Define the expected behavior (request, response, status codes, data validation) as a test.
2.  **Write minimum code to pass:** Implement just enough code to make the test pass.
3.  **Refactor:** Improve the code's design without changing its behavior.

*   **`POST /api/prompts`**: Create a new prompt.
    *   **Request Body:** A JSON object with `title`, `text`, and `tags`.
    *   **Response:** The newly created prompt object.
*   **`GET /api/prompts`**: Get a list of all prompts.
    *   **Query Parameters:**
        *   `q`: Search query to filter prompts by title or text.
        *   `tags`: Comma-separated list of tags to filter by.
    *   **Response:** A JSON array of prompt objects.
*   **`GET /api/prompts/{prompt_id}`**: Get a single prompt by its ID.
    *   **Response:** A JSON object of the prompt.
*   **`PUT /api/prompts/{prompt_id}`**: Update an existing prompt.
    *   **Request Body:** A JSON object with the fields to update (`title`, `text`, `tags`).
    *   **Response:** The updated prompt object.
*   **`DELETE /api/prompts/{prompt_id}`**: Delete a prompt.
    *   **Response:** A success message.

### 2. Data Model (Pydantic)

We will use Pydantic to define the data models for request and response bodies. Tests will be written to ensure correct validation, serialization, and deserialization of data.

```python
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PromptBase(BaseModel):
    title: str
    text: str
    tags: List[str] = []

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
```

### 3. Database (SQLAlchemy)

We will use SQLAlchemy to interact with the SQLite database. Tests will be written for all database interactions (e.g., creating, retrieving, updating, deleting prompts) before implementing the SQLAlchemy models and CRUD operations.

*   **Model:** A `Prompt` model will be defined to map to the `prompts` table.
*   **Database Utilities:** Functions to create the database and tables, and to get a database session.

## Database (SQLite)

The database will have a single table: `prompts`.

*   **`id`**: INTEGER, PRIMARY KEY, AUTOINCREMENT
*   **`title`**: TEXT, NOT NULL
*   **`text`**: TEXT, NOT NULL
*   **`tags`**: TEXT (storing tags as a comma-separated string)
*   **`created_at`**: DATETIME, DEFAULT CURRENT_TIMESTAMP
*   **`updated_at`**: DATETIME, DEFAULT CURRENT_TIMESTAMP

## Frontend (React + Material-UI)

### 1. Project Structure

```
/frontend
|-- /src
|   |-- /components
|   |   |-- PromptCard.js
|   |   |-- PromptForm.js
|   |   |-- PromptList.js
|   |   |-- FilterBar.js
|   |-- /pages
|   |   |-- HomePage.js
|   |   |-- PromptDetailPage.js
|   |   |-- NewPromptPage.js
|   |-- /services
|   |   |-- api.js
|   |-- App.js
|   |-- index.js
```

### 2. Components

For each component, tests will be written to cover rendering, user interactions, and state changes before implementation.

*   **`PromptCard`**: A Material-UI Card to display a prompt's title, a snippet of its text, and its tags.
*   **`PromptList`**: Fetches and displays a list of `PromptCard`s.
*   **`PromptForm`**: A form with fields for title, text, and tags for creating and editing prompts.
*   **`FilterBar`**: A component with a search input and a way to filter by tags.
*   **`HomePage`**: The main page that displays the `FilterBar` and `PromptList`.
*   **`PromptDetailPage`**: A page to display the full details of a single prompt.
*   **`NewPromptPage`**: A page that contains the `PromptForm` for creating a new prompt.

### 3. State Management

We will use React's `useState` and `useEffect` hooks for managing component-level state. For global state, such as the list of prompts, we can use the `useContext` hook to avoid prop drilling. Tests will ensure state updates correctly.

### 4. API Interaction

We will use `axios` to make HTTP requests to the FastAPI backend from our React components. A dedicated `api.js` service file will encapsulate the API calls. Tests will mock API calls and verify correct request formatting and response handling.

## Development Workflow (TDD)

1.  **Backend First (TDD Cycle for each feature/endpoint):**
    *   **Write Failing Tests:** For a specific API endpoint or database interaction, write unit and integration tests that define the desired behavior and will initially fail.
    *   **Implement Minimum Code:** Write just enough backend code (FastAPI endpoint, SQLAlchemy model/CRUD operation) to make the newly written tests pass.
    *   **Refactor:** Improve the code's structure, readability, and efficiency without altering its external behavior. Rerun tests to ensure nothing broke.
    *   Repeat for all backend features.

2.  **Frontend Next (TDD Cycle for each component/feature):**
    *   **Write Failing Tests:** For a specific React component or UI interaction, write tests (e.g., using React Testing Library) that define the desired rendering, user interaction, or state management behavior and will initially fail.
    *   **Implement Minimum Code:** Write just enough frontend code (React component, API integration logic) to make the newly written tests pass.
    *   **Refactor:** Improve the code's structure, readability, and efficiency. Rerun tests to ensure nothing broke.
    *   Repeat for all frontend components and features.

3.  **Styling and Refinement:**
    *   Apply Material-UI styling to create a clean and modern UI.
    *   Refine the user experience.
    *   Ensure all existing tests still pass after styling changes.
