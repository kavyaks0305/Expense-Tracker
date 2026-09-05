from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date as Date


from app.database import SessionLocal
from app.models.transactions import Transaction
from app.schemas.transactions import (
    TransactionListItem,
    TransactionsListQuery,
    TransactionsListResponse,
    TransactionItemPayload,
    TransactionUpdatePayload,
)

router = APIRouter(prefix="/transactions")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("", response_model=TransactionListItem)
def addTransaction(transaction: TransactionItemPayload, db: Session = Depends(get_db)):
    db_transaction = Transaction(
        type=transaction.type,
        paymentMethod=transaction.paymentMethod,
        note=transaction.note,
        amount=transaction.amount,
        category=transaction.category,
        date=transaction.date,
        name=transaction.name,
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


from math import ceil


@router.get("", response_model=TransactionsListResponse)
def getTransactions(
    page: int = 1,
    pageSize: int = 20,
    search: str | None = None,
    category: str | None = None,
    date_from: Date | None = None,
    date_to: Date | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Transaction)

    # Search
    if search:
        query = query.filter(Transaction.name.ilike(f"%{search}%"))

    # Category filter
    if category:
        query = query.filter(Transaction.category == category)

    # Date filters
    if date_from:
        query = query.filter(Transaction.date >= date_from)

    if date_to:
        query = query.filter(Transaction.date <= date_to)

    # Total records
    total = query.count()

    # Pagination
    offset = (page - 1) * pageSize

    transactions = query.offset(offset).limit(pageSize).all()

    total_pages = ceil(total / pageSize) if total > 0 else 0

    return {
        "items": transactions,
        "total": total,
        "page": page,
        "page_size": pageSize,
        "total_pages": total_pages,
    }


@router.get("/{id}", response_model=TransactionListItem)
def getTransaction(id: str, db: Session = Depends(get_db)):
    db_transaction = db.query(Transaction).filter(Transaction.id == id).first()

    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return db_transaction


@router.patch("/{id}", response_model=TransactionListItem)
def updateTransaction(
    id: int, transaction_data: TransactionUpdatePayload, db: Session = Depends(get_db)
):
    transaction = db.query(Transaction).filter(Transaction.id == id).first()

    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")

    update_data = transaction_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(transaction, field, value)

    db.commit()
    db.refresh(transaction)

    return transaction


@router.delete("/{id}")
def deleteTransaction(id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == id).first()

    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(transaction)
    db.commit()

    return {"message": "Transaction deleted successfully"}
