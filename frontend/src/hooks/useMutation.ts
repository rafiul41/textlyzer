import { useKeycloak } from '@react-keycloak/web';
import { useState, useCallback } from 'react';

export function useMutation<T = unknown, V = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { keycloak } = useKeycloak();

  const mutate = useCallback(
    async (body?: V) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(keycloak?.token
              ? { Authorization: `Bearer ${keycloak.token}` }
              : {})
          },
          body: body ? JSON.stringify(body) : undefined
        });

        if (!res.ok) throw new Error('Request failed');
        const json = await res.json();
        setData(json);
        return json;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, keycloak.token]
  );

  return { mutate, loading, error, data };
}
