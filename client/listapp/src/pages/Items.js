import { useState, useEffect } from "react";
import Item from "../components/items/item";
import Friend from "../components/items/Friend";
import checkImage from "../../src/assets/check1.png";

export default function Items() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");

  const apiUrl = "http://localhost:5050";

  async function getAllLists() {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      setList([]);
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setList([]);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setList([]);
      }

      if (response.status === 200) {
        const list = await response.json();

        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setList(list);
        setMessage("");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
      setList([]);
    }
  }

  useEffect(() => {
    getAllLists();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: listName,
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
        setMessage("List created!");
        alert("List created!");
        setListName("");
        getAllLists(); // Refresh the list of list
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        setMessage("List deleted!");
        alert("List deleted!");
        getAllLists(); // Refresh the list of list
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <>
      <div className="header">
        <img className="App-logo" src={checkImage} alt="checkbox"></img>
        <h1>CheckMate </h1>
      </div>
      <h1>Create a new list</h1>
      <form onSubmit={handleSubmit}>
        <div className="addList">
          <label htmlFor="listName"></label>
          <input
            type="text"
            value={listName}
            onChange={(event) => setListName(event.target.value)}
            placeholder="List name"
          ></input>
          <button className="addListBtn" type="submit">
            Create list
          </button>
        </div>
      </form>
      <div>
        <h1>Your lists</h1>
        {message ? <p>{message}</p> : null}
        <ul className="listWrapper">
          {list.map((listItem) => (
            <div key={listItem.id} className="listCard">
              <div className="titleAndButton">
                <h2>{listItem.name}</h2>
                <button onClick={() => handleDelete(listItem.id)}>
                  Delete list
                </button>
              </div>

              <Item listId={listItem.id} />
            </div>
          ))}
        </ul>
      </div>
      <Friend />
    </>
  );
}
