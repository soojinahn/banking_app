from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from .database import Base

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(255),index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_pin = Column(String(255))
    
    accounts = relationship("Account",back_populates="owner")
    
class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, index=True)
    balance = Column(Float)
    owner_id = Column(Integer, ForeignKey("customers.id"))

    owner = relationship("Customer",back_populates="accounts")
