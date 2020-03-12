import React, { useState } from "react";
import "./App.css";
import useKitaSearch from "../src/useKitaSearch";
import { Switch, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Favorites from "./components/Favorites";

const App = props => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [user, setUser] = useState(props.loggedInUser);
  // const [loggedinUser, setLoggedinUser] = useState(null);

  // console.log(props);

  const { kitas, hasMore, loading, error } = useKitaSearch(query, page, limit);

  console.log(kitas);

  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="main-app">
      <Navbar {...props} updateUser={setUser} user={user} />
      <Switch>
        <Route
          path="/auth"
          render={props => <SignUp {...props} setUser={setUser} user={user} />}
        />
        <Route
          path="/login"
          render={props => <Login {...props} user={user} setUser={setUser} />}
        />
        <Route
          path="/favorite"
          render={props => (
            <Favorites {...props} user={user} setUser={setUser} />
          )}
        />
        <Route
          path="/"
          render={props => (
            <Home
              {...props}
              query={query}
              kitas={kitas}
              hasMore={hasMore}
              loading={loading}
              error={error}
              setPage={setPage}
              setQuery={setQuery}
              setLimit={setLimit}
              handleSearch={handleSearch}
              user={user}
              exact
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
