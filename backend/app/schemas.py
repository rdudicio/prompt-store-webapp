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
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
