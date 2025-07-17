import mongoose, { Model } from 'mongoose';
import { textAnalysisSchema, ITextAnalysis } from '../schemas/textAnalysis.schema';

const TextAnalysisModel: Model<ITextAnalysis> = mongoose.model<ITextAnalysis>('TextAnalysis', textAnalysisSchema);

export default TextAnalysisModel; 