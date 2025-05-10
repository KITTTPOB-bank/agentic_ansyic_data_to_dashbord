from pydantic import BaseModel

class ReadFile(BaseModel):
    file: str