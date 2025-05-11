from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from model import stucter
from fastapi import FastAPI
from handler import create_db
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/items")
async def read_item(file: UploadFile = File(...)):
    print("Received file:", file)
    
    # process = await create_db.read_csv(file)
    
    return JSONResponse(content={"success": "process"})

@app.post("/process")
async def anysic():
    return None