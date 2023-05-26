# import nltk
# import pandas as pd
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import VotingClassifier
import joblib
from fitting_vectorizer import fitting_vectorizer

tfidf_vectorizer = fitting_vectorizer
def preprocess_and_predict(input_text):

    filename = "Ensemble_model1.joblib"   

    inp_txt = input_text.lower()
    inp_txt = ' '.join([word for word in inp_txt.split() if word not in stop_words])
    inp_txt = word_tokenize(inp_txt)
    inp_txt = [stemmer.stem(word) for word in inp_txt]
    inp_txt = ' '.join(inp_txt)  
    
    try:
        my_model = joblib.load(filename)
    except FileNotFoundError:
        print("Model file not found.")
        return None
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

    try:
        features_tfidf = tfidf_vectorizer.transform([inp_txt])
        my_model.fit(X_train_tfidf, train_df['label']) 
        prediction = my_model.predict(features_tfidf)
        return prediction[0]
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return None 