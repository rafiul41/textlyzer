import mongoose, { Document, Model } from 'mongoose';
import { textSchema, IText } from '../schemas/text.schema';

const TextModel: Model<IText> = mongoose.model<IText>('Text', textSchema);

export default TextModel; 