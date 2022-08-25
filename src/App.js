import "./App.css";
import { useEffect, useState } from "react";
import Post from "./components/Post";
import cn from "classnames";

function App() {
  const DEFAULT_POST_NUMBER = 12;
  const SHOW_MORE_NUMBER = 10;

  const [posts, setPosts] = useState([]);
  const [isStarred, setIsStarred] = useState(false);
  const [postNum, setPostNum] = useState(DEFAULT_POST_NUMBER);

  const handleLatest = () => {
    setIsStarred(false);
  };

  const handleStar = () => {
    setIsStarred(true);
  };

  const handleShowMore = () => {
    setPostNum(postNum + SHOW_MORE_NUMBER)
  }

  useEffect(() => {
    async function getLatestStories() {
      const url = "https://hacker-news.firebaseio.com/v0/askstories.json";
      try {
        const response = await fetch(url);
        if (response.ok === false) {
          throw new Error("Response Error:" + response.text);
        }
        const json = await response.json();
        const promises = json
          .slice(0, postNum)
          .map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (response) => response.json()
            )
          );
        const result = await Promise.all(promises);
        setPosts(result);
      } catch (err) {
        console.error(err);
      }
    }
    getLatestStories();
  }, [isStarred, postNum]);

  return (
    <div className="App">
      <div className="main">
        <div className="header">
          <h2 className="orangeText">Y</h2>
          <h2 className="title">Hacker News</h2>
          <span className="buttonContainer">
            <button
              className={cn("button", { "button-starred": !isStarred })}
              onClick={handleLatest}
            >
              latest
            </button>
            |
            <button
              className={cn("button", { "button-starred": isStarred })}
              onClick={handleStar}
            >
              starred
            </button>
          </span>
        </div>

        <ol className="posts">
          {posts.map((post) => (
            <Post posts={post} isStarred={isStarred} />
          ))}
        </ol>

        <button className="showMore" onClick={handleShowMore}>show more</button>
      </div>

      <div className="footer">
        <hr color="#FE7139"></hr>
        <h4>Hacker News</h4>
        <span className="buttonContainer">
          <button
            className={cn("button", { "button-starred": !isStarred })}
            onClick={handleLatest}
          >
            latest
          </button>
          |
          <button
            className={cn("button", { "button-starred": isStarred })}
            onClick={handleStar}
          >
            starred
          </button>
        </span>
      </div>
    </div>
  );
}

export default App;
