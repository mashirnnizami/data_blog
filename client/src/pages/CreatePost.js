import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "../App.css";

function CreatePost() {
  const [listofPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="main">
      <div className="App">
        <div className="posts-container">
          {listofPosts.map((value, key) => {
            return (
              <Card
                key={key}
                sx={{ maxWidth: 345, margin: "auto", marginBottom: "20px" }}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={value.title}
                  subheader={value.username}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={value.image}
                  alt="Post Image"
                />
                <CardContent>
                  <Typography variant="body2" color="text">
                    {value.postText}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
