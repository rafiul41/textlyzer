import TextAnalysisModel from '../models/textAnalysis.model';
import TextModel from '../models/text.model';

export async function getTextAnalysisService(textId: string, userId: string) {
  // Ensure the text belongs to the user
  const text = await TextModel.findOne({ _id: textId, userId });
  if (!text) return null;
  // Find the analysis for this text
  return TextAnalysisModel.findOne({ textId });
} 