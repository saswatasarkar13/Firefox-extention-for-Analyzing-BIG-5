from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from predictor import preprocess_and_predict

origins = [
  "*"
]

class Big(BaseModel):
    text: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api")
async def root(
    body: Big
):
    body = body.dict()
    print(body)
    # Use the preprocess_and_predict function from predictor.py
    # result = preprocess_and_predict(body["text"])

    result = "Predict"
    
    return {"data":result}
