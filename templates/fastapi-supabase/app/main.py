from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.health import router as health_router

app = FastAPI(title="Proyecto Base API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)


@app.get("/")
def read_root():
    return {
        "service": "Proyecto Base API",
        "status": "ready",
        "next_step": "Normalizar brief y definir endpoints del dominio",
    }
