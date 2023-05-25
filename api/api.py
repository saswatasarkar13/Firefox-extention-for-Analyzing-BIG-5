import os
from fastapi import FastAPI, Form
from predictor import preprocess_and_predict

app = FastAPI()

def run_python_script():
    anaconda_path = "/opt/anaconda"  # Replace with the actual path to your Anaconda installation

    # Step 1: Activate the Anaconda environment
    activate_path = os.path.join(anaconda_path, "bin", "activate")
    os.system(f"source {activate_path}")

    # Step 2: Activate the base environment
    os.system("conda activate base")

    # Step 3: Run the FastAPI server
    app.run(host="0.0.0.0", port=8000)

@app.post("/api")
async def root(
    text: str = Form(...)
):
    # Use the preprocess_and_predict function from predictor.py
    result = preprocess_and_predict(text)

    return {"data": result}

if __name__ == "__main__":
    run_python_script()