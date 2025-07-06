from sqlalchemy.orm import Session
from . import models, schemas

def get_prompt(db: Session, prompt_id: int):
    return db.query(models.Prompt).filter(models.Prompt.id == prompt_id).first()

def get_prompts(db: Session, skip: int = 0, limit: int = 100, q: str = None, tags: str = None):
    query = db.query(models.Prompt)
    if q:
        query = query.filter(models.Prompt.title.contains(q) | models.Prompt.text.contains(q))
    if tags:
        tag_list = [tag.strip() for tag in tags.split(',')]
        for tag in tag_list:
            query = query.filter(models.Prompt.tags.contains(tag))
    return query.offset(skip).limit(limit).all()

def create_prompt(db: Session, prompt: schemas.PromptCreate):
    db_prompt = models.Prompt(
        title=prompt.title,
        text=prompt.text,
        tags=",".join(prompt.tags)
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt

def update_prompt(db: Session, prompt_id: int, prompt: schemas.PromptCreate):
    db_prompt = db.query(models.Prompt).filter(models.Prompt.id == prompt_id).first()
    if db_prompt:
        db_prompt.title = prompt.title
        db_prompt.text = prompt.text
        db_prompt.tags = ",".join(prompt.tags)
        db.commit()
        db.refresh(db_prompt)
    return db_prompt

def delete_prompt(db: Session, prompt_id: int):
    db_prompt = db.query(models.Prompt).filter(models.Prompt.id == prompt_id).first()
    if db_prompt:
        db.delete(db_prompt)
        db.commit()
    return db_prompt
