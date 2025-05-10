from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from model import stucter
from fastapi import FastAPI
from handler import create_db
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/read")
async def read_item(data: stucter.ReadFile):
    print(data)
    process = await create_db.read_csv(data)
    return {"sussess": process}



@app.post("/process")
async def anysic():
    return None