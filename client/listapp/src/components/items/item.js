import { useState, useEffect } from "react";

export default function Items({ listId }) {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  const apiUrl = "http://localhost:5050";

  async function getAllItems() {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists/${listId}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      setMessage("Could not make a fetch");
      setItems([]);
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setItems([]);
        return;
      }

      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setItems([]);
        return;
      }

      if (response.status === 200) {
        const items = await response.json();

        items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setItems(items);
        setMessage("");
      }
    } catch (error) {
      setMessage("Something went wrong!");
      setItems([]);
    }
  }

  useEffect(() => {
    getAllItems(listId);
  }, [listId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists/${listId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: description,
          completed: false,
          list_id: listId,
        }),
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      return;
    }

    try {
      if (description === "") {
        setMessage("Please enter a description");
        return;
      }

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
        setDescription("");

        setMessage("item created!");

        alert("Item created!");

        getAllItems(); // Refresh the list of list

        setEditing(false);
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  };

  async function handleDelete(id) {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists/${listId}/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
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
        // toast.success("Item deleted from toast!");
        setMessage("item deleted!");
        alert("Item deleted!");
        getAllItems(); // Refresh the list of list
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  }

  const handleEditClick = (id) => {
    setEditing(id);
    setEditText(items.find((item) => item.id === id).description);
  };

  async function handleEditSubmit(id) {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/lists/${listId}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          description: editText,
        }),
      });
    } catch (error) {
      setMessage("Could not make a fetch");
      console.log("error", error);
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
        setMessage("item edited!");
        setEditText("");
        getAllItems(listId); // Refresh the list of list
        setEditing(false);
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  }

  async function handleCheckboxClick(id, completed) {
    let response = null;

    try {
      response = await fetch(
        `${apiUrl}/lists/${listId}/items/${id}/completed`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );
    } catch (error) {
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
        setMessage("item updated!");
        getAllItems(listId);
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
  }

  return (
    <>
      <h3>Create a new to do:</h3>
      <form className="itemForm" onSubmit={handleSubmit}>
        <label htmlFor="description"></label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <button type="submit">Create</button>
      </form>

      <div className="todoWrapper">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editing === item.id ? (
                <div>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(item.id)}>
                    Submit
                  </button>
                </div>
              ) : (
                <div className="todoItem">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() =>
                      handleCheckboxClick(item.id, item.completed)
                    }
                  />
                  <div className="itemDesc">
                    {item.completed ? (
                      <strike>{item.description}</strike>
                    ) : (
                      item.description
                    )}
                  </div>

                  <div className="itemButtons">
                    <button
                      onClick={() => handleEditClick(item.id, item.description)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
