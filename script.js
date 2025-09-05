const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message === '') return;

  // عرض رسالة المستخدم
  const userMsg = document.createElement('div');
  userMsg.className = 'message user-message';
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);
  userInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // إرسال إلى OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
},
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message}]
})
});

  const data = await response.json();
  const reply = data.choices[0].message.content;

  // عرض رد الذكاء الاصطناعي
  const botMsg = document.createElement('div');
  botMsg.className = 'message bot-message';
  botMsg.textContent = reply;
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
});
