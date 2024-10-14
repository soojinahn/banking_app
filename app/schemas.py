from pydantic import BaseModel

class AccountBase(BaseModel):
    balance : float

class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    id : int
    owner_id  : int

    class Config:
        from_attributes = True


class CustomerBase(BaseModel):
    email: str
    name: str
    pin: str


class CustomerCreate(CustomerBase):
    pass 


class Customer(CustomerBase):
    id : int
    account : list[Account] = []

    class Config:
        orm_model = True

