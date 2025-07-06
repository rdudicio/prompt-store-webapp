from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_create_prompt():
    response = client.post(
        "/api/prompts/",
        json={"title": "Test Prompt", "text": "This is a test prompt.", "tags": ["test", "example"]}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Prompt"
    assert response.json()["text"] == "This is a test prompt."
    assert "id" in response.json()
    assert "created_at" in response.json()
    assert "updated_at" in response.json()

def test_get_prompts():
    # Create a prompt first to ensure there's data
    client.post(
        "/api/prompts/",
        json={"title": "Another Prompt", "text": "Some text.", "tags": ["tag1"]}
    )
    response = client.get("/api/prompts/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_get_single_prompt():
    # Create a prompt first
    post_response = client.post(
        "/api/prompts/",
        json={"title": "Single Prompt", "text": "Details for single prompt.", "tags": ["single"]}
    )
    prompt_id = post_response.json()["id"]

    get_response = client.get(f"/api/prompts/{prompt_id}")
    assert get_response.status_code == 200
    assert get_response.json()["id"] == prompt_id
    assert get_response.json()["title"] == "Single Prompt"

def test_update_prompt():
    # Create a prompt first
    post_response = client.post(
        "/api/prompts/",
        json={"title": "Prompt to Update", "text": "Original text.", "tags": ["old"]}
    )
    prompt_id = post_response.json()["id"]

    update_response = client.put(
        f"/api/prompts/{prompt_id}",
        json={"title": "Updated Prompt", "text": "New text.", "tags": ["new"]}
    )
    assert update_response.status_code == 200
    assert update_response.json()["id"] == prompt_id
    assert update_response.json()["title"] == "Updated Prompt"
    assert update_response.json()["text"] == "New text."
    assert "new" in update_response.json()["tags"]

def test_delete_prompt():
    # Create a prompt first
    post_response = client.post(
        "/api/prompts/",
        json={"title": "Prompt to Delete", "text": "Text to be deleted.", "tags": ["delete"]}
    )
    prompt_id = post_response.json()["id"]

    delete_response = client.delete(f"/api/prompts/{prompt_id}")
    assert delete_response.status_code == 200
    assert delete_response.json() == {"message": "Prompt deleted successfully"}

    # Verify it's deleted
    get_response = client.get(f"/api/prompts/{prompt_id}")
    assert get_response.status_code == 404 # Assuming 404 for not found