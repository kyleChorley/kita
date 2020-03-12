import React from "react";
import CardList from "./CardList";
import HooksMap from "./HooksMap";

export default function Home(props) {
  // console.log(props);

  const {
    query,
    kitas,
    hasMore,
    loading,
    error,
    setPage,
    setQuery,
    setLimit,
    handleSearch,
    page,
    user
  } = props;

  return (
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
        user={user}
      />
      <HooksMap query={query} page={page} />
    </div>
  );
}
