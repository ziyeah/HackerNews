import "./Post.css";

const Post = ({ posts }) => {
  const commentNum = posts.kids ? posts.kids.length : 0;

  return (
    <div className="postContainer">
      <li className="postTitle">
        <a href={posts.url}>{posts.title}</a>
      </li>
      <div className="postInfo">
        {posts.score} points by {posts.by} ? hours ago | {commentNum}{" "}
        {commentNum === 0 ? "comment " : "comments "}
        |
        <button className="save">save</button>
      </div>
    </div>
  );
};

export default Post;
