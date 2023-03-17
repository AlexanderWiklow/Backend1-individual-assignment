import { useState, useEffect } from "react";
import fetchEndpoint from "../util/api";

export default function Friend() {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [friendList, setFriendList] = useState({});

  async function getAllFriends() {
    let response = null;

    try {
      response = await fetch("http://localhost:5050/friends", {
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

  useEffect(() => {
    getAllFriends();
    getAllUsers();
    getFriendList();
  }, []);

  async function addFriend() {
    let response = null;

    try {
      response = await fetch("http://localhost:5050/friends", {
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
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
    }
  }

  async function getAllUsers() {
    let response = null;
    try {
      response = await fetch("http://localhost:5050/friends/users", {
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
    const response = await fetchEndpoint(
      "http://localhost:5050/friends/list",
      "GET",
      {
        "Content-Type": "application/json",
      },
      "include"
    );

    if (response.error) {
      setMessage(response.error);
      setFriendList({});
      return;
    }

    const friendList = {};
    const data = response.data;
    data.forEach((list) => {
      if (!friendList[list.user_id]) {
        friendList[list.user_id] = [list];
      } else {
        friendList[list.user_id].push(list);
      }
    });
    setFriendList(friendList);
    setMessage("");
  }

  return (
    <div>
      <h1>Your friends lists</h1>
      <form onSubmit={addFriend}>
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
          <div className="listWrapper">
            <div className="friendListCard">
              <h2>{friend.username}</h2>
              <ul>
                <p>LISTS:</p>{" "}
                {users.map((user) => (
                  <li key={user.id}>
                    {friendList[user.id] && (
                      <ul>
                        {friendList[user.id].map((list) => (
                          <li key={list.id}>{list.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <p>Recently logged in users:</p>
      <ul>
        {users.map((user) => (
          <div key={user.id} className="recentlyLoggedInUsers">
            <li>{user.username}</li>
          </div>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
}
