// first file

import { useState, useEffect } from "react";

export default function Items({ listId }) {
  const [item, setItem] = useState([]);
  //   const [itemTitle, setItemTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [todo, setTodo] = useState([]);
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  console.log("listId", listId);

  async function getAllItems() {
    let response = null;

    try {
      response = await fetch(`http://localhost:5050/lists/${listId}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      setMessage("Could not make a fetch");
      setItem([]);
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setItem([]);
        return;
      }

      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setItem([]);
        return;
      }

      if (response.status === 200) {
        const item = await response.json();
        // if (list.length > 1) {
        //   setList(list);
        // } else {
        //   setList([list]);
        // }
        // setMessage("");

        // Sort the list by the created_at timestamp in descending order
        item.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setItem(item);
        setMessage("");

        // const items = await response.json();
        // if (Array.isArray(items)) {
        //   setItem(items);
        // } else {
        //   setItem([items]);
        //   console.log(items);
        // }
        // setMessage("");
      }
    } catch (error) {
      setMessage("Something went wrong!");
      setItem([]);
    }
  }

  useEffect(() => {
    getAllItems(listId);
    // handleSubmit(listId);
  }, [listId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Implement functionality to create a new item
    // 1. Create a new item object
    // 2. Send a POST request to the server
    // 3. Update the state of the items array
    // 4. Clear the input field

    let response = null;

    try {
      response = await fetch(`http://localhost:5050/lists/${listId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          //   title: itemTitle,
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
        setMessage("Item created!");
        // setItemTitle("");
        setDescription("");

        getAllItems(listId); // Refresh the list of list
        setEditing(false);
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  };

  //   const handleDelete = (id) => {
  // setItem(item.filter((item) => item.id !== id));
  // implement logic for deleting a todo item
  // 1. Send a DELETE request to the server
  // 2. Update the state of the items array
  // 3. Clear the input field

  async function handleDelete(id) {
    let response = null;

    try {
      response = await fetch(
        `http://localhost:5050/lists/${listId}/items/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
        setMessage("Item deleted!");
        getAllItems(); // Refresh the list of list
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  }

  const handleEditClick = (text) => {
    setEditing(true);
    setEditText(text);
  };

  async function handleEditSubmit(id) {
    let response = null;

    console.log("listId::::", listId);
    console.log("id:::::", id);
    console.log("editText:::::", editText);

    try {
      response = await fetch(
        `http://localhost:5050/lists/${listId}/items/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            description: editText,
          }),
        }
      );
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

      console.log("response:::::", response.status);

      if (response.status === 200) {
        setMessage("Item edited!");
        setEditText("");
        getAllItems(listId); // Refresh the list of list
        setEditing(false);
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  }

  //   async function handleEdit(id) {
  //     // implement logic for editing a todo item

  //     let response = null;

  //     try {
  //       response = await fetch(
  //         `http://localhost:5050/lists/${listId}/items/${id}`,
  //         {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //           body: JSON.stringify({
  //             id: id,
  //             completed: !completed,
  //             list_id: listId,
  //           }),
  //         }
  //       );
  //     } catch (error) {
  //       setMessage("Could not make a fetch");
  //       console.log("error", error);
  //     }

  //     try {
  //       if (response.status === 400) {
  //         const error = await response.text();
  //         setMessage(error);
  //         return;
  //       }

  //       if (response.status === 404) {
  //         const error = await response.text();

  //         setMessage(error);

  //         return;
  //       }

  //       if (response.status === 200) {
  //         setMessage("Item edited!");
  //         getAllItems(); // Refresh the list of list
  //       }
  //     } catch (Error) {
  //       setMessage("Something went wrong!");
  //     }
  //   }

  //   const handleEdit = (id) => {
  //     // implement logic for editing a todo item
  //   };

  //   const handleCheckboxChange = async (id, completed) => {
  //     let response = null;

  //     try {
  //       response = await fetch(
  //         `http://localhost:5050/lists/${listId}/items/${id}`,
  //         {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //           body: JSON.stringify({
  //             id: id,
  //             completed: !completed,
  //             list_id: listId,
  //           }),
  //         }
  //       );
  //     } catch (error) {
  //       setMessage("Could not make a fetch");
  //       console.log("error", error);
  //       return;
  //     }

  //     try {
  //       if (response.status === 400) {
  //         const error = await response.text();
  //         setMessage(error);
  //         return;
  //       }

  //       if (response.status === 404) {
  //         const error = await response.text();

  //         setMessage(error);

  //         return;
  //       }

  //       //   if (response.status === 200) {
  //       //     setMessage("Item updated!");
  //       //     getAllItems(); // Refresh the list of list
  //       //   }

  //       if (response.status === 200) {
  //         setMessage("Item updated!");

  //         // Update the completed state for the item with the given id
  //         setItem((prevItems) =>
  //           prevItems.map((item) =>
  //             item.id === id ? { ...item, completed: !item.completed } : item
  //           )
  //         );
  //       }
  //     } catch (Error) {
  //       setMessage("Something went wrong!");
  //     }
  //   };

  console.log("All items", item);

  return (
    <>
      <h3>Create a new to do:</h3>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="itemTitle">Title</label>
        <input
          type="text"
          value={itemTitle}
          onChange={(event) => setItemTitle(event.target.value)}
        /> */}
        <label htmlFor="description">Text:</label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <div className="todoWrapper">
        <p>Todos:</p>
        {message ? <p>{message}</p> : null}
        <ul>
          {item.map((oneItem) => (
            <li key={oneItem.id}>
              {/* <span>{oneItem.description}</span> */}
              {/* <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              /> */}

              {editing ? (
                <div>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(oneItem.id)}>
                    Submit
                  </button>
                </div>
              ) : (
                <div>
                  <input type="checkbox" />

                  <span>{oneItem.description}</span>
                  <button onClick={() => handleEditClick(oneItem.description)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(oneItem.id)}>
                    Delete
                  </button>
                </div>
              )}

              {/* <button onClick={() => handleEdit(oneItem.id)}>Edit</button> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
