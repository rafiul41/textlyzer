import React, { useCallback, useState } from 'react';
import './TextList.css';
import TextModal from './TextModal';
import type { TextItem } from '../interfaces/text';
import { useFetch } from '../hooks/useFetch';

const TextList: React.FC = () => {
  const { data: texts, loading, error, fetchFunc } = useFetch<TextItem[]>('/api/text');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState<TextItem | null>(null);

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
    setEditText(null);
    fetchFunc();
  }, [fetchFunc]);

  if (loading) return <div>Loading texts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="text-list-container">
      <div className="top-part">
        <button className="add-text-btn" onClick={() => setIsModalOpen(true)}>
          Add Text
        </button>
      </div>
      {isModalOpen && !editText && (
        <TextModal onClose={onModalClose} isAddModal={true} />
      )}
      {editText && (
        <TextModal
          onClose={onModalClose}
          isAddModal={false}
          editProps={{
            _id: editText._id,
            title: editText.title,
            content: editText.content
          }}
        />
      )}
      {texts && texts.length !== 0 ? <h2>Here are your texts</h2> : ''}
      <div className="list-container">
        {texts && texts.length !== 0 ? (
          texts.map((text) => (
            <div key={text._id} className="text-card">
              <div className="card-icons">
                <svg className="view-icon" viewBox="0 0 24 24">
                  <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
                <svg
                  className="edit-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  onClick={() => setEditText(text)}
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </div>
              <h2 className="text-card-title">{text.title}</h2>
              <div className="text-card-content">{text.content}</div>
            </div>
          ))
        ) : (
          <h2>You don't have any added texts</h2>
        )}
      </div>
    </div>
  );
};

export default TextList;
