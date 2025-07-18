import { useFetch } from '../hooks/useFetch';
import type { UserAnalysis } from '../interfaces/user';
import './Dashboard.css';

export default function Dashboard() {
  const {
    data: analysis,
    loading,
    error
  } = useFetch<UserAnalysis>('/api/user-analysis');

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard!</h1>
      {loading && <div>Loading user analysis...</div>}
      {error && (
        <div className="dashboard-error">
          There are no analysis report for you :(
        </div>
      )}
      {analysis && (
        <div className="dashboard-analysis-card">
          <h2 className="dashboard-analysis-title">Your Text Analysis</h2>
          <div>
            <b>Total Words Saved:</b> {analysis.numWords}
          </div>
          <div>
            <b>Total Characters Saved:</b> {analysis.numChars}
          </div>
          <div>
            <b>Total Sentences Saved:</b> {analysis.numSentences}
          </div>
          <div>
            <b>Total Paragraphs Saved:</b> {analysis.numParagraphs}
          </div>
        </div>
      )}
    </div>
  );
}
