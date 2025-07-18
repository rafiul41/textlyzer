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
          headers: keycloak?.token
            ? { Authorization: `Bearer ${keycloak.token}` }
            : {}
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
      <div className="top-part">
        <button className="add-text-btn">Add Text</button>
      </div>
      {texts.length != 0 ? <h2>Here are your added texts</h2>: ''}
      <div className="list-container">
        {texts.length != 0 ? texts.map((text) => (
          <div key={text._id} className="text-card">
            <svg className="view-icon" viewBox="0 0 24 24">
              <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            <h2 className="text-card-title">{text.title}</h2>
            <div className="text-card-content">{text.content}</div>
          </div>
        )) : <h2>You don't have any added texts</h2>}
      </div>
    </div>
  );
};

export default TextList;
