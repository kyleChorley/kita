import React, { useState } from "react";
import "./App.css";
import useKitaSearch from "../src/useKitaSearch";
import { Switch, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";

function App(props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const { kitas, hasMore, loading, error } = useKitaSearch(query, page, limit);

  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="main-app">
      <Navbar />
      <Switch>
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
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
