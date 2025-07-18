import TextModel from '../models/text.model';
import TextAnalysisModel from '../models/textAnalysis.model';
import { analyzeText } from '../utils/textutils';
import UserAnalysisModel from '../models/userAnalysis.model';

export async function saveTextService({ content, title, userId }: { content: string; title: string; userId: string }) {
  const now = new Date();
  const text = new TextModel({ content, title, createdAt: now, updatedAt: now, userId });
  await text.save();

  // Analyze the text and save analysis
  const analysis = analyzeText(content);
  await TextAnalysisModel.create({
    stringHash: analysis.hash,
    numWords: analysis.numWords,
    numChars: analysis.numChars,
    numSentences: analysis.numSentences,
    numParagraphs: analysis.numParagraphs,
    longestWordsPerParagraph: analysis.longestWordsPerParagraph
  });

  // Update or create user analysis
  const update = {
    $inc: {
      numWords: analysis.numWords,
      numChars: analysis.numChars,
      numSentences: analysis.numSentences,
      numParagraphs: analysis.numParagraphs
    }
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await UserAnalysisModel.findOneAndUpdate(
    { userId },
    update,
    options
  );
  return text;
}

export async function listTextsService(userId: string) {
  return TextModel.find({ userId }).sort({ createdAt: -1 });
}

export async function getTextService(id: string, userId: string) {
  return TextModel.findOne({ _id: id, userId });
}

export async function updateTextService(id: string, userId: string, data: { content?: string; title?: string }) {
  return TextModel.findOneAndUpdate(
    { _id: id, userId },
    { ...data, updatedAt: new Date() },
    { new: true }
  );
}

export async function deleteTextService(id: string, userId: string) {
  return TextModel.findOneAndDelete({ _id: id, userId });
} 