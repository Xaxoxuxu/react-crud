"use strict";
import './App.css';
import UserTable from './tables/UserTable';
import React, { useState } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const usersData = [
  { id: 1, name: 'Tania', username: 'floppydiskette' },
  { id: 2, name: 'Craig', username: 'siliconeidolon' },
  { id: 3, name: 'Ben', username: 'benisphere' },
]

function App() {
  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  function updateUser(user, updatedUser) {
    setEditing(false)
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)))
  }

  function editRow(user) {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  function addUser(user) {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }

  function deleteUser(user) {
    setEditing(false);
    setUsers(users.filter((u) => u.id !== user.id));
  }

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div className="flex-large">
            {editing ? (
              <div>
                <h2>Edit user</h2>
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
