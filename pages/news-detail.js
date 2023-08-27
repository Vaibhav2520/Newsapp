import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../styles/news-detail.css";
const Newsdetail = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("title");
  const [news, setNews] = useState([]);
  useEffect(() => {
    if (search) {
      fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=3ecb01af5aed435287c272f5844de507`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setNews(data.articles);
          console.log(search);
        });
    }
  }, [search]);
  return news.length > 0 ? (
    <div className="detailed-news">
      <h1>{news[0].title}</h1>
      <p className="published-date">{news[0].publishedAt}</p>
      <img src={news[0].urlToImage} />
      <p className="description">{news[0].description}</p>
      <p className="content">{news[0].content}</p>
      <p className="source">Source: {news[0].source.name}</p>
    </div>
  ) : (
    <></>
  );
};

export default Newsdetail;
