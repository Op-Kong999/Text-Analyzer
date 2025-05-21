$(document).ready(function () {
  const offensiveWords = ['badword', 'offensive', 'ugly'];

  function getWords(text) {
    return text
      .toLowerCase()
      .match(/\b\w+\b/g) || [];
  }

  function countTotalWords(text) {
    return getWords(text).length;
  }

  function countSpecificWord(text, word) {
    return getWords(text).filter(w => w === word.toLowerCase()).length;
  }

  function boldSpecificWord(text, word) {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    return text.replace(regex, '<b>$1</b>');
  }

  function maskOffensiveWords(text) {
    offensiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, '****');
    });
    return text;
  }

  function getTopThreeWords(text) {
    const words = getWords(text);
    const freqMap = {};

    words.forEach(word => {
      freqMap[word] = (freqMap[word] || 0) + 1;
    });

    const sorted = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sorted.map(entry => `${entry[0]} (${entry[1]})`).join(', ');
  }

  $('#analyze-btn').on('click', function () {
    const inputText = $('#text-input').val();
    const specificWord = $('#specific-word').val().trim();

    const total = countTotalWords(inputText);
    const specificCount = countSpecificWord(inputText, specificWord);
    let processed = maskOffensiveWords(inputText);

    if (specificWord.length > 0) {
      processed = boldSpecificWord(processed, specificWord);
    }

    const top3 = getTopThreeWords(inputText);

    $('#total-words').text(total);
    $('#word-count-term').text(specificWord);
    $('#specific-word-count').text(specificCount);
    $('#processed-output').html(processed);
    $('#top-words').text(top3);
  });
});
