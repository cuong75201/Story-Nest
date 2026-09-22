"""Custom application exceptions for domain and business-rule failures."""

from typing import Any

from fastapi import HTTPException, status


class AppException(HTTPException):
    """Base exception whose payload is compatible with the global API handler."""

    def __init__(
        self,
        status_code: int,
        message: str,
        code: str = "APPLICATION_ERROR",
        details: Any | None = None,
    ) -> None:
        super().__init__(
            status_code=status_code,
            detail={"message": message, "code": code, "details": details},
        )


class NotFoundError(AppException):
    def __init__(self, resource: str, details: Any | None = None) -> None:
        super().__init__(
            status.HTTP_404_NOT_FOUND,
            f"{resource} was not found.",
            "RESOURCE_NOT_FOUND",
            details,
        )


class AlreadyExistsError(AppException):
    def __init__(self, resource: str, details: Any | None = None) -> None:
        super().__init__(
            status.HTTP_409_CONFLICT,
            f"{resource} already exists.",
            "RESOURCE_ALREADY_EXISTS",
            details,
        )


class ForbiddenError(AppException):
    def __init__(self, message: str = "You do not have permission to perform this action.") -> None:
        super().__init__(status.HTTP_403_FORBIDDEN, message, "FORBIDDEN")


class BusinessRuleError(AppException):
    def __init__(self, message: str, code: str = "BUSINESS_RULE_VIOLATION", details: Any | None = None) -> None:
        super().__init__(status.HTTP_422_UNPROCESSABLE_CONTENT, message, code, details)
