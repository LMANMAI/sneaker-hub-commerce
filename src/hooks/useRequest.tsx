import { useState, useEffect } from "react";

export const useRequest = (url: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          let err = new Error("Error en la peticion a la DB");
          err.message = res.statusText || "ocurrio un error";
          throw err;
        }
        const res_json = await res.json();
        if (!signal.aborted) {
          setData(res_json);
          setError(null);
        }
      } catch (error: any) {
        if (signal.aborted) {
          setData(null);
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [url]);
  return { data, error, loading };
};
