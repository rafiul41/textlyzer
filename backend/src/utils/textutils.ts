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

  // Words (split by whitespace)
  const words = text.match(/\b\w+\b/g) || [];
  const numWords = words.length;

  // Characters (excluding whitespace)
  const numChars = text.replace(/\s/g, '').length;

  // Longest word per paragraph (1D array)
  const longestWordsPerParagraph = paragraphs.map(paragraph => {
    const pWords = paragraph.match(/\b\w+\b/g) || [];
    let maxLen = 0;
    let longest = '';
    pWords.forEach(word => {
      if (word.length > maxLen) {
        maxLen = word.length;
        longest = word;
      }
    });
    return longest;
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
