import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

// movies
import AllMovies from "./pages/AllMovies/AllMovies";
import CreateMovie from "./pages/CreateMovie/CreateMovie";
import UpdateMovie from "./pages/UpdateMovie/UpdateMovie";

// lists
import AllLists from "./pages/AllLists/AllLists";
import CreateList from "./pages/CreateList/CreateList";
import UpdateList from "./pages/UpdateList/UpdateList";

// genres

// users
import React from "react";
import AllGenres from "./pages/AllGenres/AllGenres";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import { UserType } from "./types/user";

function App() {
  const localUser = localStorage.getItem("user");
  const user: UserType = localUser ? JSON.parse(localUser) : null;

  return (
    <BrowserRouter>
      {user ? (
        <React.Fragment>
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Sidebar />
            <div style={{ flex: 10, overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/movies" element={<AllMovies />} />
                <Route path="/movie/:id" element={<UpdateMovie />} />
                <Route path="/createmovie" element={<CreateMovie />} />
                <Route path="/lists" element={<AllLists />} />
                <Route path="/updateList/:id" element={<UpdateList />} />
                <Route path="/createList" element={<CreateList />} />
                <Route path="/genres" element={<AllGenres />} />
                <Route path="/login" element={<Navigate to={"/"} />} />
              </Routes>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;