"""PostgreSQL connection setup for the Story Nest API."""

import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

# Load the repository .env whether Uvicorn starts in the repository root or backend/.
load_dotenv(Path(__file__).resolve().parents[2] / ".env")

database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise RuntimeError("DATABASE_URL is required. Copy .env.example to .env and configure PostgreSQL.")

# SQLAlchemy needs the psycopg v3 driver name. Keep either common PostgreSQL URL form usable.
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    

engine = create_engine(database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


class Base(DeclarativeBase):
    """Base class shared by all mapped Story Nest models."""


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that supplies one database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
