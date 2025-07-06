from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  # React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/prompts", response_model=schemas.Prompt)
def create_prompt(prompt: schemas.PromptCreate, db: Session = Depends(get_db)):
    return crud.create_prompt(db=db, prompt=prompt)


@app.get("/api/prompts", response_model=list[schemas.Prompt])
def read_prompts(skip: int = 0, limit: int = 100, q: str = None, tags: str = None, db: Session = Depends(get_db)):
    prompts = crud.get_prompts(db, skip=skip, limit=limit, q=q, tags=tags)
    return prompts


@app.get("/api/prompts/{prompt_id}", response_model=schemas.Prompt)
def read_prompt(prompt_id: int, db: Session = Depends(get_db)):
    db_prompt = crud.get_prompt(db, prompt_id=prompt_id)
    if db_prompt is None:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return db_prompt


@app.put("/api/prompts/{prompt_id}", response_model=schemas.Prompt)
def update_prompt(prompt_id: int, prompt: schemas.PromptCreate, db: Session = Depends(get_db)):
    return crud.update_prompt(db=db, prompt_id=prompt_id, prompt=prompt)


@app.delete("/api/prompts/{prompt_id}", response_model=schemas.Prompt)
def delete_prompt(prompt_id: int, db: Session = Depends(get_db)):
    return crud.delete_prompt(db=db, prompt_id=prompt_id)
