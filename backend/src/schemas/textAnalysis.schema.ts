import { Schema, Document } from 'mongoose';

export interface ITextAnalysis extends Document {
  textId: string; // reference to Text document
  numWords: number;
  numChars: number;
  numSentences: number;
  numParagraphs: number;
  // Following is 2d array because there might be multiple longest words in a paragraph
  longestWordsPerParagraph: string[][];
}

export const textAnalysisSchema = new Schema<ITextAnalysis>({
  textId: { type: String, required: true, unique: true },
  numWords: { type: Number, required: true },
  numChars: { type: Number, required: true },
  numSentences: { type: Number, required: true },
  numParagraphs: { type: Number, required: true },
  longestWordsPerParagraph: { type: [[String]], required: true },
}); 