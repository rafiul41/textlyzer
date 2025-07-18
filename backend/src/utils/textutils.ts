import crypto from 'crypto';

export function analyzeText(text: string) {
  // Hash
  const hash = crypto.createHash('sha256').update(text).digest('hex');

  // Paragraphs (split by two or more newlines)
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  const numParagraphs = paragraphs.length;

  // Sentences (split by . ! ? followed by space or end)
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
  const numSentences = sentences.length;

  const wordRegex = /\b\w+\b/g;
  // Words (split by whitespace)
  const words = text.match(wordRegex) || [];
  const numWords = words.length;

  // Characters (excluding whitespace)
  const numChars = text.replace(/\s/g, '').length;

  // Longest words per paragraph (2D array)
  const longestWordsPerParagraph = paragraphs.map(paragraph => {
    const pWords = paragraph.match(wordRegex) || [];
    let maxLen = 0;
    pWords.forEach(word => {
      if (word.length > maxLen) {
        maxLen = word.length;
      }
    });
    // Collect all words with maxLen
    return pWords.filter(word => word.length === maxLen);
  });

  return {
    hash,
    numWords,
    numChars,
    numSentences,
    numParagraphs,
    longestWordsPerParagraph
  };
}
