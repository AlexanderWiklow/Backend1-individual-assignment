import { Link } from "react-router-dom";
import checkImage from "../../../src/assets/check2.png";

export default function Navbar() {
  return (
    <div>
      <div className="header">
        <img className="App-logo" src={checkImage} alt="checkbox"></img>
        <h1>CheckMate </h1>
      </div>

      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}
