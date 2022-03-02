import React, { useState, useEffect } from 'react';

function useAPIRequest(query) {
  const [ responseOBJ, setResponseOBJ ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      setLoading(true);
      try {
        const response = await fetch(
          `${query}`,
          { signal: controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled")
        } else {
          setError(true);
          throw e;
        }
      }
      if (!ignore) {
        setLoading(false);
        setError(false);
        setResponseOBJ(responseBody || {});
      }
    }
    if (query) {
      fetchSearchResults()
    }
    return () => {
      controller.abort();
      ignore = true;
    }
  }, [ query ]);

  return [ responseOBJ, loading, error ];
}

export default useAPIRequest;