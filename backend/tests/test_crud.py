from sqlalchemy.orm import Session
import pytest
from unittest.mock import MagicMock
from datetime import datetime
import json

from backend.app import crud, models, schemas

# Mock database session
@pytest.fixture
def db_session_mock():
    return MagicMock(spec=Session)

def test_create_prompt_db(db_session_mock):
    prompt_data = schemas.PromptCreate(title="Test DB Prompt", text="This is a test prompt for DB.", tags=["db", "test"])
    
    # Mock the add and commit methods
    db_session_mock.add.return_value = None
    db_session_mock.commit.return_value = None
    def refresh_side_effect(obj):
        obj.id = 1
    db_session_mock.refresh.side_effect = refresh_side_effect

    # Mock the created Prompt object that would be returned after commit/refresh
    mock_db_prompt = models.Prompt(
            id=1,
            title=prompt_data.title,
            text=prompt_data.text,
            tags=json.dumps(prompt_data.tags),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    db_session_mock.query.return_value.filter.return_value.first.return_value = mock_db_prompt

    prompt = crud.create_prompt(db=db_session_mock, prompt=prompt_data)

    db_session_mock.add.assert_called_once()
    db_session_mock.commit.assert_called_once()
    db_session_mock.refresh.assert_called_once()

    assert prompt.title == "Test DB Prompt"
    assert prompt.text == "This is a test prompt for DB."
    assert "db" in prompt.tags
    assert prompt.id == 1

def test_get_prompts_db(db_session_mock):
    mock_prompts = [
        models.Prompt(id=1, title="P1", text="T1", tags=json.dumps(["t1"]), created_at=datetime.now(), updated_at=datetime.now()),
        models.Prompt(id=2, title="P2", text="T2", tags=json.dumps(["t2"]), created_at=datetime.now(), updated_at=datetime.now()),
    ]
    db_session_mock.query.return_value.offset.return_value.limit.return_value.all.return_value = mock_prompts

    prompts = crud.get_prompts(db=db_session_mock)
    assert len(prompts) == 2
    assert prompts[0].title == "P1"

def test_get_prompt_by_id_db(db_session_mock):
    mock_prompt = models.Prompt(id=1, title="Single DB Prompt", text="Text", tags=json.dumps(["single"]), created_at=datetime.now(), updated_at=datetime.now())
    db_session_mock.query.return_value.filter.return_value.first.return_value = mock_prompt

    prompt = crud.get_prompt(db=db_session_mock, prompt_id=1)
    assert prompt.title == "Single DB Prompt"
    assert prompt.id == 1

def test_update_prompt_db(db_session_mock):
    existing_prompt = models.Prompt(id=1, title="Old Title", text="Old Text", tags=json.dumps(["old"]), created_at=datetime.now(), updated_at=datetime.now())
    db_session_mock.query.return_value.filter.return_value.first.return_value = existing_prompt

    update_data = schemas.PromptCreate(title="New Title", text="New Text", tags=["new"])
    
    updated_prompt = crud.update_prompt(db=db_session_mock, prompt_id=1, prompt=update_data)

    db_session_mock.commit.assert_called_once()
    db_session_mock.refresh.assert_called_once()

    assert updated_prompt.title == "New Title"
    assert updated_prompt.text == "New Text"
    assert "new" in updated_prompt.tags

def test_delete_prompt_db(db_session_mock):
    existing_prompt = models.Prompt(id=1, title="Delete Me", text="Text", tags=json.dumps(["delete"]), created_at=datetime.now(), updated_at=datetime.now())
    db_session_mock.query.return_value.filter.return_value.first.return_value = existing_prompt

    deleted_prompt = crud.delete_prompt(db=db_session_mock, prompt_id=1)

    db_session_mock.delete.assert_called_once_with(existing_prompt)
    db_session_mock.commit.assert_called_once()

    assert deleted_prompt.title == "Delete Me"
