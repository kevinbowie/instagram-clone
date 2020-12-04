import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";

import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Reels from "./Reels";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpen(false);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setOpenSignIn(false);
        return authUser;
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Router>
      <Switch>
        <Route path="/reels">
          <Reels />
        </Route>
        <Route path="/">
          <div className="app">
            <Modal open={open} onClose={() => setOpen(false)}>
              <div style={modalStyle} className={classes.paper}>
                <form action="" className="app_sign-up">
                  <center>
                    <img
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                      alt=""
                      className="app_header_image"
                    />
                  </center>
                  <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signUp}>
                    Sign Up
                  </Button>
                </form>
              </div>
            </Modal>

            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
              <div style={modalStyle} className={classes.paper}>
                <form action="" className="app_sign-up">
                  <center>
                    <img
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                      alt=""
                      className="app_header_image"
                    />
                  </center>
                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signIn}>
                    Sign In
                  </Button>
                </form>
              </div>
            </Modal>

            <div className="app_header">
              <div className="app_header_left">
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                  className="app_header_image"
                />

                <Link to="/reels">
                  <MovieIcon />
                </Link>
              </div>

              {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button>
              ) : (
                <div className="app_login-container">
                  <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                  <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
              )}
            </div>

            <div className="app_posts">
              <div className="app_posts_left">
                {posts.map(({ id, post }) => (
                  <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                  />
                ))}
              </div>
              <div className="app_posts_right">
                <InstagramEmbed
                  url="https://instagram.com/p/B_uf9dmAGPw/"
                  clientAccessToken="539220176889232|bOW5B3AgrtJGCc8KtDbJkDotwy8"
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
            </div>

            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3>Sorry you need to login to upload</h3>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
