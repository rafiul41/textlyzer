import { Schema, Document } from 'mongoose';

export interface IUserAnalysis extends Document {
  userId: string;
  numWords: number;
  numChars: number;
  numSentences: number;
  numParagraphs: number;
}

export const userAnalysisSchema = new Schema<IUserAnalysis>({
  userId: { type: String, required: true, unique: true },
  numWords: { type: Number, required: true },
  numChars: { type: Number, required: true },
  numSentences: { type: Number, required: true },
  numParagraphs: { type: Number, required: true },
});