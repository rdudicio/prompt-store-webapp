# Promptstore Application Plan

This document outlines the plan for building the Promptstore application, a full-stack CRUD application for managing coding prompts.

## Tech Stack

*   **Backend:** Python FastAPI
*   **Frontend:** React with Material-UI
*   **Database:** SQLite

## Backend (FastAPI)

### 1. API Endpoints

The backend will expose a RESTful API for managing prompts.

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

We will use Pydantic to define the data models for request and response bodies.

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

We will use SQLAlchemy to interact with the SQLite database.

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

*   **`PromptCard`**: A Material-UI Card to display a prompt's title, a snippet of its text, and its tags.
*   **`PromptList`**: Fetches and displays a list of `PromptCard`s.
*   **`PromptForm`**: A form with fields for title, text, and tags for creating and editing prompts.
*   **`FilterBar`**: A component with a search input and a way to filter by tags.
*   **`HomePage`**: The main page that displays the `FilterBar` and `PromptList`.
*   **`PromptDetailPage`**: A page to display the full details of a single prompt.
*   **`NewPromptPage`**: A page that contains the `PromptForm` for creating a new prompt.

### 3. State Management

*   We will use React's `useState` and `useEffect` hooks for managing component-level state.
*   For global state, such as the list of prompts, we can use the `useContext` hook to avoid prop drilling.

### 4. API Interaction

*   We will use `axios` to make HTTP requests to the FastAPI backend from our React components. A dedicated `api.js` service file will encapsulate the API calls.

## Development Workflow

1.  **Backend First:**
    *   Set up the FastAPI application.
    *   Define the database model and create the database.
    *   Implement the API endpoints for CRUD operations.
    *   Write unit tests for the API.
2.  **Frontend Next:**
    *   Set up the React application using Create React App.
    *   Install Material-UI and `axios`.
    *   Create the components as outlined above.
    *   Implement the routing for different pages.
    *   Connect the frontend to the backend API.
3.  **Styling and Refinement:**
    *   Apply Material-UI styling to create a clean and modern UI.
    *   Refine the user experience.
