import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for form validation

import videoBg from "../src/assests/videoBg.mp4";
import "./App.css";

function App() {
  const [listofPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("IT WORKED");
    });
  };

  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className="App">
        <Router>
          <div>
            {/* Use Link to navigate to CreatePost component */}
            <Link to="/createpost" className="black-link">
              Home Page
            </Link>
            <br />
            <Link to="/" className="black-link">
              Create A Post
            </Link>
          </div>
          <Routes>
            {/* Define route for CreatePost component */}
            <Route path="/createpost" exact element={<CreatePost />} />
          </Routes>
        </Router>
      </div>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />
            <label>Image: </label>
            <ErrorMessage name="image" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="image"
              placeholder="image url"
            />
            <button type="submit"> Create Post</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default App;
