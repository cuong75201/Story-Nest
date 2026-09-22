"""A consistent envelope for every HTTP response from the API."""

from typing import Any, Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class ApiError(BaseModel):
    code: str
    details: Any | None = None


class ApiResponse(BaseModel, Generic[T]):
    status: bool
    message: str
    data: T | None = None
    error: ApiError | None = None


def success_response(data: T | None = None, message: str = "Success") -> ApiResponse[T]:
    return ApiResponse(status=True, message=message, data=data, error=None)


def error_response(message: str, code: str = "REQUEST_FAILED", details: Any | None = None) -> ApiResponse[None]:
    return ApiResponse(status=False, message=message, data=None, error=ApiError(code=code, details=details))
