document.addEventListener('DOMContentLoaded', () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const output = document.querySelector('output');
    const button = document.querySelector('#startstop');

    let started = false;

    button.onclick = () => {
      if (started === false) {
        started = true;
        button.innerHTML = 'Stop';
        recognition.start();
      } else {
        started = false;
        button.innerHTML = 'Start';
        recognition.stop();
      }
    };

    recognition.onerror = (event) => {
      console.log(event);
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        output.textContent += text + ' ';
      }
    };
  } else {
    console.error('SpeechRecognition is not supported in this browser.');
  }
});
