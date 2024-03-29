from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predictor import preprocess_and_predict


class Big(BaseModel):
    text: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    result = preprocess_and_predict(body["text"])
    print(result)
    # result = []
    # for i in body["texts"]:
    #     result.append(preprocess_and_predict(i))
    # result = "Predict"

    return {"data": result}
