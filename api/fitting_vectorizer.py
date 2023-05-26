import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import VotingClassifier
import joblib

def fitting_vectorizer(input_text):
    df1 = pd.read_excel('bng2eng2/train/ConscientiousnessTrain.xlsx')
    df2 = pd.read_excel('bng2eng2/train/AgreeablenessTrain.xlsx')
    df3 = pd.read_excel('bng2eng2/train/NeuroticismTrain.xlsx')
    df4 = pd.read_excel('bng2eng2/train/ExtroversionTrain.xlsx')
    df5 = pd.read_excel('bng2eng2/train/OpennessTrain.xlsx')
    train_df = pd.concat([df1, df2, df3, df4, df5], ignore_index=True)
    train_df = train_df.drop("status", axis='columns')
    # Preprocess the text input
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()
    
    train_df['status_text'] = train_df['status_text'].apply(lambda x: x.lower())
    train_df['status_text'] = train_df['status_text'].apply(lambda x: ' '.join([word for word in x.split() if word not in stop_words]))
    train_df['status_text'] = train_df['status_text'].apply(lambda x: word_tokenize(x))
    train_df['status_text'] = train_df['status_text'].apply(lambda x: [stemmer.stem(word) for word in x])
    # Extract features from the preprocessed text input
    tfidf_vectorizer = TfidfVectorizer()
    X_train_tfidf = tfidf_vectorizer.fit_transform(train_df['status_text'])
    print("Vector fitting Done!!")
    return X_train_tfidf