document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.querySelector('textarea');
  const button = document.querySelector('button');
  const select = document.querySelector('select');

  const synthesis = speechSynthesis;

  function createVoiceOptions() {
    const voices = synthesis.getVoices();
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name} (${voice.lang})`;
      select.appendChild(option);
    });
  }

  synthesis.onvoiceschanged = createVoiceOptions;

  button.onclick = () => {
    const selectedVoice = synthesis
      .getVoices()
      .find((voice) => voice.name === select.value);

    const msg = new SpeechSynthesisUtterance();
    msg.text = textarea.value;
    msg.lang = selectedVoice.lang;
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;
    synthesis.speak(msg);
  };
});
