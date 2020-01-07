import { useState, useEffect } from "react";
import axios from "axios";

export default function useKitaSearch(query, page) {
  const [kitas, setKitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "/api/kita",
      params: { q: query, page: page },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        setKitas(prevKitas => {
          return [
            ...prevKitas,
            ...res.data.results.map(kita => {
              // console.log(kita);
              return kita;
            })
          ];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, page]);

  return { loading, error, kitas, hasMore };
}
