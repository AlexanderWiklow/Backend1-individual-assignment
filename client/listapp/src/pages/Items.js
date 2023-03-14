import { useState, useEffect } from "react";
import Item from "../components/items/item";
import checkImage from "../../src/assets/check2.png";

export default function Items() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  async function getAllLists() {
    let response = null;

    try {
      response = await fetch("http://localhost:5050/lists", {
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
        // if (list.length > 1) {
        //   setList(list);
        // } else {
        //   setList([list]);
        // }
        // setMessage("");

        // Sort the list by the created_at timestamp in descending order
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
    // getAllItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = null;

    try {
      response = await fetch("http://localhost:5050/lists", {
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
        getAllLists(); // Refresh the list of list
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  };

  // async function getAllItems(id, user_id, list_Id) {
  //   let response = null;

  //   try {
  //     response = await fetch(`http://localhost:5050/lists/${list_Id}/list`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //   } catch (FetchError) {
  //     setMessage("Could not make a fetch");
  //     setItem([]);
  //     return;
  //   }

  //   try {
  //     if (response.status === 400) {
  //       const error = await response.text();
  //       setMessage(error);
  //       setItem([]);
  //       return;
  //     }

  //     if (response.status === 404) {
  //       const error = await response.text();
  //       setMessage(error);
  //       setItem([]);
  //       return;
  //     }

  //     if (response.status === 200) {
  //       const item = await response.json();
  //       // if (list.length > 1) {
  //       //   setList(list);
  //       // } else {
  //       //   setList([list]);
  //       // }
  //       // setMessage("");

  //       // Sort the list by the created_at timestamp in descending order
  //       item.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  //       setItem(item);
  //       setMessage("");
  //     }
  //   } catch (Error) {
  //     setMessage("Something went wrong!");
  //   }
  // }

  return (
    <>
      <div className="header">
        <img className="App-logo" src={checkImage} alt="checkbox"></img>
        <h1>CheckMate </h1>
      </div>
      <h1>Create a new list</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="listName">List name:</label>
        <input
          type="text"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        ></input>
        <button type="submit">Create list</button>
      </form>
      <div>
        <h1>Items</h1>
        {message ? <p>{message}</p> : null}
        <ul className="listWrapper">
          {list.map((listItem) => (
            <div className="listCard">
              <h2 key={listItem.id}>{listItem.name}</h2>
              <Item listId={listItem.id} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
