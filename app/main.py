from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from . import crud,models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#Dependency
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@app.post("/users/",response_model=schemas.Customer)
def post_user(user:schemas.CustomerCreate, db:Session=Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db,user=user)

@app.get("/users/", response_model=list[schemas.Customer])
def get_users(skip:int=0, limit:int=5, db:Session=Depends(get_db)):
    users = crud.get_users(db,skip=skip,limit=limit)
    return users

@app.get("/users/{user_id}/",response_model=schemas.Customer)
def get_user(user_id:int, db:Session=Depends(get_db)):
    db_user = crud.get_user(db,user_id =user_id )
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/accounts/",response_model=schemas.Account)
def post_account_for_user(user_id:int, account:schemas.AccountCreate, db:Session=Depends(get_db)):
    return crud.create_user_account(db=db,user_id=user_id, account=account)


@app.get("/accounts/", response_model=list[schemas.Account])
def get_accounts(skip:int=0,limit:int=100,db:Session=Depends(get_db)):
    todos = crud.get_accounts(db,skip=skip,limit=limit)
    return todos