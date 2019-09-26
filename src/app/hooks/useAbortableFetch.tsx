import * as React from 'react';

export function useAbortableFetch(input: RequestInfo, init?: RequestInit) {
  const [response, setResponse] = React.useState<Response | null>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState(false);
  const shouldReload = React.useRef(false);

  const refetch = () => {
    shouldReload.current = true;
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const doFetch = async () => {
      shouldReload.current = false;
      setLoading(true);
      setResponse(null);
      try {
        const response = await fetch(input, { ...init || {}, signal });
        if (!response.ok) {
          setResponse(response);
          throw new Error()
        }
        setResponse(response);
      }
      catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        }
        else {
          setError(true);
        }
      }
      finally {
        setLoading(false);
      }
    };
    doFetch();
    return () => {
      controller.abort();
    };
  }, [input, init, shouldReload, setResponse, setError, setLoading]);
  return { response, loading, error, refetch };
}
