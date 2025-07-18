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
    textId: String(text._id),
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
  // Find the existing text
  const existingText = await TextModel.findOne({ _id: id, userId });
  if (!existingText) return null;

  // If content is being updated, update analysis and user stats
  let diff = null;
  let newAnalysis = null;
  if (data.content && data.content !== existingText.content) {
    // Analyze old and new content
    const oldAnalysis = analyzeText(existingText.content);
    newAnalysis = analyzeText(data.content);
    // Calculate difference
    diff = {
      numWords: newAnalysis.numWords - oldAnalysis.numWords,
      numChars: newAnalysis.numChars - oldAnalysis.numChars,
      numSentences: newAnalysis.numSentences - oldAnalysis.numSentences,
      numParagraphs: newAnalysis.numParagraphs - oldAnalysis.numParagraphs
    };
  }

  // Update the text document
  const updated = await TextModel.findOneAndUpdate(
    { _id: id, userId },
    { ...data, updatedAt: new Date() },
    { new: true }
  );

  // If content changed, update text analysis and user analysis
  if (diff && newAnalysis) {
    // Update text analysis
    await TextAnalysisModel.findOneAndUpdate(
      { textId: String(id) },
      {
        numWords: newAnalysis.numWords,
        numChars: newAnalysis.numChars,
        numSentences: newAnalysis.numSentences,
        numParagraphs: newAnalysis.numParagraphs,
        longestWordsPerParagraph: newAnalysis.longestWordsPerParagraph
      }
    );
    // Update user analysis
    await UserAnalysisModel.findOneAndUpdate(
      { userId },
      {
        $inc: {
          numWords: diff.numWords,
          numChars: diff.numChars,
          numSentences: diff.numSentences,
          numParagraphs: diff.numParagraphs
        }
      }
    );
  }

  return updated;
}

export async function deleteTextService(id: string, userId: string) {
  return TextModel.findOneAndDelete({ _id: id, userId });
} 