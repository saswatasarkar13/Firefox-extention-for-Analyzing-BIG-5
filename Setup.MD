There is two part:- 1) API Server Part & 2) Firefox Add-on/ Extension Part

1) In API Server, We have to install some dependency
```
pip install nltk sklearn==1.0.2 fastapi uvicorn numpy pandas python-multipart joblib
```
Then go to the API folder and then run 
```
uvicorn api:app --reload
```
2) In extension/add-on part

Please go to ```about:debugging``` then click on “This Firefox” Then Load temporary Extension and Please select the ```Manifest.JSON``` file. 

Then we are good to go with the extention


