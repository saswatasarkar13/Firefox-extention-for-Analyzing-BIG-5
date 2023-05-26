from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from predictor import preprocess_and_predict
import random

traits = ['Agreeableness', 'Conscientiousness', 'Extraversion', 'Neuroticism', 'Openness']


class Big(BaseModel):
    texts: list[str]


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
    # print(body)
    # Use the preprocess_and_predict function from predictor.py
    # result = preprocess_and_predict(body["text"])
    result = []
    for i in body["texts"]:
        result.append(traits[random.randint(0, 4)])
    # result = "Predict"

    return {"data": result}
