from pydantic import BaseModel

class AccountBase(BaseModel):
    balance : float

class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    id : int
    owner_id  : int

    class ConfigDict:
        from_attributes = True


class CustomerBase(BaseModel):
    email: str
    name: str
    pin: str


class CustomerCreate(CustomerBase):
    pass 


class Customer(CustomerBase):
    id : int
    accounts : list[Account] = []

    class ConfigDict:
        orm_model = True

