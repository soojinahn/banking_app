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


class CustomerCreate(CustomerBase):
    email: str
    name: str
    pin: str


class Customer(CustomerBase):
    id : int
    accounts : list[Account] = []

    class ConfigDict:
        orm_model = True


class LoginBase(BaseModel):
    email: str
    pin: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class UserInDB(CustomerBase):
    hashed_password: str
