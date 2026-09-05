from pydantic import BaseModel, Field
from datetime import date as Date


class TransactionItemPayload(BaseModel):
    name: str | None = None
    type: str | None = None
    paymentMethod: str | None = None
    amount: float
    category: str | None = None
    date: Date | None = None
    note: str | None = None


class TransactionsListQuery(BaseModel):
    page: int = Field(default=1, ge=1)
    pageSize: int = Field(default=20, ge=1, le=100)
    search: str | None = None
    category: str | None = None
    date_from: Date | None = None
    date_to: Date | None = None


class TransactionListItem(BaseModel):
    id: int
    type: str | None = None
    paymentMethod: str | None = None
    note: str | None = None
    amount: float
    category: str | None = None
    date: Date
    name: str | None = None


class TransactionsListResponse(BaseModel):
    items: list[TransactionListItem]
    total: int
    page: int
    page_size: int
    total_pages: int


class TransactionUpdatePayload(BaseModel):
    type: str | None = None
    paymentMethod: str | None = None
    note: str | None = None
    amount: float | None = None
    category: str | None = None
    date: Date | None = None
    name: str | None = None
