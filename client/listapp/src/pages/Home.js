import { useState } from "react";
import check from "../../src/assets/check1.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const apiUrl = "http://localhost:5050";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      // Handle login submit

      let response = null;

      try {
        response = await fetch(`${apiUrl}/authentication/login`, {
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

      try {
        if (response.status === 400) {
          const error = await response.text();
          setMessage(error);
          return;
        }
        if (response.status === 401) {
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
          setMessage("Successful login!");
          // Assuming the login is successful, redirect to the items page
          navigate("/items");
        }
      } catch (Error) {
        setMessage("Something went wrong!");
      }
    } else {
      // Handle register submit

      let response = null;

      try {
        response = await fetch(`${apiUrl}/authentication/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
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
        if (response.status === 409) {
          setMessage("User already exists!");
        }
        if (response.status === 201) {
          setMessage("Successful register!");
          alert("Successful register!");
        }
      } catch (Error) {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="Home">
      <img className="App-logo" src={check} alt="checkbox" />
      <h1>Welcome to CheckMate!</h1>

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
