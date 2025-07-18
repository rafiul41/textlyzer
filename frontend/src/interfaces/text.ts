export interface TextItem {
  _id: string;
  title: string;
  content: string;
}

export interface TextAnalysis {
  numWords: number;
  numChars: number;
  numSentences: number;
  numParagraphs: number;
  longestWordsPerParagraph: string[][];
}