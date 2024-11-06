from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session

import jwt
from . import crud
from .database import get_db
from dotenv import load_dotenv
import os

load_dotenv()

SECERT_KEY = os.getenv("SECRET_KEY")
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def authenticate_customer(email:str, pin=str, db:Session=Depends(get_db)):
    customer = crud.get_customer_by_email(db, email)
    if not customer:
        return False
    if not pwd_context.verify(pin, customer.hashed_pin):
        return False
    return customer

def create_access_token(data:dict, expires_delta:timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECERT_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def verify_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECERT_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return payload
    except:
        raise credentials_exception