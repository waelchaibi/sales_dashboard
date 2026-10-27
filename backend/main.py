from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import (
    AccountError,
    authenticate,
    issue_token,
    load_settings,
    read_token,
    register_user,
)
from forecast import predict_next_month

app = FastAPI(title="Seif")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginBody(BaseModel):
    email: str
    password: str


class SignupBody(BaseModel):
    name: str
    email: str
    password: str


def current_email(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Connexion requise.")
    email = read_token(authorization.removeprefix("Bearer ").strip())
    if not email:
        raise HTTPException(status_code=401, detail="Session expirée.")
    return email


@app.post("/api/signup")
def signup(body: SignupBody):
    try:
        email = register_user(body.name, body.email, body.password)
    except AccountError as error:
        raise HTTPException(status_code=error.status, detail=str(error)) from error
    return {"token": issue_token(email), "email": email}


@app.post("/api/login")
def login(body: LoginBody):
    email = authenticate(body.email, body.password)
    if not email:
        raise HTTPException(status_code=401, detail="Identifiants incorrects.")
    return {"token": issue_token(email), "email": email}


@app.get("/api/me")
def me(email: str = Depends(current_email)):
    return {"email": email}


@app.get("/api/dashboard")
def dashboard(email: str = Depends(current_email)):
    return {"embedUrl": load_settings().get("embedUrl", "").strip()}


@app.get("/api/forecast")
def forecast(email: str = Depends(current_email)):
    try:
        return predict_next_month()
    except (FileNotFoundError, ValueError) as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
