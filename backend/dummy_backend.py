# dummy_backend.py

from flask import Flask, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)  # Allow all origins for testing

# Some dummy news and sentiments
news_data = [
    ("Bitcoin hits new all-time high", "good"),
    ("Ethereum faces regulatory challenges", "bad"),
    ("Market remains stable amidst news", "neutral"),
    ("Dogecoin spikes after celebrity tweet", "good"),
    ("Major exchange faces hacking attempt", "bad"),
    ("Investors await SEC decision", "neutral")
]

@app.route('/news', methods=['GET'])
def get_news():
    time.sleep(1)  # Simulate 5 seconds delay
    news, sentiment = random.choice(news_data)
    return jsonify({"news": news, "sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True, port=5000)