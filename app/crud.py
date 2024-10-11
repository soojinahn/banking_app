from sqlalchemy.orm import Session

from . import models,schemas


def get_user(db: Session, user_id: int):
    return db.query(models.Customer).filter(models.Customer.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.Customer).filter(models.Customer.email == email).first()


def get_users(db: Session, skip:int=0, limit:int=100):
    # return db.query(models.User).offset(skip).limit(limit).all()
    return db.query(models.Customer).offset(skip).limit(limit).all()


def create_user(db: Session, user:schemas.CustomerCreate):
    db_user = models.Customer(email=user.email,
                          name=user.name,
                          pin=user.pin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_accounts(db: Session, skip:int=0, limit: int=100):
    return db.query(models.Account).offset(skip).limit(limit).all()


def create_user_account(db:Session, account:schemas.AccountCreate, user_id : int):
    db_account = models.Account(**account.model_dump(),owner_id=user_id )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account