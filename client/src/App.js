import React, { useState } from "react";
import "./App.css";
import useKitaSearch from "../src/useKitaSearch";

// components
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import HooksMap from "./components/HooksMap";

function App() {
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
      <div className="cardMap-container">
        <CardList
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

        <HooksMap query={query} page={page} />
      </div>
    </div>
  );
}

export default App;
