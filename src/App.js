import './App.css';
import { useEffect, useState } from 'react';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);

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
          .slice(0, 12)
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              response => response.json()
            )
          );
        const result = await Promise.all(promises);
        setPosts(result);
      } catch (err) {
        console.error(err);
      }
    }
    getLatestStories();
  }, []);
  
  return (
    <div className="App">
      <div className='header'>
        <h2 className='orangeText'>Y</h2>
        <h2 className='title'>Hacker News</h2>
        <button className='button'>latest</button>
        <button className='button'>starred</button>
      </div>

      <ol className='posts'>
        {posts.map(post => <Post posts={post} />)}
      </ol>

      <button className='showMore'>show more</button>
 
      <div className='footer'>
        <hr color='#FE7139'></hr>
        <h4>Hacker News</h4>
        <button className='button'>latest</button>
        <button className='button'>starred</button>
      </div>
    </div>
  );
}

export default App;
