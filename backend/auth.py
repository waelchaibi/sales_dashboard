import base64
import hashlib
import hmac
import json
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
USERS_PATH = ROOT / "users.json"
SETTINGS_PATH = ROOT / "settings.json"
TOKEN_TTL_SECONDS = 60 * 60 * 12


def load_settings():
    return json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))


def load_users():
    return json.loads(USERS_PATH.read_text(encoding="utf-8"))["users"]


def verify_password(password, stored):
    algorithm, iterations, salt_b64, hash_b64 = stored.split("$")
    if algorithm != "pbkdf2_sha256":
        return False
    salt = base64.b64decode(salt_b64)
    expected = base64.b64decode(hash_b64)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, int(iterations)
    )
    return hmac.compare_digest(digest, expected)


def authenticate(email, password):
    normalized = email.strip().lower()
    for user in load_users():
        if user["email"].lower() == normalized and verify_password(
            password, user["password"]
        ):
            return user["email"]
    return None


def issue_token(email):
    payload = json.dumps(
        {"email": email, "exp": int(time.time()) + TOKEN_TTL_SECONDS},
        separators=(",", ":"),
    ).encode("utf-8")
    body = base64.urlsafe_b64encode(payload).decode("ascii")
    secret = load_settings()["tokenSecret"].encode("utf-8")
    signature = hmac.new(secret, body.encode("ascii"), hashlib.sha256).hexdigest()
    return f"{body}.{signature}"


def read_token(token):
    if not token or "." not in token:
        return None
    body, signature = token.rsplit(".", 1)
    secret = load_settings()["tokenSecret"].encode("utf-8")
    expected = hmac.new(secret, body.encode("ascii"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return None
    try:
        payload = json.loads(base64.urlsafe_b64decode(body.encode("ascii")))
    except (ValueError, json.JSONDecodeError):
        return None
    if payload.get("exp", 0) < time.time():
        return None
    return payload.get("email")
