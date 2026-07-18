from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bycrypt"], deprecated="auto")


# password hashing
def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str):
    return pwd_context.verify(plain_password, hashed_password)
