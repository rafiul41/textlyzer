import TextModel from '../models/text.model';

export async function saveTextService({ content, title, userId }: { content: string; title: string; userId: string }) {
  const now = new Date();
  const text = new TextModel({ content, title, createdAt: now, updatedAt: now, userId });
  await text.save();
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