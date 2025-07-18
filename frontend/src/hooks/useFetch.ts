import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState, useCallback } from 'react';

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {keycloak} = useKeycloak();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        headers: keycloak?.token
          ? { Authorization: `Bearer ${keycloak.token}` }
          : {}
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [keycloak.token, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchFunc: fetchData };
}
