import * as React from 'react';

async function tryJson(response: Response) {
  try {
    return await response.json();
  } catch(e) {
    // can't recover
  }
}

export interface IAbortableFetchProps<T> {
  init?: RequestInit;
  initialData?: T;
  responseToData?: (r: Response) => Promise<T | undefined>
}

export function useAbortableFetch<T>(input: RequestInfo, { init, initialData, responseToData = tryJson}: IAbortableFetchProps<T> = {}) {
  const [response, setResponse] = React.useState<Response | null>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(initialData);
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
        const r = await fetch(input, { ...init || {}, signal });
        if (!r.ok) {
          setResponse(r);
          throw new Error()
        }
        setResponse(r);
        if (responseToData) {
          setData(await responseToData(r));
        }
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
  return { response, data: data as T, loading, error, refetch };
}
