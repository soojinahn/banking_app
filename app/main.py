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

@app.post("/customers/",response_model=schemas.Customer)
def post_customer(customer:schemas.CustomerCreate, db:Session=Depends(get_db)):
    db_user = crud.get_customer_by_email(db, email=customer.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_customer(db=db,customer=customer)

@app.get("/customers/", response_model=list[schemas.Customer])
def get_customers(skip:int=0, limit:int=5, db:Session=Depends(get_db)):
    customers = crud.get_customers(db,skip=skip,limit=limit)
    return customers

@app.get("/customers/{customer_id}/",response_model=schemas.Customer)
def get_customer(customer_id:int, db:Session=Depends(get_db)):
    db_user = crud.get_customer(db,customer_id =customer_id )
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/customers/{customer_id}/accounts/",response_model=schemas.Account)
def post_account_for_customer(customer_id:int, account:schemas.AccountCreate, db:Session=Depends(get_db)):
    return crud.create_customer_account(db=db,customer_id=customer_id, account=account)


@app.get("/customers/{customer_id}/accounts/", response_model=list[schemas.Account])
def get_customer_accounts(customer_id:int,db:Session=Depends(get_db)):
    accounts = crud.get_accounts_by_customer_id(db,customer_id=customer_id)
    if accounts is None:
        raise HTTPException(status_code=404, detail="No account under this customer")
    return accounts


@app.get("/accounts/", response_model=list[schemas.Account])
def get_all_accounts(skip:int=0,limit:int=100,db:Session=Depends(get_db)):
    accounts = crud.get_accounts(db,skip=skip,limit=limit)
    return accounts


@app.put("/customers/{customer_id}/accounts/{account_id}", response_model=schemas.Account)
def update_customer_account(balance:float, customer_id:int, account_id:int, db:Session=Depends(get_db)):
    account = crud.update_account_by_customer_id(db=db,customer_id=customer_id, account_id=account_id, balance=balance)
    if account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return account