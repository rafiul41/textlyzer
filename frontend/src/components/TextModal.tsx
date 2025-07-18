import React, { useState } from 'react';
import './TextList.css';
import { toast } from 'react-hot-toast';
import type { TextItem } from '../interfaces/text';
import { useMutation } from '../hooks/useMutation';

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
  const [title, setTitle] = useState(editProps?.title || '');
  const [content, setContent] = useState(editProps?.content || '');

  const { mutate, loading } = useMutation(
    `/api/text${isAddModal ? '' : `/${editProps._id}`}`,
    isAddModal ? 'POST' : 'PUT'
  );

  const onSave = async () => {
    if (title.length > 17) {
      toast.error('Title cannot be more than 17 characters');
      return;
    }
    try {
      await mutate({ title, content });
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error(message);
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
