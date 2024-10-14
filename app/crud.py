from sqlalchemy.orm import Session

from . import models,schemas

#CUSTOMER CRUD
def create_customer(db: Session, customer:schemas.CustomerCreate):
    db_user = models.Customer(email=customer.email,
                          name=customer.name,
                          pin=customer.pin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()


def get_customer_by_email(db: Session, email: str):
    return db.query(models.Customer).filter(models.Customer.email == email).first()


def get_customers(db: Session, skip:int=0, limit:int=100):
    # return db.query(models.User).offset(skip).limit(limit).all()
    return db.query(models.Customer).offset(skip).limit(limit).all()

#ACCOUNT CRUD
def create_customer_account(db:Session, account:schemas.AccountCreate, customer_id : int):
    db_account = models.Account(**account.model_dump(),owner_id=customer_id )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account


def get_accounts(db: Session, skip:int=0, limit:int=100):
    return db.query(models.Account).offset(skip).limit(limit).all()


def get_accounts_by_customer_id(db:Session, customer_id:int):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    return customer.accounts

def update_account_by_customer_id(db: Session, customer_id:int, account_id: int, balance: float):
    account = db.query(models.Account).filter(models.Account.owner_id == customer_id, models.Account.id == account_id).first()
    if account:
        print("Account retrieval successful.")
    account.balance = balance
    if account:
        print(account.id, account.owner_id, account.balance)
    db.commit()
    db.refresh(account)
    return account

