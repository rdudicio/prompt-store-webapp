from datetime import datetime
from pydantic import ValidationError
import pytest

from backend.app.schemas import PromptBase, PromptCreate, Prompt

def test_prompt_base_valid_data():
    data = {"title": "Test Title", "text": "Test Text", "tags": ["tag1", "tag2"]}
    prompt_base = PromptBase(**data)
    assert prompt_base.title == "Test Title"
    assert prompt_base.text == "Test Text"
    assert prompt_base.tags == ["tag1", "tag2"]

def test_prompt_base_missing_title():
    with pytest.raises(ValidationError):
        PromptBase(text="Test Text", tags=["tag1"])

def test_prompt_base_missing_text():
    with pytest.raises(ValidationError):
        PromptBase(title="Test Title", tags=["tag1"])

def test_prompt_base_empty_tags():
    data = {"title": "Test Title", "text": "Test Text", "tags": []}
    prompt_base = PromptBase(**data)
    assert prompt_base.tags == []

def test_prompt_create_inherits_from_prompt_base():
    data = {"title": "Create Title", "text": "Create Text", "tags": ["new"]}
    prompt_create = PromptCreate(**data)
    assert prompt_create.title == "Create Title"

def test_prompt_valid_data():
    now = datetime.now()
    data = {
        "id": 1,
        "title": "Prompt Title",
        "text": "Prompt Text",
        "tags": ["tagA"],
        "created_at": now.isoformat(),
        "updated_at": now.isoformat()
    }
    prompt = Prompt(**data)
    assert prompt.id == 1
    assert prompt.title == "Prompt Title"
    assert prompt.created_at.isoformat() == now.isoformat()

def test_prompt_missing_id():
    now = datetime.now()
    with pytest.raises(ValidationError):
        Prompt(title="Title", text="Text", tags=[], created_at=now, updated_at=now)

def test_prompt_invalid_datetime_format():
    data = {
        "id": 1,
        "title": "Title",
        "text": "Text",
        "tags": [],
        "created_at": "invalid-date",
        "updated_at": "invalid-date"
    }
    with pytest.raises(ValidationError):
        Prompt(**data)
