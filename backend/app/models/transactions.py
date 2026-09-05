from sqlalchemy import Column, Integer, String, Date
from app.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    name = Column(String, index=True)
    # income | expense
    type = Column(String, index=True)
    category = Column(String, index=True)
    amount = Column(Integer, index=True, nullable=False)
    # bank transfer | upi | credit card | debit card | cash
    paymentMethod = Column(String, index=True, nullable=False)
    note = Column(String, index=True)
