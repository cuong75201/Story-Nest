from fastapi import FastAPI, HTTPException, status
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.database import engine
from app.exceptions import register_exception_handlers
from app.schemas import ApiResponse, success_response

app = FastAPI(title="Story Nest API")
register_exception_handlers(app)


@app.get("/health", response_model=ApiResponse[dict[str, str]])
def health() -> ApiResponse[dict[str, str]]:
    return success_response({"service": "story-nest"}, "API is running.")


@app.get("/health/db", response_model=ApiResponse[dict[str, str]])
def database_health() -> ApiResponse[dict[str, str]]:
    try:
        with engine.connect() as connection:
            database_name, database_user = connection.execute(
                text("SELECT current_database(), current_user")
            ).one()
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"message": "PostgreSQL connection failed.", "code": "DATABASE_CONNECTION_FAILED"},
        ) from exc

    return success_response(
        {"database": database_name, "user": database_user},
        "PostgreSQL connection successful.",
    )
