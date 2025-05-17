import React, { useState, useEffect } from 'react';
import PieChart from './components/pie_chart';
import './style.css';

function App() {
  const [levels, setLevels] = useState({ good: 0, neutral: 0, bad: 0 });
  const [currentNews, setCurrentNews] = useState({ text: '', sentiment: '' });
  const [count, setCount] = useState(0);
  const [overallSentiment, setOverallSentiment] = useState('');
  const [finalColor, setFinalColor] = useState(null);
  const [stopFetching, setStopFetching] = useState(false); // ⭐️ control flag

  useEffect(() => {
    if (stopFetching) return; // agar stop ho gaya, kuch mat karo

    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/news');
        const data = await response.json();
        const sentiment = data.sentiment;
        const news = data.news;

        setLevels(prev => {
          const updated = { ...prev, [sentiment]: prev[sentiment] + 1 };
          return updated;
        });

        setCurrentNews({ text: news, sentiment: sentiment });
        setCount(prev => prev + 1);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const interval = setInterval(() => {
      fetchNews();
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, [stopFetching]); // ⭐️ sirf stopFetching pe depend karna hai

  useEffect(() => {
    if (count === 5) {
      setStopFetching(true);
  
      // calculate overall sentiment
      const sentimentCounts = Object.entries(levels);
      const maxCount = Math.max(...sentimentCounts.map(([_, val]) => val));
  
      // find all sentiments with maxCount
      const topSentiments = sentimentCounts
        .filter(([_, val]) => val === maxCount)
        .map(([key]) => key);
  
      if (topSentiments.length === 1) {
        setOverallSentiment(topSentiments[0].toUpperCase());
      } else {
        setOverallSentiment("Unpredictable");
      }
    }
  }, [count, levels]);

  return (
    <div className="app">
      <h1>Live News Sentiment Dashboard</h1>
      <PieChart data={levels} />

      <div className="current-news">
        <h2>Current News</h2>
        {currentNews.text ? (
          <div className={`news-item ${currentNews.sentiment}`}>
            <span>{currentNews.text}</span>
            <span className="sentiment">{currentNews.sentiment.toUpperCase()}</span>
          </div>
        ) : (
          <p>Waiting for news...</p>
        )}
      </div>

      {count >= 5 && (
        <div className={`overall-sentiment ${overallSentiment.toLowerCase()}`}>
          <h2>Overall Sentiment: {overallSentiment}</h2>
        </div>
      )}
    </div>
  );
}

export default App;