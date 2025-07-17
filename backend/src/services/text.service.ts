import TextModel from '../models/text.model';

export async function saveTextService({ content, title, userId }: { content: string; title: string; userId: string }) {
  const now = new Date();
  const text = new TextModel({ content, title, createdAt: now, updatedAt: now, userId });
  await text.save();
  return text;
} 