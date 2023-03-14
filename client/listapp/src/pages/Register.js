import { useState } from "react";
import Navbar from "../components/shared/navbar";

export default function Register() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    let response = null;

    try {
      response = await fetch("http://localhost:5050/authentication/register", {
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
      setMessage("Could not make a fetch");
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
  }

  return (
    <div>
      <Navbar />
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={registerUser}>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
