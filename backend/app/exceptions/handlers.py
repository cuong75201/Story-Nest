"""Centralized HTTP exception handlers for the API response contract."""

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.schemas import error_response


async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, dict) else {}
    response = error_response(
        message=detail.get("message", str(exc.detail)),
        code=detail.get("code", "REQUEST_FAILED"),
        details=detail.get("details"),
    )
    return JSONResponse(status_code=exc.status_code, content=response.model_dump())


async def request_validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    """Return FastAPI request validation failures in the shared API envelope."""
    response = error_response(
        message="Request validation failed.",
        code="VALIDATION_ERROR",
        details=exc.errors(),
    )
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, content=jsonable_encoder(response.model_dump()))


async def unexpected_exception_handler(_: Request, __: Exception) -> JSONResponse:
    response = error_response("An unexpected server error occurred.", "INTERNAL_SERVER_ERROR")
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=response.model_dump())


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, request_validation_exception_handler)
    app.add_exception_handler(Exception, unexpected_exception_handler)
