import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './TextList.css';

interface TextItem {
  _id: string;
  title: string;
  content: string;
}

const TextList: React.FC = () => {
  const { keycloak } = useKeycloak();
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch('/api/text', {
          headers: keycloak?.token ? { Authorization: `Bearer ${keycloak.token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to fetch texts');
        const data = await res.json();
        setTexts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    if (keycloak?.authenticated) {
      fetchTexts();
    }
  }, [keycloak]);

  if (loading) return <div>Loading texts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="text-list-container">
      {texts.map(text => (
        <div key={text._id} className="text-card">
          <h2 className="text-card-title">{text.title}</h2>
          <div className="text-card-content">{text.content}</div>
        </div>
      ))}
    </div>
  );
};

export default TextList;
