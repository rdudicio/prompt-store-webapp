# Promptstore Application

This is a full-stack CRUD application for managing coding prompts.

## Tech Stack

*   **Backend:** Python FastAPI
*   **Frontend:** React with Material-UI
*   **Database:** SQLite

## Setup

### Prerequisites

*   Python 3.8+
*   Node.js and npm

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
    (Note: If `requirements.txt` does not exist, you might need to generate it first using `pip freeze > requirements.txt` after installing dependencies like `fastapi`, `uvicorn`, `sqlalchemy`, `pydantic`.)

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Running the Backend

1.  Ensure you are in the `backend` directory and your virtual environment is activated.
2.  Start the FastAPI server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend will typically run on `http://localhost:8000`.

### Running the Frontend

1.  Ensure you are in the `frontend` directory.
2.  Start the React development server:
    ```bash
    npm start
    ```
    The frontend will typically open in your browser at `http://localhost:3000`.
