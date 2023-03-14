import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Items from "./pages/Items";
import Register from "./pages/Register";
import Items from "./pages/Items";
// import Login from "./pages/Login";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Items />} /> */}
          <Route path="/Items" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
