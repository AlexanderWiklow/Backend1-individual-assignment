// import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/shared/navbar";
import check from "../../src/assets/check2.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      // Handle login submit

      let response = null;

      try {
        response = await fetch("http://localhost:5050/authentication/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
      } catch (FetchError) {
        setMessage("Could not make a fetch");
        return;
      }

      console.log(
        "Logging in with username:",
        username,
        "and password:",
        password
      );

      try {
        if (response.status === 400) {
          const error = await response.text();
          setMessage(error);
          return;
        }
        if (response.status === 404) {
          const error = await response.text();
          setMessage(error);
          return;
        }
        if (response.status === 200) {
          setMessage("Successful register!");
        }
      } catch (Error) {
        setMessage("Something went wrong!");
      }

      // Assuming the login is successful, redirect to the items page
      navigate("/items");
    } else {
      // Handle register submit

      let response = null;

      try {
        response = await fetch(
          "http://localhost:5050/authentication/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }
        );
      } catch (FetchError) {
        console.log("Could not make a fetch");
        return;
      }

      try {
        if (response.status === 400) {
          const error = await response.text();
          setMessage(error);
          return;
        }
        if (response.status === 404) {
          const error = await response.text();
          setMessage(error);
          return;
        }
        if (response.status === 200) {
          setMessage("Successful register!");
        }
      } catch (Error) {
        setMessage("Something went wrong!");
      }

      console.log(
        "Registering with username:",
        username,
        "and password:",
        password
      );
    }
  };

  return (
    <div className="Home">
      <img className="App-logo" src={check} alt="checkbox" />
      <h1>Welcome to CheckMate</h1>

      {isLogin ? <h2>Login</h2> : <h2>Register</h2>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p>{message}</p>
      {isLogin ? (
        <p>
          Don't have an account?{" "}
          <button onClick={() => setIsLogin(false)}>Register here</button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button onClick={() => setIsLogin(true)}>Login here</button>
        </p>
      )}
    </div>
  );
}

export default Home;
