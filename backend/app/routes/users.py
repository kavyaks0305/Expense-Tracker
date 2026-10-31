from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/self", response_model=UserResponse)
def get_user_details(current_user: User = Depends(get_current_user)):
    return current_user