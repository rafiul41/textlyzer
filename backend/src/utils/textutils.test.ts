const { analyzeText } = require('./textutils');

describe('analyzeText', () => {
  it('should handle empty string', () => {
    const result = analyzeText('');
    expect(result).toEqual({
      numWords: 0,
      numChars: 0,
      numSentences: 0,
      numParagraphs: 0,
      longestWordsPerParagraph: []
    });
  });

  it('should analyze a single sentence', () => {
    const result = analyzeText('Hello world!');
    expect(result.numWords).toBe(2);
    expect(result.numChars).toBe(11);
    expect(result.numSentences).toBe(1);
    expect(result.numParagraphs).toBe(1);
    expect(result.longestWordsPerParagraph).toEqual([['Hello', 'world']]);
  });

  it('should analyze multiple paragraphs and sentences', () => {
    const text = 'Hello world! This is a test.\n\nAnother paragraph here.';
    const result = analyzeText(text);
    expect(result.numWords).toBe(9);
    expect(result.numChars).toBe(44);
    expect(result.numSentences).toBe(3);
    expect(result.numParagraphs).toBe(2);
    expect(result.longestWordsPerParagraph[0]).toContain('Hello');
    expect(result.longestWordsPerParagraph[1]).toContain('paragraph');
  });

  it('should find all longest words per paragraph', () => {
    const text = 'Short longestword\n\nAnotherpara longestwordagain';
    const result = analyzeText(text);
    expect(result.longestWordsPerParagraph[0]).toEqual(['longestword']);
    expect(result.longestWordsPerParagraph[1]).toEqual(['longestwordagain']);
  });
}); 