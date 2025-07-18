import React, { useState } from 'react';
import './TextList.css';
import { toast } from 'react-hot-toast';
import { useKeycloak } from '@react-keycloak/web';
import type { TextItem } from '../interfaces/text';

interface BaseModalProps {
  onClose: () => void;
}

interface AddModalProps extends BaseModalProps {
  isAddModal: true;
  editProps?: never;
}

interface EditModalProps extends BaseModalProps {
  isAddModal: false;
  editProps: TextItem;
}

type TextModalProps = AddModalProps | EditModalProps;

const TextModal: React.FC<TextModalProps> = ({
  onClose,
  isAddModal,
  editProps
}) => {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(editProps?.title || '');
  const [content, setContent] = useState(editProps?.content || '');

  const onSave = async () => {
    if (title.length > 20) {
      toast.error('Title cannot be more than 20 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(keycloak?.token ? { Authorization: `Bearer ${keycloak.token}` } : {}),
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      });
      if (!res.ok) throw new Error('Failed to save text');
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>{isAddModal ? 'Add new text' : 'Edit text'}</h2>
        <label className="modal-label">
          Title
          <input
            className="modal-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            disabled={loading}
          />
        </label>
        <label className="modal-label">
          Content
          <textarea
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            rows={6}
            disabled={loading}
          />
        </label>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="modal-save" onClick={onSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TextModal;
