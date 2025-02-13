document.addEventListener('DOMContentLoaded', function () {
  const messages = document.getElementById('messages');
  const message = document.getElementById('message');
  const send = document.getElementById('send');

  // send.addEventListener('click', async function () {
  //   const content = message.value;
  //   const response = await fetch('/chat', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ content }),
  //   });
  //   const data = await response.json();
  //   const userElement = document.createElement('pre');
  //   userElement.textContent = content;
  //   messages.appendChild(userElement);
  //   messages.appendChild(document.createElement('br'));
  //   const element = document.createElement('pre');
  //   element.textContent = data.content;
  //   messages.appendChild(element);
  //   messages.appendChild(document.createElement('br'));
  //   message.value = '';
  // });

  send.addEventListener('click', async () => {
    const content = message.value;
    const response = await fetch('/chat-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const decoder = new TextDecoder();

    const userElement = document.createElement('pre');
    userElement.textContent = content;
    messages.appendChild(userElement);
    messages.appendChild(document.createElement('br'));

    const element = document.createElement('pre');
    messages.appendChild(element);

    for await (const chunk of response.body) {
      element.textContent += decoder.decode(chunk, { stream: true });
    }

    messages.appendChild(document.createElement('br'));

    message.value = '';
  });
});
