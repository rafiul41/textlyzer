import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if(hasRun.current) return;
    hasRun.current = true;
    login();
  }, [login]);

  return <p>Redirecting to login...</p>;
} 