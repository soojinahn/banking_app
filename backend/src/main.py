from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session

from . import crud,models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

import jwt
from fastapi.encoders import jsonable_encoder

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = {
    'http://localhost:3000',
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@app.post("/login", status_code=status.HTTP_200_OK)
async def login_customer(credentials:schemas.LoginBase, db:Session=Depends(get_db)):
    customer = crud.get_customer_by_email(db, credentials.email)
    if customer and customer.pin == credentials.pin:
        encoded_jwt = jwt.encode({'email': credentials.email, 'pin': credentials.pin}, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt, "name": customer.name, 'id': customer.id}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")

# add a new customer
@app.post("/customers/",status_code=status.HTTP_201_CREATED, response_model=schemas.Customer)
def post_customer(customer:schemas.CustomerCreate, db:Session=Depends(get_db)):
    db_user = crud.get_customer_by_email(db, email=customer.email)
    if db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    return crud.create_customer(db=db,customer=customer)

# fetch all customers
@app.get("/customers/", status_code=status.HTTP_200_OK, response_model=list[schemas.Customer])
def get_customers(skip:int=0, limit:int=5, db:Session=Depends(get_db)):
    customers = crud.get_customers(db,skip=skip,limit=limit)
    if not customers:
        raise HTTPException(status_code=404, detail="No customer found")
    return customers

# fetch all existing accounts
@app.get("/accounts/", status_code=status.HTTP_200_OK, response_model=list[schemas.Account])
def get_all_accounts(skip:int=0,limit:int=100,db:Session=Depends(get_db)):
    accounts = crud.get_all_accounts(db,skip=skip,limit=limit)
    if not accounts:
        raise HTTPException(status_code=404, detail="No account found")
    return accounts

# fetch specific customer
@app.get("/customers/{customer_id}/", status_code=status.HTTP_200_OK,response_model=schemas.Customer)
def get_customer_by_id(customer_id:int, db:Session=Depends(get_db)):
    db_user = crud.get_customer_by_id(db,customer_id =customer_id )
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# add a new account for a specific customer
@app.post("/customers/{customer_id}/accounts/", status_code=status.HTTP_201_CREATED, response_model=schemas.Account)
def post_customer_account(customer_id:int, account:schemas.AccountCreate, db:Session=Depends(get_db)):
    return crud.create_customer_account(db=db,customer_id=customer_id, account=account)

# fetch all accounts under a customer
@app.get("/customers/{customer_id}/accounts/", status_code=status.HTTP_200_OK, response_model=list[schemas.Account])
def get_all_customer_accounts(customer_id:int,db:Session=Depends(get_db)):
    accounts = crud.get_accounts_by_customer_id(db,customer_id=customer_id)
    if accounts is None:
        raise HTTPException(status_code=404, detail="No account under this customer")
    return accounts

# fetch specific account under a customer
@app.get("/customers/{customer_id}/accounts/{account_id}", status_code=status.HTTP_200_OK, response_model=schemas.Account)
def get_customer_account_by_id(customer_id:int, account_id:int, db:Session=Depends(get_db)):
    account = crud.get_account_by_id(db,customer_id=customer_id, account_id=account_id)
    if account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

# update a specific account under a customer
@app.put("/customers/{customer_id}/accounts/{account_id}", status_code=status.HTTP_200_OK, response_model=schemas.Account)
def update_customer_account_by_id(customer_id:int, account_id:int, data: dict, db:Session=Depends(get_db)):
    existing_account = crud.get_account_by_id(db, customer_id=customer_id, account_id=account_id)
    if existing_account is None:
        raise HTTPException(status_code=404, detail="Account not found.")
    updated_account = crud.update_account_by_id(db, account=existing_account, balance=data["balance"])
    return updated_account