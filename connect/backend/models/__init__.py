from pydantic import BaseModel

class Inbox(BaseModel):
    owner: str
    email: str
    token: any
    provider: "gmail" or "outlook" or "other"
    