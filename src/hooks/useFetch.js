import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController(); // abort controller for the cleanup function
    setTimeout(() => {
      fetch(url, { signal: abortController.signal }) //connect the controller to the fetch signal
        .then((res) => {
          if (!res.ok) {
            throw Error("Couldn't Fetch Any data");
          }
          res.json().then((data) => {
            setLoading(false);
            setData(data);
            setError(null);
          });
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch interupted');
          } else {
            setError(err.message);
            setData(null);
            setLoading(false);
          }
        });
    }, 1000);
    return () => abortController.abort(); // upon un-mounting the component before the fetch, abort it and return the cleanup function
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
