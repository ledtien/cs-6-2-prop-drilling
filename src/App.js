import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  Form,
  Card,
  Button,
  Navbar,
  Container,
  ListGroup,
  FormControl,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";

import "./App.css";

import { COMMENTS } from "./utils";

const Avatar = (props) => {
  return (
    <img
      alt="profile"
      className="rounded-circle"
      style={{ height: 50, width: 50 }}
      src={
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      }
    />
  );
};

const PostForm = (props) => {
  const email = useSelector((state) => state.currentUser.email);
  return (
    <Form inline className="d-flex align-items-center">
      <Form.Control
        type="text"
        className="mr-3"
        style={{ width: "90%" }}
        placeholder={"What's on your mind? " + email}
      />
      <Button variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
};

const CommentForm = (props) => {
  const email = useSelector((state) => state.currentUser.email);
  return (
    <Form inline>
      <Form.Control
        type="text"
        placeholder={"What's on your mind? " + email}
        className="w-75 mr-3"
      />
      <Button variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
};

const Comment = ({ body, user }) => {
  return (
    <ListGroupItem className="d-flex flex-row align-items-center border-bottom-0 pr-0 py-0">
      <Avatar url={user.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{user.name}</div>
          <p>{body}</p>
        </div>
      </div>
      <hr />
    </ListGroupItem>
  );
};

const Comments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush py-3">
        {props.comments.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

const Post = (props) => {
  const email = useSelector((state) => state.currentUser.email);
  return (
    <Card style={{ width: "100%", padding: "1%" }}>
      <Card.Title>PrimeTimeTran</Card.Title>
      <p>
        1. Make it so when we sign in the text inside the form says 'Whats on
        your mind email'
      </p>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
      />
      <Card.Body>
        <Comments comments={COMMENTS} />
        <CommentForm currentUser={email} />
      </Card.Body>
    </Card>
  );
};

const Navbarr = (props) => {
  const [email, setEmail] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch({ type: "SIGN_IN", payload: email });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Prop Drilling</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        {currentUser.email ? (
          <Button
            type="submit"
            variant="outline-danger"
            onClick={() => dispatch({ type: "SIGN_OUT" })}
          >
            Sign-out {currentUser.email}?
          </Button>
        ) : (
          <Form inline onSubmit={onSignIn}>
            <FormControl
              type="text"
              placeholder="Email"
              className="mr-sm-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button type="submit" variant="outline-success" onClick={onSignIn}>
              Sign In
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const Friends = () => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Friends
    </div>
  );
};
const Photos = () => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Photos
    </div>
  );
};

const Hobbies = () => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Hobbies
    </div>
  );
};
const Intro = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Introduction
      <button className="w-25" onClick={props.openModal}>
        Edit Details
      </button>
    </div>
  );
};

const Left = (props) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch({ type: "SIGN_IN", payload: email });
  };
  const [open, setOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <Intro openModal={openModal} />
      <Hobbies />
      <Photos />
      <Friends />
      <Modal
        isOpen={open}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>Change my email!</div>
        <form onSubmit={onSignIn}>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
        </form>
      </Modal>
    </Col>
  );
};

const Right = (props) => {
  return (
    <Col className="d-flex align-items-center justify-content-center">
      <Post currentUser={props.currentUser} />
    </Col>
  );
};

const Main = (props) => {
  return (
    <Container className="border pt-5 mt-5">
      <Row className="mb-5">
        <Col>
          <PostForm currentUser={props.currentUser} />
        </Col>
      </Row>
      <Row>
        <Left editEmail={props.editEmail} />
        <Right currentUser={props.currentUser} />
      </Row>
    </Container>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === "light") {
      setTheme("dark");
      // otherwise, it should be light
    } else {
      setTheme("light");
    }
  };

  const [currentUser, setCurrentUser] = useState({ email: "" });
  const editEmail = (e) => {
    e.preventDefault();
    setCurrentUser({ email: e.target.value });
  };

  const onSignIn = (e, email) => {
    e.preventDefault();
    setCurrentUser({ email: email });
  };

  const onSignOut = () => {
    setCurrentUser("");
  };
  console.log({ currentUser });
  return (
    <div className="main">
      <Navbarr
        onSignIn={onSignIn}
        currentUser={currentUser}
        onSignOut={onSignOut}
      />
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <button onClick={toggleTheme}>Toggle theme</button>

          <footer></footer>
        </>
      </ThemeProvider>
      <Main currentUser={currentUser} editEmail={editEmail} />
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(1);
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   const [incrementAmount, setIncrementAmount] = useState(1);
//   console.log(incrementAmount);
//   return (
//     <div>
//       <h1>New App components</h1>
//       <h3>Count: {state.count}</h3>
//       <button onClick={() => dispatch({ type: "INCREMENT" })}>
//         Increment by 1
//       </button>
//       <button onClick={() => dispatch({ type: "DECREMENT" })}>
//         Decrement by 1
//       </button>
//       <input
//         value={incrementAmount}
//         onChange={(e) => setIncrementAmount(parseInt(e.target.value))}
//       ></input>
//       <button
//         onClick={() =>
//           dispatch({ type: "INCREMENT_BY", payload: incrementAmount })
//         }
//       >
//         Increment by {incrementAmount}
//       </button>
//       {/* <button onClick={() => setCount(count + 1)}>Increment by 1</button>
//       <button onClick={() => setCount(count - 1)}>Decrement by 1</button> */}
//     </div>
//   );
// }
export default App;
