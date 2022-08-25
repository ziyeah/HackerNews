import "./Post.css";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const Post = ({ posts, isStarred }) => {
  const commentNum = posts.kids ? posts.kids.length : 0;
  const [isSave, setIsSave] = useState(false);
  var diff = Number(Date.now().toString().slice(0, 10)) - posts.time;
  var d = Math.floor(diff / (3600 * 24));
  var h = Math.floor((diff % (3600 * 24)) / 3600);
  var m = Math.floor((diff % 3600) / 60);
  var s = Math.floor(diff % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

  if (dDisplay) diff = dDisplay;
  else if (hDisplay) diff = hDisplay;
  else if (mDisplay) diff = mDisplay;
  else if (sDisplay) diff = sDisplay;

  const handleSave = () => {
    setIsSave(!isSave);
  };

  var isRender =
    (isStarred && isSave) || (!isStarred && isSave) || (!isStarred && !isSave);

  return (
    <>
      {isRender && (
        <div className="postContainer">
          <li className="postTitle">
            <a href={posts.url}>{posts.title}</a>
          </li>
          <div className="postInfo">
            {posts.score} points by {posts.by} {diff} ago | {commentNum}{" "}
            {commentNum <= 1 ? "comment " : "comments "}|
            <Checkbox
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
              onClick={handleSave}
              sx={{
                color: "#8e8f92",
                "& .MuiSvgIcon-root": { fontSize: 12 },
                "&.Mui-checked": {
                  color: "#FE7139",
                },
              }}
            />
            {isSave ? "saved" : "save"}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
