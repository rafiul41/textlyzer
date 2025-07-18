import React from 'react';
import './TextList.css';
import type { TextAnalysis } from '../interfaces/text';
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { toast } from 'react-hot-toast';

interface TextAnalysisModalProps {
  onClose: () => void;
  textId: string | null;
}

const TextAnalysisModal: React.FC<TextAnalysisModalProps> = ({
  onClose,
  textId
}) => {
  const {
    data: analysis,
    loading,
    error
  } = useFetch<TextAnalysis>(textId ? `/api/text-analysis/${textId}` : '');

  const { mutate: deleteText, loading: deleting } = useMutation(`/api/text/${textId}`, 'DELETE');

  const handleDelete = async () => {
    try {
      await deleteText();
      toast.success('Text deleted successfully');
      onClose();
    } catch {
      toast.error('Failed to delete text');
    }
  };

  if (!textId) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>Text Analysis</h2>
        {loading && <div>Loading analysis...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {analysis && (
          <>
            <div className="modal-analysis-row">
              <b>Words:</b> {analysis.numWords}
            </div>
            <div className="modal-analysis-row">
              <b>Characters:</b> {analysis.numChars}
            </div>
            <div className="modal-analysis-row">
              <b>Sentences:</b> {analysis.numSentences}
            </div>
            <div className="modal-analysis-row">
              <b>Paragraphs:</b> {analysis.numParagraphs}
            </div>
            <div className="modal-analysis-row">
              <b>Longest Words Per Paragraph:</b>
              <ul style={{ margin: '0.5em 0 0 1em' }}>
                {analysis.longestWordsPerParagraph.map((arr, idx) => (
                  <li key={idx}>
                    Paragraph {idx + 1}: {arr.join(', ') || '-'}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose} disabled={deleting}>
            Close
          </button>
          <button className="modal-save" onClick={handleDelete} disabled={deleting} style={{ background: '#e74c3c' }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TextAnalysisModal;
