import { useState, useEffect } from "react";
import UserImg from "../../assets/user.png";

export default function Friend() {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const apiUrl = "http://localhost:5050";

  // Get all friends from the database and set them to the state variable friends
  async function getAllFriends() {
    let response = null;

    try {
      // Make a fetch to the backend to get all friends from the database and set the response to the variable response
      response = await fetch(`${apiUrl}/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      setFriends([]);
      return;
    }

    try {
      if (response.status === 400) {
        // If the response status is 400, set the error message to the state variable message and set the state variable friends to an empty array and return
        const error = await response.text();
        setMessage(error);
        setFriends([]);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setFriends([]);
      }

      if (response.status === 200) {
        const friends = await response.json();

        // Sort the list by the created_at timestamp in descending order
        friends.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setFriends(friends);
        setMessage("");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
      setFriends([]);
    }
  }

  // useEffect is a hook that runs a function when the component is mounted and when the state variables in the array changes (in this case, the state variable friends) and the function is run when the component is mounted because the array is empty ([])
  useEffect(() => {
    // Run the function getAllFriends when the component is mounted and when the state variable friends changes (in this case, when a friend is added or deleted)
    getAllFriends();

    // Run the function getAllUsers when the component is mounted and when the state variable friends changes (in this case, when a friend is added or deleted)
    getAllUsers();
    getFriendList();
  }, []);

  // Add a friend to the database and set the response to the state variable message. It is async because it uses await to wait for the response from the backend  before continuing to the next line of code (the try/catch block).
  async function addFriend() {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/friends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ friendUsername: friend }),
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
      }

      if (response.status === 200) {
        const message = await response.text();
        setMessage(message);
        setFriend("");
        getAllFriends();
        alert("Friends added");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
    }
  }

  //
  async function getAllUsers() {
    let response = null;
    try {
      response = await fetch(`${apiUrl}/friends/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      setUsers([]);
      return;
    }
    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setUsers([]);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setUsers([]);
      }
      if (response.status === 200) {
        const users = await response.json();
        users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUsers(users);
        setMessage("");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
      setUsers([]);
    }
  }

  async function getFriendList() {
    let response = null;

    try {
      response = await fetch(`${apiUrl}/friends/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      setMessage("Could not make a fetch");
      setFriendList([]);
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setFriendList([]);
        return;
      }

      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setFriendList([]);
        return;
      }

      if (response.status === 200) {
        const friendList = await response.json();

        setFriendList(friendList);
        setMessage("");
      }
    } catch (error) {
      setMessage("Something went wrong!");
      setFriendList([]);
    }
  }

  return (
    <div>
      <h1>Your friends lists</h1>
      <form className="addFriend" onSubmit={addFriend}>
        <input
          type="text"
          placeholder="Friend username"
          value={friend}
          onChange={(event) => setFriend(event.target.value)}
        />
        <button type="submit">Add friend</button>
      </form>
      {friends.map((friend) => (
        <div key={friend.id}>
          <div className="friendListCard">
            <div className="">
              <h2>{friend.username}</h2>
              <ul>
                <p>LISTS:</p>
                {friendList.map((list) => {
                  if (list.user_id === friend.id) {
                    return (
                      <li className="friendListItem" key={list.id}>
                        {list.name}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <h3>Recently logged in users:</h3>
      <ul className="recentUsers">
        {users.map((user) => (
          <div key={user.id} className="recentlyLoggedInUsers">
            <img src={UserImg} alt="user" />
            <li>{user.username}</li>
          </div>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
}
