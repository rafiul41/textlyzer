import { Schema, Document } from 'mongoose';

export interface IText extends Document {
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export const textSchema = new Schema<IText>({
  content: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
}); 